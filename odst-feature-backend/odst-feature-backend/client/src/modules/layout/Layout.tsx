import React from 'react';

import Box from '@mui/material/Box';

import Sidebar from './Sidebar';
import TitleBar from './TitleBar';
import PageTitle from './PageTitle';

import { User } from '../common/types';
import AuthContext from '../auth/AuthContext';


interface Props {
  readonly children: React.ReactElement | React.ReactElement[];
}

export default function Layout(props: Props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const auth = React.useContext(AuthContext);

  const toggleSidebar = React.useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible, setIsVisible]);

  return (
    <>
      {auth.user && (
        <>
          <TitleBar onMenuClick={toggleSidebar} user={auth.user} />
          <Sidebar
            open={isVisible}
            onCloseFunction={toggleSidebar}
          />
          <PageTitle />
        </>
      )}
      <Box sx={auth.user ? {
        marginLeft: '25px',
        marginRight: '25px',
      } : {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      >

        {props.children}
      </Box>
    </>
  );
}
