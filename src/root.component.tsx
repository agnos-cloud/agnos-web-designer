import React from "react";
import Canvas from "./canvas";
import Page from "./items/page";

export default function Root(props) {
  // get the appropriate canvas with its items (components and connectors)
  const page = new Page();
  page.deserializeFromJSON(`{
    "height": 1000,
    "width": 1000,
    "items": [{
      "id": "comp1",
      "type": "component",
      "height": 100,
      "z": 10,
      "x": 10,
      "y": 10
    }, {
      "id": "comp2",
      "type": "component",
      "width": 100,
      "x": 400,
      "y": 200
    }, {
      "type": "connector",
      "fromComponent": "comp1",
      "toComponent": "comp2"
    }]
  }`);
  return <Canvas page={page}></Canvas>;
}
