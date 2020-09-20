import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import RestorePageRoundedIcon from "@material-ui/icons/RestorePageRounded";
import { Link } from "react-router-dom";
import { UserComponent } from "../SaveUserScreen/UserComponent";
import { FetchUserComponent } from "../FindUsersScreen/FetchUserComponent";
import StudentHistoryComponent from "../StudentHistory/StudentHistoryComponent";
import { Route, Switch } from "react-router-dom";
import grey from "@material-ui/core/colors/grey";
import cyan from "@material-ui/core/colors/cyan";
import amber from "@material-ui/core/colors/amber";

const useStyles = makeStyles((theme) => ({
  outerDiv: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  cardComponent: {
    width: "25%",
    height: "30%",
    margin: "20px",
    minHeight: "200px",
    flexGrow: 1,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
  },
}));

export function HomeComponent() {
  const classes = useStyles();
  return (
    <div className={classes.outerDiv}>
      <Card
        key="addStudent"
        component={Link}
        to="/home/saveStudent"
        className={classes.cardComponent}
        style={{ color: grey[800] }}
      >
        <CardContent className={classes.cardContent}>
          <AddRoundedIcon style={{ fontSize: 60 }} />
          <Typography variant="h5" component="h2">
            Add a Student
          </Typography>
        </CardContent>
      </Card>
      <Card
        key="findStudent"
        component={Link}
        to="/home/fetchusercomponent"
        className={classes.cardComponent}
        style={{ color: grey[800] }}
      >
        <CardContent className={classes.cardContent}>
          <SearchIcon style={{ fontSize: 60 }} />
          <Typography variant="h5" component="h2">
            Find Students
          </Typography>
        </CardContent>
      </Card>
      <Card
        key="studentHistory"
        component={Link}
        to="/home/studentHistory"
        className={classes.cardComponent}
        style={{ color: grey[800] }}
      >
        <CardContent className={classes.cardContent}>
          <RestorePageRoundedIcon style={{ fontSize: 60 }} />
          <Typography variant="h5" component="h2">
            Student History
          </Typography>
        </CardContent>
      </Card>

      <Switch>
        <Route exact path={"/home/add"}>
          <UserComponent />
        </Route>
        <Route exact path={"/home/fetchusercomponent"}>
          <FetchUserComponent />
        </Route>
        <Route exact path={"/home/studentHistory"}>
          <StudentHistoryComponent />
        </Route>
      </Switch>
    </div>
  );
}
