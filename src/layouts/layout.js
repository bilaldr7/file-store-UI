import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton,
  ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Copyright from '../components/Copyright';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import AuthService from '../services/authService';
import LogoutIcon from '@mui/icons-material/Logout';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();
export default function Layout({ children,user }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // function updateWidth() {
  //   const width = window.innerWidth;
  //   const widthLimit = 576;
  //   const isMobile = width <= widthLimit;
  //   const wasMobile = this.previousWidth <= widthLimit;

  //   if (isMobile !== wasMobile) {
  //     this.setState({
  //       isOpen: !isMobile
  //     });
  //   }

  //   this.previousWidth = width;
  // }

  // /**
  //  * Add event listener
  //  */
  // function componentDidMount() {
  //   this.updateWidth();
  //   window.addEventListener("resize", this.updateWidth.bind(this));
  // }

  // /**
  //  * Remove event listener
  //  */
  // function componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateWidth.bind(this));
  // }


  return (<>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }} className="vh-100">
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              File-store
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton component={Link} to='/dossiers/root' >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="My Drive" />
            </ListItemButton>
            <ListItemButton component={Link} to='/network'>
              <ListItemIcon>
                <DevicesIcon />
              </ListItemIcon>
              <ListItemText primary="Computers" />
            </ListItemButton>
            <ListItemButton component={Link} to='/metrics' >
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="Statistiques" />
            </ListItemButton>
            <ListItemButton onClick={AuthService.logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            marginTop: '4rem',
            width: '100%',
          }}
        >
          <div className='container-fluid pb-4 mb-4 overflow-auto' style={{height:'70vh'}}>
            <div className='row px-3 mb-3 mt-4'>
              <div className='col-12'>
                <p className='fs-18 fw-600'>hello {user.firstName}, welcome to your File-store</p>
              </div>
            </div>
            {children}
          </div>
          <hr />
          <Copyright className="pb-4" sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  </>
  )
}
