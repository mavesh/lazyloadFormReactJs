import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

const HomeComponent = lazy(() => import("./components/Home"));
const ContactFormComponent = lazy(() => import("./components/ContactForm"));

function App() {
  return (
    <div className="App">
      <Router>
        <RouterLink />
        <Suspense fallback={<div>Loading....</div>}>
          <Switch>
            <Route exact path="/" component={HomeComponent}></Route>
            <Route path="/contact" component={ContactFormComponent}></Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

function RouterLink() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default App;
