import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';

import NewOrderModal from './NewOrderModal';
import NewFragoModal from './NewFragoModal';
import NewAttachmentModal from './NewAttachmentModal';
import PublicationsTable from './PublicationsTable';

import {
  Frago,
  Order, OrderStatus, Organization, User,
} from '../common/types';
import AuthContext from '../auth/AuthContext';
import OrderInfoDialog from './OrderInfoDialog';


export const tableCellStyle = {
  fontWeight: '400',
  fontSize: '32px',
  fontFamily: 'Kameron',
  alignItems: 'center',
  textAlign: 'center',
};

const searchBoxStyle = {
  borderRadius: '10px',
  background: '#D9D9D9',
  border: 'none',
  width: '45%',
  padding: '10px',
  display: 'flex',
};

const newOrderButtonStyle = {
  borderRadius: '10px',
  background: '#D9D9D9',
  color: 'black',
};


export default function Publications() {
  // State
  // -----

  const auth = React.useContext(AuthContext);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [users, setUsers] = React.useState<User[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [newFragoModalIsVisible, showNewFragoModal] = React.useState(false);
  const [newAttachmentModalIsVisible, showNewAttachmentModal] = React.useState(false);
  const [newOrderModalIsVisible, setNewOrderModalIsVisible] = React.useState(false);
  const [newAttachmentForOrder, setNewAttachmentForOrder] = React.useState<Order | null>(null);


  // Lifecycle
  // ---------

  React.useEffect(() => {
    fetch('http://localhost:8080/orders')
      .then((response) => response.json())
      .then(setOrders);
    fetch('http://localhost:8080/organizations')
      .then((response) => response.json())
      .then(setOrganizations);
    fetch('http://localhost:8080/users')
      .then((response) => response.json())
      .then(setUsers);
  }, []);


  // Functions
  // ---------

  const openNewOrderModal = React.useCallback(() => {
    setNewOrderModalIsVisible(true);
  }, [setNewOrderModalIsVisible]);

  const closeNewOrderModal = React.useCallback(() => {
    setNewOrderModalIsVisible(false);
  }, [setNewOrderModalIsVisible]);

  const handleDelete = async (order: Order) => {
    await fetch(`http://localhost:8080/orders/${order.id}`, {
      method: 'DELETE',
    });

    refresh();
  };

  const handleAcknowledgement = async (order: Order) => {
    await fetch('http://localhost:8080/acknowledgements/staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: auth.user!.id,
        orderID: order.id,
      }),
    });

    refresh();
  };

  const refresh = React.useCallback(() => {
    fetch('http://localhost:8080/orders')
      .then((response) => response.json())
      .then(setOrders);
  }, [setOrders]);

  const handleNewAttachment = React.useCallback((order: Order) => {
    setNewAttachmentForOrder(order);
    showNewAttachmentModal(true);
  }, [setNewAttachmentForOrder]);

  const handleNewFrago = React.useCallback((order: Order) => {
    setNewAttachmentForOrder(order);
    showNewFragoModal(true);
  }, [setNewAttachmentForOrder]);

  const handleNewAttachmentFile = React.useCallback(async (file: File) => {
    const order = newAttachmentForOrder!;
    const body = new FormData();

    body.append('file', file);

    const saveFileRequest = await fetch('http://localhost:8080/files', {
      method: 'POST',
      body,
    });

    const storageData: {
      name: string,
      path: string,
      src: string,
      extension: string,
    } = await saveFileRequest.json();

    await fetch(`http://localhost:8080/orders/${order.id}/attachments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storageData),
    });

    refresh();
  }, [newAttachmentForOrder]);

  const handleNewFragoFile = React.useCallback(async (file: File) => {
    const order = newAttachmentForOrder!;
    const body = new FormData();

    body.append('file', file);

    const saveFileRequest = await fetch('http://localhost:8080/files', {
      method: 'POST',
      body,
    });

    const storageData: {
      name: string,
      path: string,
      src: string,
      extension: string,
    } = await saveFileRequest.json();


    await fetch(`http://localhost:8080/orders/${order.id}/fragos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: {
          name: storageData.name,
          extension: storageData.extension,
          path: storageData.path,
          src: storageData.src,
        },
        status: 'STAFFING',
        createdAt: new Date().toString(),
        createdBy: auth.user!.id,
      }),
    });

    refresh();
  }, [newAttachmentForOrder]);

  const publishOrder = React.useCallback(async (order: Order) => {
    await fetch(`http://localhost:8080/orders/${order.id}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: auth.user,
      }),
    });

    refresh();
  }, []);

  const publishFrago = React.useCallback(async (order: Order, frago: Frago) => {
    // eslint-disable-next-line no-underscore-dangle
    await fetch(`http://localhost:8080/orders/${order.id}/fragos/${frago._id}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: auth.user,
        timestamp: new Date().toString(),
      }),
    });

    refresh();
  }, []);

  const deleteFrago = React.useCallback(async (order: Order, frago: Frago) => {
    // eslint-disable-next-line no-underscore-dangle
    await fetch(`http://localhost:8080/orders/${order.id}/fragos/${frago._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    refresh();
  }, []);

  const saveNewOrder = React.useCallback(async (file: File) => {
    const body = new FormData();

    body.append('file', file);

    const saveFileRequest = await fetch('http://localhost:8080/files', {
      method: 'POST',
      body,
    });

    const storageData: {
      name: string,
      path: string,
      src: string,
      extension: string,
    } = await saveFileRequest.json();

    const data: Omit<Order, 'id'> = {
      opord: {
        name: storageData.name,
        extension: storageData.extension,
        path: storageData.path,
        src: storageData.src,
      },
      status: 'STAFFING',
      createdBy: auth.user!.id,
      createdAt: new Date().toString(),
      subscriberAcknowledgements: [],
      subscriberActions: [],
      attachments: [],
      fragos: [],
    };

    const saveOrderRequest = await fetch('http://localhost:8080/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    await saveOrderRequest.json();

    fetch('http://localhost:8080/orders')
      .then((response) => response.json())
      .then(setOrders);
  }, [setOrders]);


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
        <Box sx={searchBoxStyle}>
          <SearchIcon sx={{ color: 'gray' }} />
          <input
            placeholder="Search"
            data-testid="searchBar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ all: 'unset', width: '100%' }}
          />
        </Box>
        {' '}
        <Button
          sx={newOrderButtonStyle}
          onClick={openNewOrderModal}
        >
          {' '}
          + New Order
          {' '}

        </Button>
        <NewOrderModal
          onSubmit={saveNewOrder}
          open={newOrderModalIsVisible}
          onClose={closeNewOrderModal}
        />
        <NewAttachmentModal
          open={newAttachmentModalIsVisible}
          onClose={() => showNewAttachmentModal(false)}
          onSubmit={handleNewAttachmentFile}
        />
        <NewFragoModal
          open={newFragoModalIsVisible}
          onClose={() => showNewFragoModal(false)}
          onSubmit={handleNewFragoFile}
        />
      </span>
      <PublicationsTable
        orders={orders}
        organizations={organizations}
        onSelect={setSelectedOrder}
        searchQuery={searchQuery}
      />
      {selectedOrder && (
        <OrderInfoDialog
          users={users}
          order={selectedOrder}
          organization={organizations.find((o) => o.id === auth.user!.organization)!}
          onClose={() => setSelectedOrder(null)}
          onDelete={handleDelete}
          onAttachment={handleNewAttachment}
          onFrago={handleNewFrago}
          onPublish={publishOrder}
          onFragoPublish={publishFrago}
          onFragoDelete={deleteFrago}
        />
      )}
    </>
  );
}
