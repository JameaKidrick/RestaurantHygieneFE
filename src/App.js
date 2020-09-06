import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

// ACTIONS
import { logInStatus, logOutUser, resetResponseState } from "./actions";

// COMPONENTS
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage";
import LogIn from "./components/LogIn";
import RestaurantSearch from "./components/RestaurantSearch";
import SingleRestaurant from "./components/SingleRestaurant";
import MyReviews from "./components/MyReviews";
import MyFavoriteRestaurants from "./components/MyFavoriteRestaurants";
import Profile from "./components/Profile";
import FastfoodIcon from "@material-ui/icons/Fastfood";

// STYLING
import { GlobalStyle } from "./syles/globalStyling";
import { Nav } from "./syles/navBar";

function App(props) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.logInReducer.loggedIn);
  const user_id = useSelector((state) => state.logInReducer.user_id);

  useEffect(() => {
    dispatch(logInStatus(user_id));
  }, []);

  return (
    <Router>
      <GlobalStyle className="App" style={{ margin: "0" }}>
        {loggedIn && (
          <Nav>
            <NavLink className="link home logo" to="/">
              <div className="logoContainer">
                <FastfoodIcon className="icon" />
                <h2>Restaurant Hygiene</h2>
              </div>
            </NavLink>
            <div className="links">
              <NavLink
                className="link home"
                isActive={(match, location) => {
                  if (match.url === "/") {
                    return true;
                  }
                }}
                to="/"
                onClick={() => dispatch(resetResponseState())}
              >
                Home
              </NavLink>
              <NavLink
                className="link search"
                isActive={(match, location) => {
                  if (
                    (match && match.url.includes("/findrestaurant")) ||
                    location.pathname.includes("/restaurant") ||
                    location.pathname.includes("/findrestaurant")
                  ) {
                    return true;
                  }
                }}
                to="/findrestaurant"
                onClick={() => dispatch(resetResponseState())}
              >
                Find a Restaurant
              </NavLink>
              <NavLink className="link reviews" to="/myreviews">
                My Reviews
              </NavLink>
              <NavLink className="link restaurants" to="/myrestaurants">
                My Restaurants
              </NavLink>
              <NavLink className="link settings" to="/settings">
                Settings
              </NavLink>
              <NavLink
                className="link home"
                isActive={(match, location) => {
                  if (match.url === "/logout") {
                    return true;
                  }
                }}
                to="/"
                onClick={() =>
                  dispatch(logOutUser(props.persistor, resetResponseState))
                }
              >
                Log out
              </NavLink>
            </div>
          </Nav>
        )}
        {!loggedIn && (
          <Nav>
            <Link className="link home logo" to="/">
              <div className="logoContainer">
                <FastfoodIcon className="icon" />
                <h2>Restaurant Hygiene</h2>
              </div>
            </Link>
            <div className="links">
              <NavLink
                className="link home"
                isActive={(match, location) => {
                  if (match.url === "/") {
                    return true;
                  }
                }}
                to="/"
                onClick={() => dispatch(resetResponseState())}
              >
                Home
              </NavLink>
              <NavLink
                className="link search"
                isActive={(match, location) => {
                  if (
                    (match && match.url.includes("/findrestaurant")) ||
                    location.pathname.includes("/restaurant") ||
                    location.pathname.includes("/findrestaurant")
                  ) {
                    return true;
                  }
                }}
                to="/findrestaurant"
              >
                Find a Restaurant
              </NavLink>
              <NavLink className="link register" to="/register">
                Signup
              </NavLink>
              <NavLink className="link login" to="/login">
                Log in
              </NavLink>
            </div>
          </Nav>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LogIn} />
          <Route path="/findrestaurant" component={RestaurantSearch} />
          <Route
            path="/findrestaurant?page=:number"
            component={RestaurantSearch}
          />
          <Route
            path="/restaurant/:place_id"
            render={(props) => (
              <SingleRestaurant {...props} persistor={props.persistor} />
            )}
          />
          <PrivateRoute exact path="/myreviews" component={MyReviews} />
          <PrivateRoute
            exact
            path="/myrestaurants"
            component={MyFavoriteRestaurants}
          />
          <PrivateRoute
            exact
            path="/settings"
            component={Profile}
            persistor={props.persistor}
          />
          <Route component={ErrorPage} />
        </Switch>
      </GlobalStyle>
    </Router>
  );
}

export default App;
