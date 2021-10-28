import React from "react";
import Canvas from "./canvas";
import { Menu } from "./menus";
import ErrorBoundary from "./error-boundary";
import companiesMenus from "./menus/companies";
import generalMenus from "./menus/general";

export default function Root(props) {
  const menus: Menu[] = [
    ...generalMenus,
    ...companiesMenus,
    {
      id: "menu3",
      text: "GCP",
      actions: [
        {
          id: 'menu3-0',
          text: 'Google Cloud',
          paths: [{
            d: "M 50.796875 9.914062 C 32.894531 9.507812 17.007812 21.351562 12.320312 38.640625 C 12.53125 38.558594 12.089844 38.691406 12.320312 38.640625 C -3.828125 49.269531 -4.023438 72.429688 11.292969 84.230469 L 11.308594 84.199219 L 11.277344 84.332031 C 16.179688 88.023438 22.132812 89.996094 28.273438 89.976562 L 49.820312 89.976562 L 49.953125 90.089844 L 71.585938 90.089844 C 99.449219 90.320312 110.648438 54.25 87.570312 38.640625 C 85.585938 31.300781 81.496094 24.710938 75.820312 19.679688 L 75.640625 19.855469 L 75.65625 19.644531 C 68.773438 13.570312 59.964844 10.121094 50.804688 9.910156 Z M 49.300781 27.195312 C 54.476562 27.019531 59.796875 28.726562 63.820312 31.980469 C 68.847656 36.179688 71.710938 42.429688 71.582031 48.976562 L 71.582031 51.140625 C 86.292969 50.847656 86.292969 73.066406 71.582031 72.773438 L 49.949219 72.773438 L 49.917969 72.804688 L 49.917969 72.640625 L 28.273438 72.640625 C 26.742188 72.640625 25.226562 72.316406 23.828125 71.679688 C 16.945312 68.570312 15.300781 59.523438 20.636719 54.167969 C 25.992188 48.832031 35.023438 50.476562 38.148438 57.359375 L 50.699219 44.808594 C 46.535156 39.371094 40.511719 35.648438 33.789062 34.328125 C 33.871094 34.296875 33.953125 34.230469 34.019531 34.246094 C 37.957031 29.917969 43.476562 27.378906 49.320312 27.199219 Z M 49.300781 27.195312"
          }]
        },
        {
          id: 'menu3-01',
          text: 'Google Cloud (Colored)',
          paths: [{
            d: "M 66.503906 31.960938 L 75.195312 23.269531 L 75.777344 19.609375 C 59.9375 5.203125 34.757812 6.835938 20.476562 23.015625 C 16.511719 27.507812 13.566406 33.109375 12 38.894531 L 15.113281 38.457031 L 32.496094 35.589844 L 33.839844 34.21875 C 41.570312 25.722656 54.648438 24.582031 63.578125 31.808594 Z M 66.503906 31.960938",
            fill: "rgb(91.764706%,26.27451%,20.784314%)"
          }, {
            d: "M 87.578125 38.640625 C 85.582031 31.28125 81.480469 24.667969 75.777344 19.609375 L 63.578125 31.808594 C 68.726562 36.015625 71.664062 42.359375 71.535156 49.011719 L 71.535156 51.175781 C 77.535156 51.175781 82.394531 56.035156 82.394531 62.035156 C 82.394531 68.03125 77.535156 72.769531 71.535156 72.769531 L 49.789062 72.769531 L 47.65625 75.085938 L 47.65625 88.109375 L 49.789062 90.15625 L 71.535156 90.15625 C 87.132812 90.277344 99.878906 77.851562 100 62.253906 C 100.074219 52.800781 95.410156 43.9375 87.578125 38.640625",
            fill: "rgb(25.882353%,52.156863%,95.686275%)"
          }, {
            d: "M 28.074219 90.15625 L 49.789062 90.15625 L 49.789062 72.769531 L 28.074219 72.769531 C 26.527344 72.769531 25.027344 72.4375 23.621094 71.792969 L 20.539062 72.738281 L 11.789062 81.429688 L 11.023438 84.390625 C 15.933594 88.097656 21.921875 90.179688 28.074219 90.15625",
            fill: "rgb(20.392157%,65.882353%,32.54902%)"
          }, {
            d: "M 28.074219 33.761719 C 12.476562 33.851562 -0.09375 46.574219 0 62.171875 C 0.0507812 70.882812 4.121094 79.082031 11.023438 84.390625 L 23.621094 71.792969 C 18.15625 69.324219 15.726562 62.894531 18.195312 57.429688 C 20.664062 51.964844 27.097656 49.535156 32.5625 52.003906 C 34.96875 53.089844 36.898438 55.019531 37.988281 57.429688 L 50.582031 44.832031 C 45.222656 37.824219 36.894531 33.726562 28.074219 33.761719",
            fill: "rgb(98.431373%,73.72549%,1.960784%)"
          }]
        },
        {
          id: 'menu3-1',
          text: 'Google Cloud Run',
          paths: [{
            d: "M 29.449219 4.882812 C 26.25 4.9375 23.316406 6.6875 21.746094 9.476562 L 1.191406 45.117188 C -0.398438 47.882812 -0.398438 51.285156 1.191406 54.054688 L 21.738281 89.988281 C 23.292969 92.816406 26.214844 94.621094 29.441406 94.746094 L 70.542969 94.746094 C 73.765625 94.636719 76.695312 92.835938 78.253906 90.011719 L 98.796875 54.28125 C 99.597656 52.875 100 51.308594 100 49.746094 C 100 48.179688 99.597656 46.613281 98.796875 45.210938 L 78.253906 9.476562 C 76.679688 6.6875 73.75 4.941406 70.550781 4.882812 Z M 29.449219 4.882812",
          }, {
            d: "M 92.382812 65.441406 L 78.253906 90.011719 C 76.695312 92.835938 73.765625 94.636719 70.542969 94.746094 L 54.886719 94.746094 L 32.046875 71.703125 L 38.78125 49.988281 L 32.046875 28.027344 L 38.960938 32.675781 L 48.261719 42.058594 L 43.917969 28.027344 L 76.484375 49.90625 Z M 92.382812 65.441406",
          }, {
            d: "M 32.046875 28.027344 L 38.960938 32.675781 L 44.382812 50.105469 L 39.058594 67.007812 L 32.046875 71.703125 L 38.820312 49.90625 Z M 49.761719 35.777344 L 53.117188 46.632812 L 66.003906 46.632812 Z M 76.484375 49.90625 L 43.917969 71.703125 L 50.691406 49.90625 L 43.917969 28.027344 Z M 76.484375 49.90625",
            fill: "rgb(100%,100%,100%)"
          }]
        },
        {
          id: 'menu3-11',
          text: 'Google Cloud Run (Colored)',
          paths: [{
            d: "M 29.449219 4.882812 C 26.25 4.9375 23.316406 6.6875 21.746094 9.476562 L 1.191406 45.117188 C -0.398438 47.882812 -0.398438 51.285156 1.191406 54.054688 L 21.738281 89.988281 C 23.292969 92.816406 26.214844 94.621094 29.441406 94.746094 L 70.542969 94.746094 C 73.765625 94.636719 76.695312 92.835938 78.253906 90.011719 L 98.796875 54.28125 C 99.597656 52.875 100 51.308594 100 49.746094 C 100 48.179688 99.597656 46.613281 98.796875 45.210938 L 78.253906 9.476562 C 76.679688 6.6875 73.75 4.941406 70.550781 4.882812 Z M 29.449219 4.882812",
            fill: "rgb(25.882353%,52.156863%,95.686275%)"
          }, {
            d: "M 92.382812 65.441406 L 78.253906 90.011719 C 76.695312 92.835938 73.765625 94.636719 70.542969 94.746094 L 54.886719 94.746094 L 32.046875 71.703125 L 38.78125 49.988281 L 32.046875 28.027344 L 38.960938 32.675781 L 48.261719 42.058594 L 43.917969 28.027344 L 76.484375 49.90625 Z M 92.382812 65.441406",
            fill: "rgb(15.882353%,42.156863%,85.686275%)"
          }, {
            d: "M 32.046875 28.027344 L 38.960938 32.675781 L 44.382812 50.105469 L 39.058594 67.007812 L 32.046875 71.703125 L 38.820312 49.90625 Z M 49.761719 35.777344 L 53.117188 46.632812 L 66.003906 46.632812 Z M 76.484375 49.90625 L 43.917969 71.703125 L 50.691406 49.90625 L 43.917969 28.027344 Z M 76.484375 49.90625",
            fill: "rgb(100%,100%,100%)"
          }]
        },
        {
          id: 'menu3-12',
          text: 'Google Analytics',
          paths: [{
            d: "M 95.167969 12.492188 L 95.167969 87.488281 C 95.203125 94.351562 89.667969 99.941406 82.804688 99.980469 C 82.292969 99.984375 81.78125 99.957031 81.269531 99.894531 C 74.90625 98.953125 70.242188 93.410156 70.394531 86.980469 L 70.394531 13 C 70.242188 6.558594 74.917969 1.019531 81.292969 0.0820312 C 84.828125 -0.328125 88.367188 0.792969 91.019531 3.164062 C 93.671875 5.539062 95.179688 8.933594 95.164062 12.492188 Z M 17.222656 75.230469 C 12.742188 75.148438 8.566406 77.488281 6.304688 81.355469 C 4.039062 85.222656 4.039062 90.007812 6.304688 93.875 C 8.566406 97.738281 12.742188 100.082031 17.222656 100 C 23.972656 99.875 29.382812 94.367188 29.382812 87.613281 C 29.382812 80.863281 23.972656 75.351562 17.222656 75.230469 Z M 50.019531 37.6875 L 49.8125 37.6875 C 42.9375 38.0625 37.605469 43.828125 37.761719 50.710938 L 37.761719 83.984375 C 37.761719 93.011719 41.738281 98.492188 47.554688 99.664062 C 51.210938 100.402344 55.003906 99.460938 57.886719 97.097656 C 60.773438 94.734375 62.441406 91.195312 62.429688 87.464844 L 62.429688 50.136719 C 62.441406 43.273438 56.886719 37.699219 50.019531 37.6875 Z M 50.019531 37.6875",
          }]
        },
        {
          id: 'menu3-2',
          text: 'Google Drive',
          paths: [{
            d: "M 32.574219 9.453125 L 46.5 33.953125 L 13.652344 90.496094 L 0 65.527344 Z M 20.234375 91.996094 L 85.246094 91.984375 L 100 66.867188 L 34.835938 66.859375 Z M 99.253906 60.5625 L 67.332031 8.085938 L 39.203125 8.003906 L 69.496094 60.613281 Z M 99.253906 60.5625",
          }]
        },
        {
          id: 'menu3-3',
          text: 'Google Drive (Colored)',
          paths: [{
            d: "M 100 65.789062 L 30.351562 65.789062 L 15.789062 93.859375 L 84.210938 93.859375 Z M 100 65.789062",
            fill: "rgb(18.823529%,53.72549%,95.294118%)"
          }, {
            d: "M 33.332031 6.140625 L 0 62.28125 L 15.789062 93.859375 L 47.894531 32.105469 Z M 33.332031 6.140625",
            fill: "rgb(0%,65.490196%,41.568627%)"
          }, {
            d: "M 64.914062 6.140625 L 33.332031 6.140625 L 66.667969 65.789062 L 100 65.789062 Z M 64.914062 6.140625",
            fill: "rgb(99.215686%,83.137255%,27.45098%)"
          }]
        }
      ]
    }
  ];
  
  return (
    <ErrorBoundary>
      <React.StrictMode>
        <Canvas elements={[]} menus={menus} />
      </React.StrictMode>
    </ErrorBoundary>
  );
}
