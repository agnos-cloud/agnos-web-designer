import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return (
      <>
          <h1>An error occured while rendering this component.</h1>
          <p>See the browser's console window for more info.</p>
          <p>{err.name}</p>
          <p>{err.message}</p>
          <p>{err.stack}</p>
          <p>{info.componentStack}</p>
      </>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
