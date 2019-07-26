import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import PillsTabs from "./PillsTabs";
import "./styles.css";

const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

function App() {
  return (
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true
          },
          overrides: PillsTabs.getTheme(muiBaseTheme)
        })}
      >
        <PillsTabs />
      </MuiThemeProvider>
    </JssProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
