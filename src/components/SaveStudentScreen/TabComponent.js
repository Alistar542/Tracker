import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { grey } from "@material-ui/core/colors";
import { ProspectusComponent } from "./ProspectusTab/ProspectusComponent";
import ProposalComponent from "./ProposalTab/ProposalComponent";
import EnrolledComponent from "./EnrolledTab/EnrolledComponent";
import { AbilityContext } from "../../privilegehandler/privilegehandler";
import { STATUS } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: grey[200],
  },
  tabStyle: {
    "& .MuiTab-root": {
      fontSize: "0.750rem",
    },
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function TabComponent(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let status = props.studentFound ? props.studentFound.status : null;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ability = useContext(AbilityContext);

  return (
    <div className={classes.root}>
      <Paper square elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          classes={{ root: classes.tabStyle }}
        >
          <Tab label="Prospectus" {...a11yProps(0)} />
          <Tab
            label="Proposal"
            {...a11yProps(1)}
            // disabled={status === STATUS.NEW || status === null}
          />
          {ability.can("view", "enrolled") && (
            <Tab
              label="Enrolled"
              {...a11yProps(2)}
              // disabled={
              //   status === STATUS.NEW ||
              //   status === STATUS.PROPOSED ||
              //   status === null
              // }
            />
          )}
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <ProspectusComponent {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProposalComponent {...props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EnrolledComponent {...props} />
      </TabPanel>
    </div>
  );
}
