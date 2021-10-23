import React, { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Fab, Action } from "react-tiny-fab";
import Canvas from "./canvas";
import Page from "./ui/models/page";
import Renderer from "./ui/interactions/renderer";

export default function Root(props) {
  const [scale, setScale] = useState(1);
  const renderer = new Renderer();
  // get the appropriate canvas with its items (components and connectors)
  const page = new Page();
  page.deserializeFromJSON(`{
    "height": 2000,
    "width": 2000,
    "items": [{
      "id": "comp1",
      "type": "component",
      "height": 100,
      "z": 10,
      "x": 10,
      "y": 10,
      "path": {
        "d": "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z",
        "fill": "red",
        "stroke": "black"
      }
    }, {
      "id": "comp2",
      "type": "component",
      "width": 100,
      "x": 400,
      "y": 200,
      "path": {
        "d": "M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-3.409c-3.006 0-7.588-.523-10-2.256v2.434c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.434c-2.418 1.738-7.005 2.256-10 2.256zm0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z"
      }
    }, {
      "id": "comp3",
      "type": "component",
      "width": 100,
      "x": 600,
      "y": 300,
      "image": {
        "src": "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png"
      },
      "path": {
        "d": "M 40,70 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z",
        "fill": "red",
        "stroke": "black"
      }
    }, {
      "type": "connector",
      "fromComponent": "comp1",
      "toComponent": "comp3"
    }, {
      "id": "comp4",
      "type": "component",
      "width": 100,
      "x": 600,
      "y": 100,
      "path": [{
        "d": "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z",
        "fill": "red",
        "stroke": "black"
      }, {
        "d": "M 40,70 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z",
        "fill": "red",
        "stroke": "black"
      }]
    }, {
      "id": "comp5",
      "type": "component",
      "width": 100,
      "x": 600,
      "y": 100,
      "path": [{
        "d": "M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256z",
        "fill": "red",
        "stroke": "black"
      }, {
        "d": "m-10-3.409c-3.006 0-7.588-.523-10-2.256v2.434c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.434c-2.418 1.738-7.005 2.256-10 2.256zm0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z",
        "fill": "red",
        "stroke": "black"
      }, {
        "d": "m0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z",
        "fill": "red",
        "stroke": "black"
      }, {
        "d": "m0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z",
        "fill": "red",
        "stroke": "black"
      }]
    }, {
      "type": "connector",
      "fromComponent": "comp1",
      "toComponent": "comp5"
    }]
  }`);
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
      doubleClick={{ mode: scale === 1 ? "zoomIn" : "zoomOut" }}
      panning={{ disabled: scale === 1 }}
    >
      {({ zoomIn, zoomOut, resetTransform, state: { scale } }) => (
        <React.Fragment>
          <TransformComponent>
            <Canvas page={page} renderer={renderer} scale={scale} setScale={setScale}></Canvas>
          </TransformComponent>
          <Fab
            icon={<span>&#128736;</span>}
            // mainButtonStyles={{}}
            style={{ top: 0, left: 0 }}
            event="click"
            alwaysShowTitle={true}
          >
            <Action
              style={{}}
              text="Zoom In"
              onClick={() => zoomIn()}
            >
              +
            </Action>
            <Action
              style={{}}
              text="Zoom Out"
              onClick={() => zoomOut()}
            >
              -
            </Action>
          </Fab>
          <Fab
            icon={<span>&#128270;</span>}
            // mainButtonStyles={{}}
            style={{ bottom: 0, left: 0 }}
            event="click"
            alwaysShowTitle={true}
          >
            <Action
              // style={{}}
              text="Zoom In"
              onClick={() => zoomIn()}
            >
              +
            </Action>
            <Action
              // style={{}}
              text="Zoom Out"
              onClick={() => zoomOut()}
            >
              -
            </Action>
            <Action
              // style={{}}
              text="Reset"
              onClick={() => resetTransform()}
            >
              x
            </Action>
          </Fab>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}
