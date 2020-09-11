import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {
  STATUS_DESCRIPTION,
  STATUS,
  APPLICATION_STATUS_ARRAY,
} from "../../../constants";
import clsx from "clsx";
import { green, indigo, red, cyan } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  summaryPanelDiv: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  statusChip: {
    marginLeft: "auto",
    color: "white",
    minWidth: "100px",
    display: "flex",
    flexDirection: "row-reverse",
    "& .MuiChip-icon": {
      marginLeft: "auto",
      marginRight: theme.spacing(2),
    },
  },
  cardDiv: {
    width: "100%",
    borderWidth: "1px",
    borderRadius: "6px",
    boxShadow: "0 1px 15px rgba(27,31,35,.15),0 0 1px rgba(106,115,125,.35)",
  },
  cardContentDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  namePanel: {
    display: "flex",
    flexWrap: "wrap",
  },
  newStatus: {
    backgroundColor: cyan[500],
  },
  doneStatus: {
    backgroundColor: green[600],
  },
  rejectedStatus: {
    backgroundColor: red[500],
  },
  proposedStatus: {
    backgroundColor: indigo[500],
  },
  avatarComponent: {
    color: "white",
  },
  emptyDivComponent: {
    display: "flex",
    height: "50px",
    width: "100%",
    padding: theme.spacing(2, 2),
  },
  summaryDataDiv: {
    display: "flex",
    height: "50px",
    width: "100%",
    padding: theme.spacing(2, 2),
  },
}));

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function SummaryPanelComponent(props) {
  const classes = useStyles();
  const studentFound = props.studentFound;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.log(selectedIndex);
  const handleClickChangeStatus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    let applicationStatus = studentFound && studentFound.status;
    APPLICATION_STATUS_ARRAY.forEach((option, index) => {
      if (option.value === applicationStatus) {
        console.log("INDEX : " + index);
        setSelectedIndex(index);
      }
    });
  }, [studentFound]);

  return (
    <div className={classes.summaryPanelDiv}>
      {studentFound ? (
        <div className={classes.summaryDataDiv}>
          <Typography component="h5" variant="h5" className={classes.namePanel}>
            {studentFound.firstName.capitalize() +
              " " +
              (studentFound.middleName
                ? studentFound.middleName.capitalize()
                : "") +
              " " +
              studentFound.lastName.capitalize()}
          </Typography>
          <Chip
            className={clsx(classes.statusChip, {
              [classes.newStatus]:
                APPLICATION_STATUS_ARRAY[selectedIndex].value === STATUS.NEW,
              [classes.doneStatus]:
                APPLICATION_STATUS_ARRAY[selectedIndex].value === STATUS.DONE,
              [classes.proposedStatus]:
                APPLICATION_STATUS_ARRAY[selectedIndex].value ===
                STATUS.PROPOSED,
              [classes.rejectedStatus]:
                APPLICATION_STATUS_ARRAY[selectedIndex].value ===
                STATUS.REJECTED,
            })}
            // avatar={
            //   <Avatar className={classes.avatarComponent}>
            //     {studentFound.status}
            //   </Avatar>
            // }
            label={`${APPLICATION_STATUS_ARRAY[selectedIndex].status}`}
            icon={<ExpandMoreIcon className={classes.avatarComponent} />}
            onClick={handleClickChangeStatus}
            clickable={true}
          />
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {APPLICATION_STATUS_ARRAY.map((option, index) => (
              <MenuItem
                key={option.value}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option.status}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <div className={classes.emptyDivComponent}>
          <Typography component="h5" variant="h5">
            Create a New Student
          </Typography>
        </div>
      )}
    </div>
  );
}
