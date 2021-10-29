import React, { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";

const ComponentNode = ({ id, data, selected, sourcePosition, targetPosition }) => {
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
        <div style={{
            // background: "#eee", 
            //padding: "10px", 
            width: "100px", 
            height: "100px",
            border: "1px",
            borderRadius: "5px" }}>
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
                    {data.label}
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
                {data.alt && <div style={{ fontSize: "10px", textAlign: "center" }}>
                    <div>{data.alt}</div>
                </div>}
        </div>
    );
};

export default ComponentNode;
