import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loader from "./loader";

export default function Root(props) {
  return (
    <Router>
      <React.StrictMode>
        <Route path="/designs/:id?">
          <Loader />
        </Route>
      </React.StrictMode>
    </Router>
  );
}
