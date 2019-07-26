/* eslint-disable react/prop-types */
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { Fragment, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Admin } from "./Admin";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

const PillsTabs = () => {
  const [index, onChange] = useState(0);
  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Tabs
                variant={"fullWidth"}
                value={index}
                onChange={(e, val) => onChange(val)}
              >
                <Tab label="Admin" component={Link} to="/" />
                <Tab label="Teacher" component={Link} to="/teacher" />
                <Tab label="Student" component={Link} to="/student" />
              </Tabs>
              <Switch>
                <Route path="/student" component={Student} />
                <Route path="/teacher" component={Teacher} />
                <Route path="/" component={Admin} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
};

PillsTabs.getTheme = () => ({
  MuiTabs: {
    root: {
      width: "100%"
    },
    indicator: {
      display: "none"
    },
    centered: {
      alignItems: "center",
      justifyContent: "center"
    }
  },
  MuiTab: {
    root: {
      position: "relative",
      display: "block",
      borderRadius: "30px",
      textAlign: "center",
      transition: "all .5s",
      padding: "10px 15px",
      color: "#555555",
      height: "auto",
      opacity: "1",
      margin: "10px 0",
      width: "100%",
      float: "none",
      "& + button": {
        margin: "10px 0"
      },
      "&$selected": {
        "&, &:hover": {
          color: "#FFFFFF",
          backgroundColor: "#00acc1",
          boxShadow: "0 7px 10px -5px rgba(76, 175, 80, 0.4)"
        }
      }
    },
    labelContainer: {
      padding: "0!important",
      color: "inherit"
    },
    label: {
      lineHeight: "24px",
      textTransform: "uppercase",
      fontSize: "12px",
      fontWeight: "500",
      position: "relative",
      display: "block",
      color: "inherit"
    }
  }
});


export default PillsTabs;
