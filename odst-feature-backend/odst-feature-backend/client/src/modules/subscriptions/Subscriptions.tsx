import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';

import SubscriptionsTable from './SubscriptionsTable';
import NewSubscriptionModal from './NewSubscriptionModal';

import AuthContext from '../auth/AuthContext';
import {
  Frago, Order, OrderStatus, Organization,
} from '../common/types';
import OrderInfoDialog from './OrderInfoDialog';


export default function Subscriptions() {
  // State
  // -----

  const auth = React.useContext(AuthContext);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [newSubModalIsVisible, setNewSubModalIsVisible] = React.useState(false);


  // Lifecycle
  // ---------

  React.useEffect(() => {
    fetch('http://localhost:8080/organizations')
      .then((response) => response.json())
      .then(setOrganizations);
    fetch('http://localhost:8080/orders')
      .then((response) => response.json())
      .then((allOrders) => allOrders
        .filter((order: Order) => order.status === 'PUBLISHED'))
      .then(setOrders);
  }, []);


  // Functions
  // ---------

  const refreshOrgs = React.useCallback(() => {
    fetch('http://localhost:8080/organizations')
      .then((response) => response.json())
      .then(setOrganizations);
  }, [setOrders]);

  const refreshOrders = React.useCallback(() => {
    fetch('http://localhost:8080/orders')
      .then((response) => response.json())
      .then((allOrders) => allOrders
        .filter((order: Order) => order.status === 'PUBLISHED'))
      .then(setOrders);
  }, [setOrders]);

  const openNewSubModal = React.useCallback(() => {
    setNewSubModalIsVisible(true);
  }, [setNewSubModalIsVisible]);

  const closeNewSubModal = React.useCallback(() => {
    setNewSubModalIsVisible(false);
  }, [setNewSubModalIsVisible]);

  const handleSubscribe = React.useCallback(async (organization: Organization) => {
    await fetch(`http://localhost:8080/organizations/${organization.id}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: auth.user!.id }),
    });

    refreshOrders();
    refreshOrgs();
  }, []);

  const handleUnsubscribe = React.useCallback(async (organization: Organization) => {
    await fetch(`http://localhost:8080/organizations/${organization.id}/subscribers`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: auth.user!.id }),
    });

    refreshOrders();
    refreshOrgs();
  }, []);

  const handleAcknowledgement = React.useCallback(async (order: Order) => {
    await fetch(`http://localhost:8080/orders/${order.id}/acknowledgements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: auth.user!,
        timestamp: new Date().toString(),
      }),
    });

    refreshOrders();
    refreshOrgs();
  }, []);

  const handleAction = React.useCallback(async (order: Order) => {
    await fetch(`http://localhost:8080/orders/${order.id}/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: auth.user!,
        timestamp: new Date().toString(),
      }),
    });

    refreshOrders();
    refreshOrgs();
  }, []);

  const handleAckForFrago = React.useCallback(async (order: Order, frago: Frago) => {
    // eslint-disable-next-line no-underscore-dangle
    await fetch(`http://localhost:8080/orders/${order.id}/fragos/${frago._id}/acknowledge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: auth.user!,
        timestamp: new Date().toString(),
      }),
    });

    refreshOrders();
    refreshOrgs();
  }, []);

  const handleActionForFrago = React.useCallback(async (order: Order, frago: Frago) => {
    // eslint-disable-next-line no-underscore-dangle
    await fetch(`http://localhost:8080/orders/${order.id}/fragos/${frago._id}/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: auth.user!,
        timestamp: new Date().toString(),
      }),
    });

    refreshOrders();
    refreshOrgs();
  }, []);


  // View
  // ----

  return (
    <>
      <span style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '31px',
      }}
      >
        <Box sx={{
          borderRadius: '10px',
          background: '#D9D9D9',
          border: 'none',
          width: '45%',
          padding: '10px',
          display: 'flex',
        }}
        >
          <SearchIcon sx={{ color: 'gray' }} />
          <input
            placeholder="Search"
            data-testid="searchBar"
            style={{ all: 'unset', width: '100%' }}
          />
        </Box>
        {' '}
        <Button
          sx={{
            borderRadius: '10px',
            background: '#D9D9D9',
            color: 'black',
          }}
          onClick={openNewSubModal}
        >
          Subscriptions
        </Button>
        <NewSubscriptionModal
          user={auth.user!}
          open={newSubModalIsVisible}
          onClose={closeNewSubModal}
          organizations={organizations}
          onSubscribe={handleSubscribe}
          onUnsubscribe={handleUnsubscribe}
        />
        {selectedOrder && (
          <OrderInfoDialog
            user={auth.user!}
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onAcknowledgement={handleAcknowledgement}
            onAction={handleAction}
            onFragoAck={handleAckForFrago}
            onFragoAction={handleActionForFrago}
          />
        )}
      </span>
      <SubscriptionsTable
        orders={orders}
        user={auth.user!}
        organizations={organizations}
        onSelect={setSelectedOrder}
      />
    </>
  );
}
