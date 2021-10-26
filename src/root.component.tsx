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
    {
      id: '4',
      type: 'component',
      position: { x: 250, y: 200 },
      data: {
        label: (
          <>
            <img src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png" width="98" style={{pointerEvents: "none"}} />
          </>
        ),
      },
    },
    {
      id: '5',
      type: 'component',
      data: {
        label: (
          <>
            <svg version="1.1"
                width="98" height="98"
                xmlns="http://www.w3.org/2000/svg"
                style={{pointerEvents: "none"}}
            >
                <path fill="red" stroke="black" d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />
            </svg>
          </>
        ),
      },
      position: { x: 250, y: 325 },
    },
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
      icon: (<span>&#129520;</span>),
      actions: [
        {
          id: 'menu1-0',
          text: 'User',
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAADkCAMAAAArb9FNAAAAflBMVEX39/cAAAD////8/Pz19fXY2NiRkZHNzc3y8vK4uLh8fHzl5eXBwcGrq6uNjY2ioqKysrLh4eEzMzOHh4cTExPs7OxqampwcHDR0dFHR0cuLi6Pj49ubm4iIiIoKCioqKheXl46OjoaGhpXV1dPT0+bm5tCQkIODg5aWlo4ODguwKv7AAAH90lEQVR4nO2d53qjOhCGYcZ0cIm713GLiXfv/wYPmDguCJui0Qgf3j+n5dnDF0kjaZoMo6Ojo6Ojo6OjFJgCAOlfuL9FLokq1wqj2B6P+/HAcwIjUcn9UVJAwNHQ/zDvWY69oPUKEdzQP5hiVn3HaLFARGdeoOyHw9hqqT7oDVbPtZ359lpoZcC1S0g7MxkY7dKHRlxW25lBm8YPvEklcaa5CYH7o0sC06+K2lJ201bog2ENbSlD/eWhMaspzjRnPc1XHwZldoEiPkdaDx84DbSl6GxcwGsoLtkbtJUHUWNxpvlHU3lSxJnmWEt5EqZlhq2hPGxqUK5E2snDQJo403S02/c2EtWZU24190D9E4qIpVaDJ8lcXok1WnpSF12Gpc/owVG6ur026lD2vEzRZm66BOJMM+CWlQE+ibqZHoMn36RkLHRYerAmUrfUYfCohk6LAxm8cKY34Mg/eDQGM4N9S4dqTudqzLkHD6t6nSvhMouTd2cVEfFOTUKbksK8KfRIxTEfxzAkVjfknJpER8wrrIdN/CRWN+EcuxGxONMc8YlDWQ7aYjy+wYPSkf/aMDqmoU4IuRo7PnUo1UUrZMU3MynvBxfYxCkwmYynFeIjdAbbHU/BhsDofsC6mSlVCNnUbRWoY9vOcaBAHdstASl9KhfYrudvrk7FuuObmRSRrUf4rIqK/Y5vR6D2qqTw7eYLBer4vO104Z8rfKkr1N7MFDZxBjZJpC3HB6NfZUeujtHzAH1ydX1Gvwr9FYjR1Y4WuTrOxAd6txFnfBKWxOK+OaMk8IdYHWsKOPlJkzGMYNAvPN5UOOKF98EbNyd2HDHu5Wdone3caX5AGgZiz6SiDFD63JlUpFOTP4UR9mTiJuxDR+nU5LaYKXQbug5Z7WSJcBqk1hJe8tj8tHcQ1MmkbHQYOrKLAnPm6S8km8KEW9UFksHTp/AcvqWLO3BrukKQuKLLqkuRng7HmB6WB2WfpfXY6y7AWKo4xuiBELnBLh1OmLdI3RW0qXn9RWI9/V47cTJvQiOtTEqGtLmpzynlFkl286+W4iQ5pg/MNXfFTCWoY68GLURCeo6n6bxMadzbSL+d7hZoFjXhdz4/p1GShyatHZ7QYF/YaWtQrtSWp9vFQEzNsBB76XxJavVw0iFoUI4ajSZb0Pj0FwweW5c/Z2LpLQ4f/7FKrXaupatWxhPBXTz+8qH8hSg3KyGcatPgHM7t2HNnKHTLhb7yrZTTPWWmRYd6hCDO0h7ypyhwXq8+QRvsnwYEE+4O9QiGd/XT5s9RiNGL9iuCFuY30c79gG+GIlj3puNL8DNGVJzQ8jkw8qYS771PuxAZzGliSLa52Mi3m/9NIzq+cADXjqD1PPZyoc6DHSgewNywXb5EtG8hoDUc71annx86rb78yELRJxc00545CvWBMdwXzbaCu3X6mgwYPTfBgPPLMsI/uHAXWUWCSUxAYiSfJtT6tZ86wOd3wz/0FiaZkq98zpuapyoICifED/MRqT6EsIxTr19j+LCUz+Lvgkwf4rBk3c9nWPUjYFEyOL2kMTBgDIoe9hGwq/QWAEwr5Ct9V/7VldAWn17/j2/xg7L6YFrRV7GX+8gOGoOK2s76yhiBxATX8MP8kzd+yWmxhraUmSPcs2+kYVizyG0vRx+C16Ct1sFODyXC70j+/WJc89eWIsO+wGJf/wMyZoPzk3DZ03c/r+CBMfIaZz5+NfRXQCArXvzxNR/H22FCNLD9XTW3SyHzBo8IIdJ31GrKn7o+GAip+9jJYOLVWX7oUnVKls2x+itC0l4ZUUFcbXfHHm1PU9nsqwwfWG1YcXeUj0hLf6lCBWVrSCXn66miXGxT8gMq6ijzVEtrxSUns5eTs6XTMuPV2lPSzIeOFwV7PdK26+R8Pp+XKnrXUfI8+7HdQ2eap2errk2HSzFP+rEo6CFMzZOmHio6aFFTmN+ppB8mNYVZPeS9YFRwKBq7d5iYhb0hlLTDpKdgar6BxUz5FKtT0ZdcBUKr+QZbeUYsUkf8+I06hM/sAPdXSUNQjaKkkakaBG26lDR/VoMgw5qoWwMHJ8HC4/4mieSe2VHykoMqcqX4LQjVlSe38BS0oFVHrkEeVki10Z/eg7p3OWRmPJgVBR1oVfJwx3srk5nzSb+Zusf7+Xt4HS48bue077aq5nE3J39BUiW5uo+3Mpr5QNdbODMzBB1M3mjwRB7Nt1l5BSX59O8sqmAl1Ca/bRYPQUEg4S0OLMUdTCrUqurKs/7ZNQrFteL0vOETjtp8ixVVN97LM9rrgiiT5gdtDePlq5+F8kZtdNzOX83K39kJKp46lcqHUyF1GN12pfptKxZ1QdCecJ7dq15R0hZ9fbdmnW3Vsj/1TOIa4/arr7elf+KuPt9ewzYJCAtdJ6gvo4cHQm+o3wb45Unrv4IQbHUSuNxKbmyRCIz0OIEeZUu7CHRDn9c7cVoPCbs9IMBoO2NyWx/jxfMSaDkKcRStFY/h0XZ6BbXPFAphGtrHBvXU5dmst5YBqvsbYTKIQWjvCEv1VuuBMy1qNaNGIriWZ88klVhf2Mxiz3IZhd1KTDQagTOM/WNDi3Naru3oXHyPGgi7JesC0AusMLLHs+O/8qtys9z59sBzRi7oJ+uBS7MDNKYjywm9aBvb47Hv+/PZmfU8+ftxPx5EQ89ZWEHv/OOouSoRN50dHvn5T9xf2NHR0dHR0dHR0dHxP+I/5GCV1ORSJDUAAAAASUVORK5CYII=",
        }, {
          id: 'menu1-1',
          text: 'Server',
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAAAeHh709PSenp6lpaVra2t0dHTIyMjPz8/o6Og+Pj7i4uJLS0u0tLRubm67u7vCwsKOjo59fX2GhoZRUVHx8fHY2NhjY2OUlJSsrKzW1tZbW1s4ODgpKSlOTk4NDQ0VFRUlJSUxMTFFRUUbGxvMXE7eAAAI+UlEQVR4nO1d2WKrIBCNNYvZF7OYNEmz3f//xduEQdmSdBTqYDlPrQpyOAgDM5BWKyAgICAgICAgICAgICAgICAggCLiSTq+fNSFyzidxE75jbpR/eiO3BFM6yYHSB3xi691M8txddJU41PdvAScXFCko+AdB/sEF3VzUrCwTXCQZ91LBnFdGCS9vBwDywynkO/FdsZYDC5QkqnlfCHbD7vZlsKHExG5hA4H2x9j5ELEgZuWURJdByJOnTSMsnBQ37QkdCGiLGGcDl1CGOhmK+Xekpky1mtczjD+8aBcElf+3q3hJqNoW0RZQvfGza71vCoXhjqvDCW7lXOGMDnqm+6t2D27Iiod6dT0YqvYsheNTPemxlqvBp5ZF/7fOGe4hjeNDfc2cM+miNpYOHfL7/yZv3qv3Zyr9W5BRFNWA5cQXx4/v2dPRFrmTAFrIqpfIR3YEpGqhNZEpGaRirAjIl0JLdU+ZQntiEhZQiv1T1tCGyLSltCCAtQlrC4idQkra0Bfwqoi0pewogo+SFhNBh8krKSDHxJW+RL9kLCCEr5IWF5EXyQsrQXdqb2OciIuvZGwUGOJSuWRhIWImDR9jyQsRPx8/2iONkuyclYouwBXShuRBHTfOSuTXezw39SQJdm8f5IEwJUyRCSBgA63oZz2AJ5GTCgMMJz2/MC0NEPPEBgGhvQRGP5JhvPED8xLM2z+iB8YUkFgaEBgSAwNYbjpLJfbmbFIjWDY4buu9obtAg1gmG8juUPfD2SRoU65zCNoKAGfe+0Nthj2z+qy6zKK/vXFC6ODuiB0X7abiBfWqyj6WrcQWEcK1B2WthiymuwJV9g2K+HDYK+6CY+wdcm5cOX8uIIojCGSti8/YIthV70IGQsuEYiuF9bo2AVht+CMXZFkfY083nvfO0ZafkJBKjOEqiwkg0Dsr+IR2CgsSAZFKi502IV89Xa0XRiR5CkyliK7/51EWh3+AkNhZRzPcKe1QI6unMWY/bNRKog8Q60TETBjj4BXgjsl9oWgXjCcvGAIfdqnnENbVNQDhrMXDNNGMOT3TYAhAVop73luj/9klzZphsatP9ITkMWR/QOid36VYbXRojWbGFE4Z2H79mFUpFZct7YYpmphofiCDdVRK6HFpgTCZ5NolfAO+f6n04H/pbhubTFcK5XPTRjRxnxcEA1T1qrEAfrxIaGORND3kikzKGuW92AfHWVra3eMMnkbTy86y6PxfBiNZQtkiQ2baJ0Vgh3lvv/zw7V86Ig2QfSfobyLTTfam8Cw1edbVxeGQjWC4TeNZLebmc90KMHwaOyyyALGkyMiyf5Zi6cJsN+19ZsXgLk6JkClTkD4zxaRhFuLfojIp2D9948WiMokqgm58Y5K1eapMMrXg/xsCUzgXkuct3XbHbpoC4cAImvm+byNKtAflOlgEcoo8Tn5RbFMf9F4hu33uZICsif9Cz1NMefMtm262GZ5OU84gnkbtX4Ao3XkpzqpaxuvUVb6OsD9UaV2lDTX8oaRwsExqE4A66iYEaP5M+Dmr2JQXIlq9SeTubWVKHoM+3zF1PSxNYFhMbDn3m8B/jOMz5J9pslozzPTPR3k7nVyOHVlz0x6Pso2cDKO9rJnZvHxgbSU1K0DrjwzuneN2Xaid+1R2WLYFAujFyk+HK2odcpepELZ21qrh5S1L8FNXMFDGvGQKHXkI+7lns+MWKuZXu8Ngc8I3Hi5nUQqfGotkEOJVLiwf8B8+d1Ihd+NNmEr+P5EmzQ/Yqj5UV8/iNyDt/ABh1k3/kTu5SFAOjI5C3gLRF/KZg3t0WKzWBpR5AE26SNKhy8+uImg1aKgoYm5joLO12G6KQ+KuspPuItkn6p8GGfRJGMdgzgdOCmivsdNa8GOItkflSlvBLi3ykS8MLqovcBdVul8jfV3gYfVdiP0lAcszp70gmlX9BmX/gh2VvZrO0rqw+gsENSD4hrAUFiEXxkOXGkEw++Bop2mi4nxAy7BELaK+XGIUm6cXxBJIEwOMU2tFTDGYg59Wj7ptIhi/6wLeg7+8weY07PqAzflUE2O91yokbkm5AYBKhU/c8+DTzH/uQ1c8HjxKzbXdtKni6Rd/Cwjcmx7vmuOKtCHy1H41VgMShzxmL3PlRCy94Q0OP7BHMso0SP6RVCZpv4Eg/d5EgPWiD4USfdduhD20iADR/K16D318y83+e/A6b7hV+B+LHTEXw3gk+Pr+0cLcJcd/ai2O3hkGyY4Bqrl7KxQdnHGNzgY7XHRfvUBBMGM+mDOUu9lODb4DxFWomjNDuPR5smYBzNEv9fa1ltWpr3JPGvCaqIQV3/Vu8wGMPyS7DNNRnsM21kqV+AmzZQuepf1ZMfQYJkpW3dn3S7O/FAI6sHA1hj+UyvwMf+Q1mHH6rg00rqshxdV9R69hL63RSmYLYZgOghX2AXB4zzR+mBmwQsTcOjZEeuUhXMt3yKhVBBpP/53Mx4ZUaSAmr1+V0rMexy5ZKQZroVpmox8SsuUg+EcJuayk5w0Q/k8CAkwvEMj5fYVmxHKzZQyw1drJbDCu5FzYJ+6EP9BnOGPY6LyHptFZvgTE2X8dXFAR3qEp2d9jewVo8yQpzDgKmfBZ3Lnx3/y1Jx2TNRkNTaiGGXBomGGTCb+Y5shrGsVwzmsOAoTz4X2fu3d8OUhvAx8Vaw773f+aTV2hy2Gc1UxCFYS1mKZqifhkVRWLC8NxqjXT/lXYsas2aX3j3woXosPkbI6cq/vszRPvSsvBVJ96q3sDTYqwS/lAXtzizhR1zU2ifpMX7U4R4k6M+9j920qY4oWc9GA+aFkGIy12w1g2FoX7kxD3GYTGH5z7Exvw9XS6GIqz9CzmCgMQ4hZRfvkagJEEd/eP5kDbBPUWkONgK1f6jHfr8C7Zz+aKffmYjZm83AalMOqNvCQGlTHyAMxrvRVHHCCuHCMYt7WSwYxXQySYvslcm/983kbVWD6mQeO7/MkBcxxAwzx+0xJoYT9Ffuk4rGcgenPt4j+BjlGfkTvZVVOKIkn6e2DMm7phNIMKCAgICAgICAgICAgICAgICDgD+M/1U2d6M9S3PwAAAAASUVORK5CYII=",
        }, {
          id: 'menu1-2',
          text: 'Database',
          image: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png",
        }, {
          id: 'menu1-3',
          text: 'Cloud Function',
          image: "https://blogs.sap.com/wp-content/uploads/2018/10/Functions-Logo.png",
        }
      ]
    },
    {
      id: 'menu1-2',
      icon: (<span>&#128270;</span>),
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
