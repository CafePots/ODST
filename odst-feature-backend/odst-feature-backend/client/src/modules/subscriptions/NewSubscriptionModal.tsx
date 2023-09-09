import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { Organization, User } from '../common/types';


const modalBoxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#666666',
  border: '2px solid #666666',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

interface Props {
  readonly open: boolean;
  readonly user: User;
  readonly organizations: Organization[];
  readonly onClose: () => void;
  readonly onSubscribe: (organization: Organization) => void;
  readonly onUnsubscribe: (organization: Organization) => void;
}

export default function NewSubscriptionModal(props: Props) {
  function handleSubscribe(organization: Organization) {
    props.onSubscribe(organization);
    props.onClose();
  }

  function handleUnsubscribe(organization: Organization) {
    props.onUnsubscribe(organization);
    props.onClose();
  }

  const subscribedTo = props.organizations
    .filter((org) => org.subscribers.includes(props.user.id));

  const notSubscribedTo = props.organizations
    .filter((org) => !org.subscribers.includes(props.user.id));

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <h4>Subscribed To</h4>
        {subscribedTo.map((org) => (
          <Button
            key={org.id}
            variant="outlined"
            onClick={() => handleUnsubscribe(org)}
            style={{
              color: 'white',
              borderColor: 'white',
            }}
          >
            {org.name}
          </Button>
        ))}
        <h4>Not Subscribed To</h4>
        {notSubscribedTo.map((org) => (
          <Button
            key={org.id}
            variant="outlined"
            onClick={() => handleSubscribe(org)}
            style={{
              color: 'white',
              borderColor: 'white',
            }}
          >
            {org.name}
          </Button>
        ))}
      </Box>
    </Modal>
  );
}
