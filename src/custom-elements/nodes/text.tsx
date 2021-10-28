import React from "react";

const TextNode = ({ id, data }) => {
    return (
        <div style={{ background: "#FFF", padding: "14px" }}>
            <div id={`text-${id}`}>{data.label}</div>
        </div>
    );
};

export default TextNode;
