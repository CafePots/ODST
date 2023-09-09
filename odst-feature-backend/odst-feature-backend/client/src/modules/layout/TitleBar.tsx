import { styled, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';

import ODSTLogo from '../../media/ODST-Logo-gray.svg';
import { User } from '../common/types';


const CustomImg = styled('img')({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

interface Props {
  readonly onMenuClick: () => void;
  readonly user: User | null;
}

export default function TitleBar({ onMenuClick, user }: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: '#D9D9D9',
        }}
      >
        <Toolbar sx={{
          justifyContent: 'space-between',
          height: 97,
        }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            data-testid="menuBtn"
            sx={{ mr: 2 }}
            onClick={() => onMenuClick()}
          >
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>
          <CustomImg src={ODSTLogo} alt="SVG" width={215} height={78} />
          {user && (
            <Avatar sx={{ bgcolor: 'black' }}>
              {`${user.firstName[0]}${user.lastName[0]}`}
            </Avatar>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
