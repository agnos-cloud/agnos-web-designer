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
    // {
    //   id: '1',
    //   type: 'input',
    //   data: {
    //     label: (
    //       <>
    //         Welcome to <strong>React Flow!</strong>
    //       </>
    //     ),
    //   },
    //   position: { x: 250, y: 0 },
    // },
    // {
    //   id: '2',
    //   data: {
    //     label: (
    //       <>
    //         This is a <strong>default node</strong>
    //       </>
    //     ),
    //   },
    //   position: { x: 100, y: 100 },
    // },
    // {
    //   id: '3',
    //   data: {
    //     label: (
    //       <>
    //         This one has a <strong>custom style</strong>
    //       </>
    //     ),
    //   },
    //   position: { x: 400, y: 100 },
    //   style: {
    //     background: '#D6D5E6',
    //     color: '#333',
    //     border: '1px solid #222138',
    //     width: 180,
    //   },
    // },
    // {
    //   id: '4',
    //   type: 'component',
    //   position: { x: 250, y: 200 },
    //   data: {
    //     label: (
    //       <>
    //         <img src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png" width="98" style={{pointerEvents: "none"}} />
    //       </>
    //     ),
    //   },
    // },
    // {
    //   id: '5',
    //   type: 'component',
    //   data: {
    //     label: (
    //       <>
    //         <svg version="1.1"
    //             width="98" height="98"
    //             xmlns="http://www.w3.org/2000/svg"
    //             style={{pointerEvents: "none"}}
    //         >
    //             <path fill="red" stroke="black" d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />
    //         </svg>
    //       </>
    //     ),
    //   },
    //   position: { x: 250, y: 325 },
    // },
    // {
    //   id: '6',
    //   type: 'output',
    //   data: {
    //     label: (
    //       <>
    //         An <strong>output node</strong>
    //       </>
    //     ),
    //   },
    //   position: { x: 100, y: 480 },
    // },
    // {
    //   id: '7',
    //   type: 'output',
    //   data: { label: 'Another output node' },
    //   position: { x: 400, y: 450 },
    // },
    // { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
    // { id: 'e1-3', source: '1', target: '3' },
    // {
    //   id: 'e3-4',
    //   source: '3',
    //   target: '4',
    //   animated: true,
    //   label: 'animated edge',
    // },
    // {
    //   id: 'e4-5',
    //   source: '4',
    //   target: '5',
    //   arrowHeadType: ArrowHeadType.ArrowClosed,
    //   label: 'edge with arrow head',
    // },
    // {
    //   id: 'e5-6',
    //   source: '5',
    //   target: '6',
    //   type: 'smoothstep',
    //   label: 'smooth step edge',
    // },
    // {
    //   id: 'e5-7',
    //   source: '5',
    //   target: '7',
    //   type: 'step',
    //   style: { stroke: '#f6ab6c' },
    //   label: 'a step edge',
    //   animated: true,
    //   labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
    // },
  ];

  const menus: Menu[] = [
    {
      id: 'menu1',
      icon: (<span>&#128736;</span>),
      actions: [
        {
          id: 'menu1-0',
          text: 'User',
          paths: [{
            d: "M 76.424686 1042.720704 C 74.196561 1042.488204 71.697186 1042.032892 70.864061 1041.703517 C 70.030936 1041.374142 61.525311 1038.845704 51.963749 1036.084767 C 42.402186 1033.333517 34.516562 1031.008517 34.429374 1030.921329 C 34.196874 1030.688829 36.715624 988.412581 37.296874 982.842268 C 39.563749 961.258519 43.341874 950.679769 52.157499 941.253832 C 59.752499 933.145394 67.085936 929.483519 79.708748 927.516957 C 85.220935 926.65477 119.14656 926.286645 127.322809 926.993832 C 140.323434 928.117582 148.635309 930.093832 156.453121 933.930082 C 160.395934 935.857894 161.974996 937.020394 165.588433 940.614457 C 175.014371 949.982269 179.354371 962.973206 181.446871 987.996018 C 182.609371 1001.965393 183.936558 1030.591954 183.432808 1031.076329 C 182.522183 1031.967579 165.704683 1036.675704 160.076246 1037.615392 C 139.635622 1041.044767 89.81281 1044.086642 76.424686 1042.720704 Z M 76.424686 1042.720704",
            style: "fill-rule:nonzero;fill:rgb(1.176471%,3.529412%,1.568627%);fill-opacity:1;stroke-width:0.505076;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;",
            transform: "matrix(0.403226,0,0,0.403226,0,-324.326907)"
          }, {
            d: "M 147.618121 883.099771 C 147.618121 861.932584 129.415309 844.776022 106.959685 844.776022 C 84.50406 844.776022 66.301248 861.932584 66.301248 883.099771 C 66.301248 904.266958 84.50406 921.433207 106.959685 921.433207 C 129.415309 921.433207 147.618121 904.266958 147.618121 883.099771 Z M 147.618121 883.099771 ",
            transform: "matrix(0.403226,0,0,0.403226,0,-324.326907)"
          }],
        }, {
          id: 'menu1-1',
          text: 'Server',
          image: "data:image/png;base64,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",
        }, {
          id: 'menu1-2',
          text: 'Database',
          paths: [{
            d: "M 50.0625 0 C 27.292969 0 8.832031 6.730469 8.832031 15.035156 L 8.832031 27.371094 C 8.832031 35.679688 27.292969 42.40625 50.0625 42.40625 C 72.835938 42.40625 91.296875 35.675781 91.296875 27.371094 L 91.296875 15.035156 C 91.296875 6.730469 72.835938 0 50.0625 0 Z M 50.0625 0",
          }, {
            d: "M 50.0625 49.59375 C 28.324219 49.59375 10.398438 43.457031 8.832031 35.671875 C 8.757812 36.042969 8.832031 56.046875 8.832031 56.046875 C 8.832031 64.351562 27.292969 71.078125 50.0625 71.078125 C 72.835938 71.078125 91.296875 64.351562 91.296875 56.046875 C 91.296875 56.046875 91.34375 36.042969 91.269531 35.671875 C 89.699219 43.457031 71.804688 49.59375 50.0625 49.59375 Z M 50.0625 49.59375",
          }, {
            d: "M 91.257812 64.699219 C 89.691406 72.480469 71.804688 78.621094 50.0625 78.621094 C 28.324219 78.621094 10.394531 72.476562 8.828125 64.699219 L 8.832031 85.074219 C 8.832031 93.378906 27.292969 100.105469 50.0625 100.105469 C 72.835938 100.105469 91.296875 93.378906 91.296875 85.074219 Z M 91.257812 64.699219",
          }],
        }, {
          id: 'menu1-3',
          text: 'Cloud',
          paths: [{
            d: "M 87.394531 43.238281 C 86.339844 30.40625 75.605469 20.3125 62.5 20.3125 C 53.117188 20.3125 44.949219 25.492188 40.671875 33.136719 C 39.648438 32.925781 38.585938 32.8125 37.5 32.8125 C 30.90625 32.8125 25.292969 36.910156 23 42.6875 C 21.632812 42.371094 20.214844 42.1875 18.75 42.1875 C 8.394531 42.1875 0 50.582031 0 60.9375 C 0 71.292969 8.394531 79.6875 18.75 79.6875 L 81.25 79.6875 C 91.605469 79.6875 100 71.292969 100 60.9375 C 100 52.738281 94.726562 45.785156 87.394531 43.238281 Z M 75 48.4375 C 73.273438 48.4375 71.875 47.039062 71.875 45.3125 C 71.875 40.144531 67.667969 35.9375 62.5 35.9375 C 60.773438 35.9375 59.375 34.539062 59.375 32.8125 C 59.375 31.085938 60.773438 29.6875 62.5 29.6875 C 71.113281 29.6875 78.125 36.699219 78.125 45.3125 C 78.125 47.039062 76.726562 48.4375 75 48.4375 Z M 75 48.4375",
          }],
        }, {
          id: 'menu1-3.1',
          text: 'Cloud Function',
          paths: [{
            d: "M 80.335938 43.796875 C 78.542969 28.632812 65.644531 16.871094 50 16.871094 C 34.355469 16.871094 21.457031 28.636719 19.664062 43.796875 C 8.804688 43.796875 0 52.601562 0 63.464844 C 0 74.324219 8.804688 83.128906 19.664062 83.128906 L 80.335938 83.128906 C 91.195312 83.128906 100 74.324219 100 63.464844 C 100 52.601562 91.195312 43.796875 80.335938 43.796875 Z M 47.273438 63.5 L 42.410156 68.363281 L 27.367188 53.320312 L 42.410156 38.277344 L 47.273438 43.140625 L 37.09375 53.320312 Z M 57.589844 68.363281 L 52.726562 63.5 L 62.90625 53.320312 L 52.726562 43.140625 L 57.589844 38.277344 L 72.632812 53.320312 Z M 57.589844 68.363281",
          }],
        }, {
          id: 'menu1-4',
          text: 'Cloud Storage',
          paths: [{
            d: "M 87.386719 41.382812 C 86.082031 27.609375 74.484375 16.835938 60.367188 16.835938 C 48.597656 16.835938 38.578125 24.328125 34.8125 34.800781 C 32.878906 33.871094 30.71875 33.335938 28.425781 33.335938 C 20.855469 33.335938 14.621094 39.027344 13.746094 46.367188 C 5.820312 48.550781 0 55.804688 0 64.425781 C 0 74.773438 8.390625 83.167969 18.738281 83.167969 L 40.097656 83.167969 L 40.097656 67.296875 L 30.652344 67.296875 C 29.109375 67.296875 27.722656 66.320312 27.140625 64.828125 C 26.5625 63.339844 26.910156 61.632812 28.015625 60.515625 L 48.871094 39.46875 C 50.339844 37.988281 52.671875 37.988281 54.140625 39.46875 L 74.765625 60.28125 C 75.625 61.003906 76.171875 62.109375 76.171875 63.347656 C 76.171875 65.527344 74.476562 67.296875 72.386719 67.296875 C 72.378906 67.296875 72.371094 67.296875 72.363281 67.296875 L 62.195312 67.296875 L 62.195312 83.164062 L 73.675781 83.164062 C 74.382812 83.164062 75.082031 83.121094 75.773438 83.042969 C 76.527344 83.121094 77.296875 83.164062 78.070312 83.164062 C 90.183594 83.164062 100 73.34375 100 61.234375 C 100 52.457031 94.839844 44.886719 87.386719 41.382812 Z M 87.386719 41.382812",
          }],
        }
      ]
    },
    {
      id: 'menu1-2',
      icon: (<span>&#128421;</span>), // &#128270;
      actions: [
        {
          id: 'a2',
          text: 'Love',
          icon: (<Storage />),
          paths: [{
            d: "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z",
            fill: "red",
            stroke: "black",
          }]
        }
      ]
    }
  ];
  
  return (<React.StrictMode><Canvas elements={elements} menus={menus} /></React.StrictMode>);
}
