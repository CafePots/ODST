import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import {
  Frago,
  Order,
  Organization,
  User,
} from '../common/types';


interface Props {
  readonly order: Order;
  readonly users: User[];
  readonly organization: Organization;
  readonly onClose: () => void;
  readonly onDelete: (order: Order) => void;
  readonly onAttachment: (order: Order) => void;
  readonly onFrago: (order: Order) => void;
  readonly onPublish: (order: Order) => void;
  readonly onFragoPublish: (order: Order, frago: Frago) => void;
  readonly onFragoDelete: (order: Order, frago: Frago) => void;
}

export default function OrderInfoDialog(props: Props) {
  const distroList = props.organization.subscribers
    .map((sub: string) => props.users.find((user) => sub === user.id)!)
    .map((user: User) => user.email);

  return (
    <Dialog open>
      <DialogContent>
        <DialogContentText variant="h5">OPORD</DialogContentText>
        <DialogContentText
          sx={{
            fontFamily: 'Maven Pro',
            color: 'black',
            fontSize: '18px',
          }}
        >
          <a
            key={props.order.opord.name}
            target="_blank"
            href={`http://localhost:8080/${props.order.opord.src}`}
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            {props.order.opord.name}
          </a>
          <a
            target="_blank"
            style={{ textDecoration: 'none', color: 'black' }}
            href={buildMailingList(props.order, distroList)}
            rel="noreferrer"
          >
            <Button
              disabled={props.order.status === 'PUBLISHED'}
              onClick={() => {
                props.onPublish(props.order);
                props.onClose();
              }}
            >
              {props.order.status === 'STAFFING' && 'Publish'}
              {props.order.status === 'PUBLISHED' && 'Published'}
            </Button>
            {props.order.status === 'STAFFING' && (
              <Button
                color="error"
                onClick={() => {
                  props.onDelete(props.order);
                  props.onClose();
                }}
              >
                Delete
              </Button>
            )}
          </a>
        </DialogContentText>
        <Divider />
      </DialogContent>
      <DialogContent>
        <DialogContentText variant="h5">
          FRAGOS:
          <Button
            onClick={() => {
              props.onFrago(props.order);
              props.onClose();
            }}
          >
            Add
          </Button>
        </DialogContentText>
        {props.order.fragos.map((frago) => (
          <DialogContentText
            sx={{
              fontFamily: 'Maven Pro',
              color: 'black',
              fontSize: '18px',
            }}
          >
            <a
              key={frago.file.name}
              target="_blank"
              href={`http://localhost:8080/${frago.file.src}`}
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {frago.file.name}
            </a>
            <a
              target="_blank"
              style={{ textDecoration: 'none', color: 'black' }}
              href={buildMailingListForFrago(props.order, frago, distroList)}
              rel="noreferrer"
            >
              <Button
                disabled={frago.status === 'PUBLISHED'}
                onClick={() => {
                  props.onFragoPublish(props.order, frago);
                  props.onClose();
                }}
              >
                {frago.status === 'STAFFING' && 'Publish'}
                {frago.status === 'PUBLISHED' && 'Published'}
              </Button>
            </a>
            {frago.status === 'STAFFING' && (
            <Button
              onClick={() => {
                props.onFragoDelete(props.order, frago);
                props.onClose();
              }}
              color="error"
            >
              Delete
            </Button>
            )}
            <Divider />
          </DialogContentText>
        ))}
      </DialogContent>
      <DialogContent>
        <DialogContentText variant="h5">
          Attachments:
          <Button
            onClick={() => {
              props.onAttachment(props.order);
              props.onClose();
            }}
          >
            Add
          </Button>
        </DialogContentText>
        {props.order.attachments.map((attachment) => (
          <DialogContentText
            sx={{
              fontFamily: 'Maven Pro',
              color: 'black',
              fontSize: '18px',
            }}
          >
            <a
              key={attachment.name}
              target="_blank"
              href={`http://localhost:8080/${attachment.src}`}
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {attachment.name}
              {attachment.extension}
            </a>
          </DialogContentText>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" sx={{ width: '100%' }} onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function buildMailingList(order: Order, distro: string[]) {
  const recipients = distro.join(',');
  const subject = order.opord.name;
  const body = `Team. Please see the new order for ${order.opord.name} in the ODST website.`;

  return `mailto:${recipients}?subject=${subject}&body=${body}`;
}

function buildMailingListForFrago(order: Order, frago: Frago, distro: string[]) {
  const recipients = distro.join(',');
  const subject = `${order.opord.name} (${frago.file.name})`;
  const body = `Team. Please see the new FRAGO for ${order.opord.name} in the ODST website.`;

  return `mailto:${recipients}?subject=${subject}&body=${body}`;
}
