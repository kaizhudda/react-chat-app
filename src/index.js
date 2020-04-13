import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import * as serviceWorker from "./serviceWorker";
import firebase from "./firebase";
import "semantic-ui-css/semantic.min.css";
import rootReducer from "./store/reducers";
import { setUser } from "./store/actions";
import { selectUserLoading } from "./store/selectors/user";
import Spinner from "./common/Spinner";

const store = createStore(rootReducer, composeWithDevTools());

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const history = useHistory();
  const isLoading = useSelector((state) => selectUserLoading(state));
  console.log(isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
        history.push("/");
        setIsLoggedIn(true);
      }
    });
  }, []);
  return (
    <Router>
      {isLoading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={App} />
        </Switch>
      )}
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
