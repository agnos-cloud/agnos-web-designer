import React, { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";

const ComponentNode = ({ id, data }) => {
    useEffect(() => {
        const handleClick = (e) => {
            const components = document.getElementsByClassName("component");
            for (let i = 0; i < components.length; i++) {
                const component = components.item(i);
                if (e.target.id === component.id) {
                    component.setAttribute("style", "border: 1px solid blue; border-radius: 5px;");
                } else {
                    components.item(i).setAttribute("style", "border: 0px;");
                }
            }
        };
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    function handleMouseEnter(e) {
        if (id) {
            const component = document.getElementById(`component-${id}`);
            if (component) {
                const style = component.getAttribute("style");
                component.setAttribute("style", `${style}; box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);`);
            }
        }
        // e.target.parentElement.style.boxShadow = "1px 1px 2px 1px rgba(0, 0, 0, 0.2)";
    }
    function handleMouseLeave(e) {
        if (id) {
            const component = document.getElementById(`component-${id}`);
            if (component) {
                const style = component.getAttribute("style");
                component.setAttribute("style", `${style}; box-shadow: none;`);
            }
        }
        // e.target.parentElement.style.boxShadow = "none";
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
                    position={Position.Left}
                    id={`${id}.left`}
                    style={{ padding: "2px", 
                            width: "2px", 
                            height: "2px",
                            borderRadius: "5px"  }}
                />
                <div className="component" onMouseEnter={handleMouseEnter} onMouseMove={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseOut={handleMouseLeave} id={`component-${id}`}>
                    {data.label}
                </div>
                <Handle
                    type="source"
                    position={Position.Right}
                    id={`${id}.right`}
                    style={{ padding: "2px", 
                            width: "2px", 
                            height: "2px",
                            borderRadius: "5px"  }}
                />
                {data.alt && <div style={{ background: "#FFF", fontSize: "10px", textAlign: "center" }}>
                    <div>{data.alt}</div>
                </div>}
        </div>
    );
};

export default ComponentNode;
