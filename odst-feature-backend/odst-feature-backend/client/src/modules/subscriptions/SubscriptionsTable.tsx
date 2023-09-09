import { styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
  Frago, Order, Organization, User,
} from '../common/types';
import { prettifyPublishDate } from '../common/dates';


interface Props {
  readonly user: User;
  readonly orders: Order[];
  readonly organizations: Organization[];
  readonly onSelect: (order: Order) => void;
}

const CenteredDiv = styled('div')({
  fontFamily: 'Maven Pro',
  fontSize: '48px',
  fontWeight: 400,
  textAlign: 'center',
  margin: 'auto',
  padding: '250px 0px',
  color: 'rgba(0, 0, 0, 0.50)',
});

const blankTableStyles = {
  backgroundColor: '#D9D9D9',
  minWidth: 650,
  minHeight: 500,
  borderRadius: '0px 0px 10px 10px',
  alignContent: 'center',
};

export const tableCellStyle = {
  fontWeight: '400',
  fontSize: '32px',
  fontFamily: 'Kameron',
  alignItems: 'center',
  textAlign: 'center',
};

export default function SubscriptionsTable(props: Props) {
  if (props.organizations.length === 0) {
    return null;
  }
  const subscriptions = props.orders
    .filter((order) => order.status === 'PUBLISHED')
    .filter((order) => {
      const orderPublisher = props.organizations
        .find((org) => org.id === order.publishingOrganization)!;

      return orderPublisher.subscribers.includes(props.user.id);
    });

  return (
    <>
      <TableContainer component={Paper} sx={{ minWidth: 650 }} data-testid="publicationsPageTable">
        <Table sx={{ minWidth: 650, borderRight: '1px solid rgba(0, 0, 0, 0.15)' }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{
              backgroundColor: '#9E9E9E',
            }}
            >
              <TableCell
                align="center"
                sx={{
                  ...tableCellStyle, width: '50%',
                }}
              >
                Order
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  ...tableCellStyle, width: '30%',
                }}
              >
                Publish Date
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  ...tableCellStyle, width: '15%',
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  ...tableCellStyle, width: '5%',
                }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((order: Order) => (
              <TableRow
                key={`${order.id}`}
                onClick={() => props.onSelect(order)}
                sx={{
                  height: '65px',
                  borderWidth: '3px 0px 0px 0px',
                  borderStyle: 'solid',
                  borderColor: '#9E9E9E',
                  background: '#D9D9D9',
                  cursor: 'pointer',
                }}
              >
                <TableCell align="center">{order.opord.name}</TableCell>
                <TableCell align="center">
                  {!order.publishedAt && 'PENDING'}
                  {order.publishedAt && prettifyPublishDate(new Date(order.publishedAt))}
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color={getColor(getStatus(order, props.user))}>
                    {getStatus(order, props.user)}
                  </Button>
                </TableCell>
                <TableCell align="center" style={{ padding: '0px' }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {subscriptions.length === 0 && (
      <Box sx={blankTableStyles}>
        <CenteredDiv>
          No Orders Uploaded
        </CenteredDiv>
      </Box>
      )}
    </>
  );
}

function getColor(status: string) {
  if (status === 'NEEDS ACK') {
    return 'error';
  }
  if (status === 'NEEDS ACTION') {
    return 'primary';
  }
  return 'success';
}

function getStatus(order: Order, user: User) {
  const counts = countAcksAndActions(order, user);

  if (!counts.opord.acknowledged || !counts.fragos.every((frago) => frago.acknowledged)) {
    return 'NEEDS ACK';
  }

  if (!counts.opord.actioned || !counts.fragos.every((frago) => frago.actioned)) {
    return 'NEEDS ACTION';
  }

  return 'ACTIONED';
}

function countAcksAndActions(order: Order, user: User) {
  return {
    opord: {
      acknowledged: order.subscriberAcknowledgements
        .some((ack) => ack.organizationID === user.organization),
      actioned: order.subscriberActions
        .some((ack) => ack.organizationID === user.organization),
    },
    fragos: order.fragos
      .filter((frago) => frago.status === 'PUBLISHED')
      .map((frago) => ({
        acknowledged: frago.subscriberAcknowledgements
          .some((ack) => ack.organizationID === user.organization),
        actioned: frago.subscriberActions
          .some((ack) => ack.organizationID === user.organization),
      })),
  };
}
