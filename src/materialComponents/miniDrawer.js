import React,{useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {UserComponent} from '../components/UserComponent';
import {FetchUserComponent} from '../components/FetchUserComponent';
import CreateUserComponent from '../components/CreateUserComponent';
import SearchIcon from '@material-ui/icons/Search';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useAuth } from "../components/Login/context/auth";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';




const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(true);
  const [followUps,setFollowUps] = React.useState();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { setAuthTokens } = useAuth();
  const logout=()=>{
    setAuthTokens();
    setLoggedIn(false);
  }
  
  useEffect(() => { 
    if(authTokens){
      var date = new Date();
      const fetchObject = {
        followUpDate:new Date(date.getFullYear(),date.getMonth(),date.getDate()),
        currentUser:authTokens.user
      }
      
  //https://protected-gorge-55144.herokuapp.com/student/getstudent
  //http://localhost:5000/student/getstudent
      axios.post('http://localhost:5000/student/getstudent',fetchObject)
      .then(res => {
          
          console.log(res.data)
         
          setFollowUps(res.data.length);
              
          
      })
      .catch(err =>{
       
      })
    }
  });
  const {authTokens} = useAuth();
  if (!isLoggedIn && !authTokens) {
    return <Redirect to="/" />;
  }
  
  
  
  return (
    <div className={classes.root}>
      <Router>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Tracker
          </Typography>
          <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={followUps} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
         
            <ListItem button key='addStudent' component={Link} to='/add'>
              <ListItemIcon><FaceRoundedIcon /></ListItemIcon>
              <ListItemText primary='Add Student' />
            </ListItem>

            <ListItem button key='findStudent' component={Link} to='/fetchusercomponent'>
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary='Find Student' />
            </ListItem>
         
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
           <ListItem button key='logout' onClick={logout}>
              <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
        <Route exact path="/add">
        <UserComponent/>
        </Route>
        <Route exact path="/fetchusercomponent">
        <FetchUserComponent/>
        </Route>
      </Switch>
        </main>
        </Router>
    </div>
  );
}
