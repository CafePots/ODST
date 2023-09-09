import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Order, User, Frago } from '../common/types';


interface Props {
  readonly user: User;
  readonly order: Order;
  readonly onClose: () => void;
  readonly onAcknowledgement: (order: Order) => void;
  readonly onAction: (order: Order) => void;
  readonly onFragoAck: (order: Order, frago: Frago) => void;
  readonly onFragoAction: (order: Order, frago: Frago) => void;
}

export default function OrderInfoDialog(props: Props) {
  const hasAcknowledged = !!props.order.subscriberAcknowledgements
    .find((ack) => ack.organizationID === props.user.organization);

  const hasActioned = !!props.order.subscriberActions
    .find((act) => act.organizationID === props.user.organization);

  const visibleFragos = props.order.fragos
    .filter((frago) => frago.status === 'PUBLISHED');

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
          <Button
            disabled={hasAcknowledged}
            onClick={() => {
              props.onAcknowledgement(props.order);
              props.onClose();
            }}
          >
            Acknowledge
          </Button>
          <Button
            disabled={(!hasAcknowledged && !hasActioned) || hasActioned}
            onClick={() => {
              props.onAction(props.order);
              props.onClose();
            }}
          >
            Action
          </Button>
        </DialogContentText>
      </DialogContent>
      {visibleFragos.length > 0 && (
        <DialogContent>
          <DialogContentText variant="h5">FRAGOs:</DialogContentText>
          {visibleFragos.map((frago) => (
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
              <Button
                disabled={
                  !!frago.subscriberAcknowledgements
                    .find((ack) => ack.organizationID === props.user.organization)
                }
                onClick={() => {
                  props.onFragoAck(props.order, frago);
                  props.onClose();
                }}
              >
                Acknowledge
              </Button>
              <Button
                disabled={
                  (!frago.subscriberAcknowledgements
                    .find((ack) => ack.organizationID === props.user.organization)
                  && !frago.subscriberActions
                    .find((act) => act.organizationID === props.user.organization))
                    || !!frago.subscriberActions
                      .find((act) => act.organizationID === props.user.organization)
                }
                onClick={() => {
                  props.onFragoAction(props.order, frago);
                  props.onClose();
                }}
              >
                Action
              </Button>
            </DialogContentText>
          ))}
        </DialogContent>
      )}
      {props.order.attachments.length > 0 && (
        <DialogContent>
          <DialogContentText variant="h5">Attachments:</DialogContentText>
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
              </a>
            </DialogContentText>
          ))}
        </DialogContent>
      )}
      <DialogActions>
        <Button variant="outlined" sx={{ width: '100%' }} onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
