import React from "react";
import { MenuAction } from "../menu-definitions";

export type MenuActionIconPropType = {
    action: MenuAction,
    useGrayscaleIcons?: boolean;
}

export const MenuActionLargeIcon = (prop: MenuActionIconPropType) => {
    const { action, useGrayscaleIcons } = prop;

    if (action.image) {
        return (<img src={action.image} width="98" height="98" style={{ pointerEvents: "none" }} />);
    }
    if (action.paths && action.paths.length) {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 98 98" style={{ pointerEvents: "none" }}>
                <g transform="scale(0.98)">
                    {action.paths.map((path, index) => (
                        <path
                            key={index}
                            d={path.d}
                            fill={!path.fill ? "" : useGrayscaleIcons ? grayscale(path.fill) : path.fill}
                            stroke={!path.stroke ? "" : useGrayscaleIcons ? grayscale(path.stroke) : path.stroke}
                            transform={path.transform}
                            // style={CssString(path.style || "")}
                        />
                    ))}
                </g>
            </svg>
        );
    }

    return <></>;
}

export const MenuActionSmallIcon = (prop: MenuActionIconPropType) => {
    const { action } = prop;

    if (action.image) {
        return (<img src={action.image} width="18" />);
    }
    if (action.paths && action.paths.length) {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <g transform="scale(0.18)">
                    {action.paths.map((path, index) => (
                        <path
                            key={index}
                            d={path.d}
                            fill={path.fill}
                            stroke={path.stroke}
                            transform={path.transform}
                            // style={CssString(path.style || "")}
                        />
                    ))}
                </g>
            </svg>
        );
    }

    return <></>;
}

const grayscale = (color: string) => {
    if (!color) return "";

    color = color.toLowerCase();
    let r: number, g: number, b: number;

    if (color.startsWith("#")) {
        const rgba = hexToRgba(color);

        if (!rgba) return "";

        [r, g, b] = rgba;
    } else if (color.startsWith("rgb")) {
        [r, g, b] = color
            // get r, g, b
            .substring(4, color.length - 1)
            .split(",")
            .map((c) => c.trim())
            // convert r, g, b from % to 0-255 scale
            .map((c) => c.endsWith("%") ? (parseFloat(c.substring(0, c.length - 1)) / 100) * 255 : parseInt(c, 10));
    }

    // convert to gray scale
    r = g = b = (r + g + b) / 3;

    return `rgb(${r}, ${g}, ${b})`;
}

const hexToRgba = (hex) => {
    let a = 0;
    if (hex.length === 4) {
        hex = `${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    } else if (hex.length === 5) {
        a = parseInt(`${hex[4]}${hex[4]}`, 16);
        hex = `${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    } else if (hex.length === 9) {
        a = parseInt(`${hex[7]}${hex[8]}`, 16);
        hex = `${hex[1]}${hex[2]}${hex[3]}${hex[4]}${hex[5]}${hex[6]}`;
    }
    console.log(hex)
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
      a
    ] : null;
  }
  