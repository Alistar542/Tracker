import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import UserSettingsComponent from "./UserSettingsComponent";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
      width: "100%",
    },
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    height: `calc(100vh - 100px)`,
    flexDirection: "column",
  },
  divContainer: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
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

  return (
    <Paper className={classes.paperRoot}>
      <Typography component={"span"} variant="h4">
        Settings
      </Typography>
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
          <Tab label="List Users" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          General
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserSettingsComponent />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </div>
    </Paper>
  );
}
