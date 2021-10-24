import React from "react";
import { ArrowHeadType, Elements } from "react-flow-renderer";
import { Storage } from "@material-ui/icons";
import Canvas from "./canvas";
import { Menu } from "./menus";

export default function Root(props) {
  const _ = `{
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
  }`;
  const elements: Elements = [
    {
      id: '1',
      type: 'input',
      data: {
        label: (
          <>
            Welcome to <strong>React Flow!</strong>
          </>
        ),
      },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      data: {
        label: (
          <>
            This is a <strong>default node</strong>
          </>
        ),
      },
      position: { x: 100, y: 100 },
    },
    {
      id: '3',
      data: {
        label: (
          <>
            This one has a <strong>custom style</strong>
          </>
        ),
      },
      position: { x: 400, y: 100 },
      style: {
        background: '#D6D5E6',
        color: '#333',
        border: '1px solid #222138',
        width: 180,
      },
    },
    {
      id: '4',
      position: { x: 250, y: 200 },
      data: {
        label: (
          <>
            <img src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png" width="40" />
          </>
        ),
      },
    },
    {
      id: '5',
      data: {
        label: (
          <>
            <svg version="1.1"
                width="100" height="100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path fill="red" stroke="black" d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />
            </svg>
          </>
        ),
      },
      position: { x: 250, y: 325 },
    },
    {
      id: '6',
      type: 'output',
      data: {
        label: (
          <>
            An <strong>output node</strong>
          </>
        ),
      },
      position: { x: 100, y: 480 },
    },
    {
      id: '7',
      type: 'output',
      data: { label: 'Another output node' },
      position: { x: 400, y: 450 },
    },
    { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
    { id: 'e1-3', source: '1', target: '3' },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      animated: true,
      label: 'animated edge',
    },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      arrowHeadType: ArrowHeadType.ArrowClosed,
      label: 'edge with arrow head',
    },
    {
      id: 'e5-6',
      source: '5',
      target: '6',
      type: 'smoothstep',
      label: 'smooth step edge',
    },
    {
      id: 'e5-7',
      source: '5',
      target: '7',
      type: 'step',
      style: { stroke: '#f6ab6c' },
      label: 'a step edge',
      animated: true,
      labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
    },
  ];

  const menus: Menu[] = [
    {
      id: 'm1',
      icon: (<span>&#128270;</span>),
      actions: [
        {
          id: 'a1',
          text: 'Database',
          icon: (<Storage />),
          element: {
            id: '400',
            position: { x: 0, y: 0 },
            data: {
              label: (
                <>
                  <img src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png" width="40" />
                </>
              ),
            },
          }
        }
      ]
    },
    {
      id: 'm2',
      icon: (<span>&#128270;</span>),
      actions: [
        {
          id: 'a2',
          text: 'Database',
          icon: (<Storage />),
          element: {
            id: '401',
            position: { x: 0, y: 0 },
            data: {
              label: (
                <>
                  <img src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png" width="40" />
                </>
              ),
            },
          }
        }
      ]
    }
  ];
  
  return (<React.StrictMode><Canvas elements={elements} menus={menus} /></React.StrictMode>);
}
