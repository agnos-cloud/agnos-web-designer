import React from "react";
import uuid from "react-native-uuid";
import { MenuAction } from "../menu-definitions";

export type MenuActionIconPropType = {
    action: MenuAction,
    useGrayscaleIcons?: boolean;
}

export const MenuActionLargeIcon = (prop: MenuActionIconPropType) => {
    const { action, useGrayscaleIcons } = prop;

    if (action.image) {
        const imgId = `img-${action.id}-${uuid.v4().toString()}`;
        if (useGrayscaleIcons) {
            // allow little time for the img tag to be added to the DOM
            setTimeout(() => grayscaleImage(imgId), 500);
        }
        return (<img id={imgId} src={action.image.src} width="98" height="98" style={{ pointerEvents: "none" }} />);
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
        return (<img src={action.image.src} width="18" />);
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

const grayscaleImage = (imgId: string) => {
    const img = document.getElementById(imgId) as HTMLImageElement;

    if (img) {
        img.crossOrigin = "Anonymous";

        var image = new Image();
        image.onload = function()
        {
            const canvas = document.createElement("canvas");
            canvas.height = img.height;
            canvas.width = img.width;
            canvas.style.imageRendering = "crisp-edges";
            const ctx = canvas.getContext("2d");
            try {
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imgData = ctx.getImageData(0, 0, img.width, img.height);
                for (let i = 0; i < imgData.data.length; i += 4) {
                    let greyscale = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
                    imgData.data[i] = greyscale;
                    imgData.data[i + 1] = greyscale;
                    imgData.data[i + 2] = greyscale;
                    imgData.data[i + 3] = 255;
                }
                ctx.putImageData(imgData, 0, 0);
                const dataURL = canvas.toDataURL();
                img.src = dataURL;
            } catch (e) {
                ctx.scale(0.98, 0.98);

                ctx.save();
                ctx.fillStyle = "rgb(84.313725%,35.294118%,29.019608%)";
                ctx.fill(new Path2D("M 100 50 C 100 77.613281 77.613281 100 50 100 C 22.386719 100 0 77.613281 0 50 C 0 22.386719 22.386719 0 50 0 C 77.613281 0 100 22.386719 100 50 Z M 100 50"));
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = "rgb(100%,100%,100%)";
                ctx.transform(2,0,0,2,0,0);
                ctx.stroke(new Path2D("M 16 34 L 34 16"));
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = "rgb(100%,100%,100%)";
                ctx.transform(2,0,0,2,0,0);
                ctx.stroke(new Path2D("M 16 16 L 34 34"));
                ctx.restore();

                ctx.font = "10px serif";
                ctx.fillText("Error loading image", 10, 90);

                const imgData = ctx.getImageData(0, 0, img.width, img.height);
                ctx.putImageData(imgData, 0, 0);
                const dataURL = canvas.toDataURL();
                img.src = dataURL;
            }
        };
        image.src = img.src;
    }
}
  