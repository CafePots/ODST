import React from 'react';

import { Box, Button, styled } from '@mui/material';

import ODSTLogo from '../../media/ODST-Logo-White.svg';
import { MSALUser, User } from '../common/types';
import AuthContext from './AuthContext';
import FirstLoginForm from './FirstLoginForm';


const btnStyles = {
  border: '5px solid #D9D9D9',
  borderRadius: '40px',
  backgroundColor: '#D9D9D9',
  fontSize: '30px',
  paddingLeft: '20px',
  paddingRight: '20px',
};

const StyledP = styled('p')({
  fontSize: '40px',
  fontFamily: 'Kameron',
  marginTop: '10px',
});

interface Props {
  readonly setUser: (user: User) => void;
}

export default function Login(props: Props) {
  // State
  // -----

  const auth = React.useContext(AuthContext);
  const [failedLogin, setFailedLogin] = React.useState(false);
  const [msalUser, setMsalUser] = React.useState<MSALUser | null>(null);
  const [shouldRequestAdditionalInfo, setShouldRequestAdditionalInfo] = React.useState(false);


  // Functions
  // ---------

  const login = React.useCallback(async () => {
    try {
      const creds = await auth.msal.loginPopup({ scopes: ['User.Read'] });

      if (!creds.account || !creds.account.name) {
        throw new Error('Unknown User');
      }

      const body: MSALUser = {
        tenantId: creds.tenantId,
        uniqueId: creds.uniqueId,
        name: creds.account.name,
        username: creds.account.username,
      };

      setMsalUser(body);

      const checkUserRequest = await fetch('http://localhost:8080/auth/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const user = await checkUserRequest.json();

      if (user === null) {
        setShouldRequestAdditionalInfo(true);
      } else {
        props.setUser(user);
      }
    } catch (e) {
      setFailedLogin(true);
    }
  }, [props.setUser]);


  // View
  // ----

  if (shouldRequestAdditionalInfo && msalUser) {
    return <FirstLoginForm msalUser={msalUser} onComplete={(user) => props.setUser(user)} />;
  }

  return (
    <Box>
      <img src={ODSTLogo} alt="SVG" width={275} height={100} />
      <StyledP>
        Orders Dissemination
        <br />
        and Subscription Tool
      </StyledP>
      {failedLogin && (
      <p style={{ color: '#660000', fontSize: '26px' }}>Login unsuccessful.</p>
      )}
      <Button sx={btnStyles} color="inherit" data-testid="signInBtn" onClick={login}>
        Login with CAC/PIV
      </Button>
    </Box>
  );
}
