import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PublishIcon from '@mui/icons-material/Publish';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';

import { Link } from 'react-router-dom';


interface Props {
  readonly open: boolean;
  readonly onCloseFunction: () => void;

}

const links = [
  {
    sidebarDisplay: 'Publications',
    headerDisplay: 'Publications',
    path: '/publications',
    icon: <PublishIcon />,
  },
  {
    sidebarDisplay: 'Subscriptions',
    headerDisplay: 'Subscriptions',
    path: '/subscriptions',
    icon: <PlaylistAddCheckIcon />,
  },
  {
    sidebarDisplay: 'Contact Us',
    headerDisplay: 'Contact Us',
    path: '/contact',
    icon: <InfoOutlinedIcon />,
  },
  {
    sidebarDisplay: 'About',
    headerDisplay: 'About ODST',
    path: '/about',
    icon: <ContactPageOutlinedIcon />,
  },
];

export default function Sidebar({ open, onCloseFunction }: Props) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onCloseFunction}
      onClick={onCloseFunction}
      sx={{
        '& .MuiDrawer-paper': {
          color: 'black',
          background: '#AFBCF2',
        },
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      }}
      />
      <Divider />
      <Box
        sx={{
          padding: '37.5px',
          bgcolor: '#7C90E2',
          alignContent: 'center',
          textAlign: 'center',
          fontSize: '36px',
        }}
      >
        Organization
      </Box>
      <List>
        {links.map((link) => (
          <Link key={link.path} to={link.path} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem
              key={link.sidebarDisplay}
              disablePadding
              sx={{
                background: '#9EAFEF', marginTop: '5px', marginBottom: '5px',
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.sidebarDisplay} primaryTypographyProps={{ fontSize: '30px' }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
