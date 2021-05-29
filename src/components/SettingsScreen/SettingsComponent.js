import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import UserSettingsComponent from "./UserSettingsComponent";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import ListStaffComponent from "./ListStaffPanel/ListStaffComponent";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: "flex",
    "& > *": {
      width: "100%",
    },
    margin: theme.spacing(2),
    height: `calc(100vh - 100px)`,
    flexDirection: "column",
  },
  headingDiv: {
    padding: theme.spacing(2),
  },
  divContainer: {
    display: "flex",
    width: "100%",
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  listStaffPanel: {
    width: "100%",
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function SettingsComponent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [userFound,setUserFound] = React.useState(null);

  const updateUserFound = (user)=> {
    setUserFound(user);
    setValue(1);
  }

  return (
    <Paper className={classes.paperRoot}>
      <div className={classes.headingDiv}>
        <Typography component={"span"} variant="h4">
          Settings
        </Typography>
      </div>
      <Divider />
      <div className={classes.divContainer}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Create User" {...a11yProps(1)} />
          <Tab label="List Staff" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          General
        </TabPanel>
        <TabPanel value={value} index={1} >
          <UserSettingsComponent userFound={userFound} updateUserFound={updateUserFound}/>
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.listStaffPanel} >
          <ListStaffComponent updateUserFound={updateUserFound}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </div>
    </Paper>
  );
}
