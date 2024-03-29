import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { FetchUserComponent } from "../FindUsersScreen/FetchUserComponent";
import { HomeComponent } from "../HomeScreen/HomeComponent";
import SearchIcon from "@material-ui/icons/Search";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import TimelineIcon from "@material-ui/icons/Timeline";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { AuthContext } from "../LoginScreen/context/auth";
import StudentHistoryComponent from "../StudentHistory/StudentHistoryComponent";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsComponent from "../SettingsScreen/SettingsComponent";
import SaveStudentComponent from "../SaveStudentScreen/SaveStudentComponent";
import { AbilityContext } from "../../privilegehandler/privilegehandler";
import { findStudent } from "../../actions/studentactions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
  },
  bottomLink: {
    marginBottom: "auto",
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [followUps, setFollowUps] = React.useState();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const logout = () => {
    setCurrentUser(null);
  };
  const ability = useContext(AbilityContext);

  useEffect(() => {
    let date = new Date();
    const fetchObject = {
      followUpDate: date,
    };
    findStudent(fetchObject, currentUser)
      .then((res) => {
        setFollowUps(res.data.length);
      })
      .catch((err) => {});
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
          <Typography variant="h6" className={classes.title}>
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={followUps} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Typography>
          <Tooltip title="Logout" arrow>
            <Button color="inherit" onClick={logout}>
              <PowerSettingsNewIcon />
            </Button>
          </Tooltip>
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
          <Typography variant="h6" className={classes.title}>
            S Tracker
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Tooltip title="Dashboard" arrow>
            <ListItem button key="dashboard" component={Link} to="/home">
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Tooltip>

          <Tooltip title="New Student" arrow>
            <ListItem
              button
              key="saveStudent"
              component={Link}
              to="/home/saveStudent"
            >
              <ListItemIcon>
                <FaceRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="New Student" />
            </ListItem>
          </Tooltip>

          <Tooltip title="Find Student" arrow>
            <ListItem
              button
              key="findStudent"
              component={Link}
              to="/home/fetchusercomponent"
            >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Find Student" />
            </ListItem>
          </Tooltip>
          <Tooltip title="View Student History" arrow>
            <ListItem
              button
              key="studentHistory"
              component={Link}
              to="/home/studentHistory"
            >
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Student History" />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        {ability.can("view", "settings") ? (
          <List className={classes.bottomLink}>
            <Tooltip title="Settings" arrow>
              <ListItem
                button
                key="settings"
                component={Link}
                to="/home/settings"
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Tooltip>
          </List>
        ) : (
          ""
        )}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Switch>
          <Route exact path={"/home"}>
            <HomeComponent />
          </Route>
          <Route exact path={"/home/fetchusercomponent"}>
            <FetchUserComponent />
          </Route>
          <Route exact path={"/home/studentHistory"}>
            <StudentHistoryComponent />
          </Route>
          <Route exact path={"/home/settings"}>
            <SettingsComponent />
          </Route>
          <Route exact path={"/home/saveStudent"}>
            <SaveStudentComponent />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
