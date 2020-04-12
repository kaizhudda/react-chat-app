import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import * as serviceWorker from "./serviceWorker";
import firebase from "./firebase";
import "semantic-ui-css/semantic.min.css";

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
        setIsLoggedIn(true);
        console.log(history);
      }
    });
  }, []);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route path="/">
            <App />
          </Route>
        ) : (
          <>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
