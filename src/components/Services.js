import React, { Component, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";

export default class Services extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
  }
  render() {
    return (
      <div className="service-container">
        <h1>Services</h1>
        <ServiceLinks path={this.props.match.path} />
        <Switch>
          <Route
            path={`${this.props.match.path}/:selectedService`}
            component={SelectedService}
          ></Route>
        </Switch>
      </div>
    );
  }
}

function SelectedService(props) {
  if (props.match.params.selectedService === "webdesigning") {
    return <WebDesigning />;
  } else if (props.match.params.selectedService === "webdevelopemnt") {
    return <WebDevelopment />;
  } else {
    return <PageNotFound />;
  }
}

function WebDesigning() {
  return (
    <div>
      <h1>Web designing loaded</h1>
    </div>
  );
}

function WebDevelopment() {
  return (
    <div>
      <h1>Web Developement loaded</h1>
    </div>
  );
}

function PageNotFound() {
  return (
    <div>
      <h1>404: Page Not Found..</h1>
    </div>
  );
}

function ServiceLinks(props) {
  const { path } = props;
  let history = useHistory();
  const redirectToContact = () => {
    history.push("/contact");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to={`${path}/webdesigning`}>Web Designing</Link>
        </li>
        <li>
          <Link to={`${path}/webdevelopemnt`}>Web Development</Link>
        </li>
        <li>
          Redirect to{" "}
          <button onClick={redirectToContact} value="Contact">
            Contact Form
          </button>
        </li>
      </ul>
    </nav>
  );
}
