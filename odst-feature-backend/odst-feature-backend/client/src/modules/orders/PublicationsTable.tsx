import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

import { Order, Organization } from '../common/types';
import { prettifyPublishDate } from '../common/dates';


interface Props {
  readonly orders: Order[];
  readonly searchQuery: string;
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

export default function PublicationsTable(props: Props) {
  const filteredOrders = props.orders.filter((order) => {
    if (!props.searchQuery) {
      return true;
    }
    return order.opord.name.toLowerCase().includes(props.searchQuery.toLowerCase());
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
            {filteredOrders.map((order: Order) => (
              <TableRow
                key={`${order.id}`}
                sx={{
                  height: '65px',
                  borderWidth: '3px 0px 0px 0px',
                  borderStyle: 'solid',
                  borderColor: '#9E9E9E',
                  background: '#D9D9D9',
                }}
              >
                <TableCell
                  align="center"
                  onClick={() => props.onSelect(order)}
                  style={{
                    fontFamily: 'Maven Pro',
                    fontSize: '24px',
                    cursor: 'pointer',
                  }}
                >
                  {order.opord.name}
                  {hasPendingFrago(order) && (
                    <>
                      {'   '}
                      <Button size="small" variant="outlined" color="error">
                        !
                      </Button>
                    </>
                  )}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '24px', fontFamily: 'Maven Pro' }}>
                  {!order.publishedAt && 'PENDING'}
                  {order.publishedAt && prettifyPublishDate(new Date(order.publishedAt))}
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color={getColor(getStatus(order, props.organizations))}>
                    {getStatus(order, props.organizations)}
                  </Button>
                </TableCell>
                <TableCell align="center" style={{ padding: '0px' }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!props.searchQuery && props.orders.length === 0 && (
        <Box sx={blankTableStyles}>
          <CenteredDiv>
            No Orders Uploaded
          </CenteredDiv>
        </Box>
      )}
      {props.searchQuery && filteredOrders.length === 0 && (
        <Box sx={blankTableStyles}>
          <CenteredDiv>
            No Results
          </CenteredDiv>
        </Box>
      )}
    </>
  );
}

function hasPendingFrago(order: Order) {
  return order.fragos.some((frago) => frago.status === 'STAFFING');
}

function getColor(status: string) {
  if (/ack/ig.test(status)) {
    return 'error';
  }
  if (/\//ig.test(status)) {
    return 'primary';
  }
  return 'success';
}

function getStatus(order: Order, organizations: Organization[]) {
  if (order.status === 'STAFFING') {
    return 'STAFFING';
  }

  const publisher: Organization | undefined = organizations
    .find((org) => org.id === order.publishingOrganization);

  const numberOfSubscribers = publisher?.subscribers.length || 0;

  const counts = countAcksAndActions(order);

  const totalOrders = [
    counts.opord,
    ...counts.fragos,
  ];

  const everythingIsActioned = totalOrders
    .every((count) => count.actioned === numberOfSubscribers);

  if (everythingIsActioned) {
    return 'ALL ACTIONED';
  }

  const shouldBeInAcknowledged = totalOrders
    .some((count) => count.acknowledged < numberOfSubscribers);

  if (shouldBeInAcknowledged) {
    const totalAcksNeeded = (counts.fragos.length * numberOfSubscribers) + numberOfSubscribers;

    const totalAcksReceived = totalOrders
      .reduce((total, count) => total + count.acknowledged, 0);

    return `${totalAcksReceived}/${totalAcksNeeded} ACKNOWLEDGED`;
  }

  const totalActionsNeeded = (counts.fragos.length * numberOfSubscribers) + numberOfSubscribers;

  const totalActionsReceived = totalOrders
    .reduce((total, count) => total + count.actioned, 0);

  return `${totalActionsReceived}/${totalActionsNeeded} ACTIONED`;
}

function countAcksAndActions(order: Order) {
  return {
    opord: {
      acknowledged: order.subscriberAcknowledgements.length,
      actioned: order.subscriberActions.length,
    },
    fragos: order.fragos
      .filter((frago) => frago.status === 'PUBLISHED')
      .map((frago) => ({
        acknowledged: frago.subscriberAcknowledgements.length,
        actioned: frago.subscriberActions.length,
      })),
  };
}
