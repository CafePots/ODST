import Box from '@mui/material/Box';

import { useLocation } from 'react-router-dom';


export default function PageTitle() {
  const location = useLocation();

  return (
    <>
      <Box sx={{ height: '97px' }} />
      <p style={{
        fontFamily: 'Kameron',
        fontSize: '40px',
        marginTop: '0px',
        marginBottom: '20px',
        top: '97px',
        height: '75px',
        position: 'sticky',
        background: 'white',
        alignItems: 'center',
        display: 'flex',
        paddingLeft: '25px',
        zIndex: 1,
      }}
      >
        {getCurrentPageTitle(location.pathname)}
      </p>
    </>
  );
}

/**
 * Helpers
 */

function getCurrentPageTitle(pathname: string) {
  switch (pathname) {
    case '/publications':
      return 'Publications';
    case '/subscriptions':
      return 'Subscriptions';
    case '/contact':
      return 'Contact Us';
    case '/about':
      return 'About ODST';
    default:
      return '';
  }
}
