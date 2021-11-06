import React, { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import uuid from "react-native-uuid";
import { MenuAction } from "../../menu-definitions";
import { grayscale, grayscaleImage } from "../../utils/image";

const ComponentNode = ({ id, data, selected, sourcePosition, targetPosition }) => {
    const action: MenuAction = data.action;
    const useGrayscaleIcons: boolean = data.useGrayscaleIcons;
    
    function handleMouseEnter(e) {
        if (id) {
            const component = document.getElementById(`component-${id}`);
            if (component) {
                const style = component.getAttribute("style");
                component.setAttribute("style", `${style}; box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);`);
            }
        }
    }
    function handleMouseLeave(e) {
        if (id) {
            const component = document.getElementById(`component-${id}`);
            if (component) {
                const style = component.getAttribute("style");
                component.setAttribute("style", `${style}; box-shadow: none;`);
            }
        }
    }
    return (
        <div
            onClick={() => {
                window.dispatchEvent(new Event("nodeclick"));
            }}
            style={{
                // background: "#eee", 
                //padding: "10px", 
                width: "100px", 
                height: "100px",
                border: "1px",
                borderRadius: "5px"
            }}
        >
                <Handle
                    type="target"
                    position={targetPosition === "top" ? Position.Top : Position.Left}
                    id={`${id}.left`}
                    style={{ padding: "2px", 
                            width: "2px", 
                            height: "2px",
                            borderRadius: "5px"  }}
                />
                <div
                    id={`component-${id}`}
                    className="component"
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseOut={handleMouseLeave}
                    style={{
                        border: selected ? "1px solid blue" : "0px",
                        borderRadius: "5px",
                    }}
                >
                    {getContent(action, useGrayscaleIcons)}
                </div>
                <Handle
                    type="source"
                    position={sourcePosition === "bottom" ? Position.Bottom : Position.Right}
                    id={`${id}.right`}
                    style={{ padding: "2px", 
                            width: "2px", 
                            height: "2px",
                            borderRadius: "5px"  }}
                />
                {action && action.text && <div style={{ fontSize: "10px", textAlign: "center" }}>
                    <div>{action.text}</div>
                </div>}
        </div>
    );
};

const getContent = (action: MenuAction, useGrayscaleIcons: boolean) => {
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

export default ComponentNode;
