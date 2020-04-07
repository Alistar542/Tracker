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
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {UserComponent} from '../SaveUserScreen/UserComponent';
import {FetchUserComponent} from '../FindUsersScreen/FetchUserComponent';
import {HomeComponent} from '../HomeScreen/HomeComponent';
import SearchIcon from '@material-ui/icons/Search';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useAuth } from "../LoginScreen/context/auth";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import firebaseApp from '../LoginScreen/context/firebaseApp';





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
    backgroundColor:'#f5f5f5'
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [followUps,setFollowUps] = React.useState();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout=()=>{
    firebaseApp.auth().signOut()
  }
  
  useEffect(() => {

       var date = new Date();
       const fetchObject = {
        followUpDate:new Date(date.getFullYear(),date.getMonth(),date.getDate()),
         //currentUser:authTokens.user
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
     
  });

  
  
  
  return (
    <div className={classes.root}>
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

            <ListItem button key='home' component={Link} to="/home">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
         
            <ListItem button key='addStudent' component={Link} to="/home/add">
              <ListItemIcon><FaceRoundedIcon /></ListItemIcon>
              <ListItemText primary='Add Student' />
            </ListItem>

            <ListItem button key='findStudent' component={Link} to="/home/fetchusercomponent">
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary='Find Student' />
            </ListItem>
         
        </List>
        <Divider />
        <List>
           <ListItem button key='logout' onClick={logout}>
              <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
       

      <Switch>
        <Route exact path={'/home'}>
        <HomeComponent/>
        </Route>
        <Route exact path={'/home/add'}>
        <UserComponent/>
        </Route>
        <Route exact path={"/home/fetchusercomponent"}>
        <FetchUserComponent/>
        </Route>
      </Switch>
        </main>
  </div>
  );
}
