import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./loader";

export default function Root(props) {
  console.log(props);
  
  return (
    <Router>
      <React.StrictMode>
        <Loader />
      </React.StrictMode>
    </Router>
  );
}
