import React from "react";
import { getSmoothStepPath, getMarkerEnd } from "react-flow-renderer";

export default function SmoothStepArrowHead({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    connectionLineType,
    connectionLineStyle,
}){
    const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    return (
        <g>
            <path
                id={id}
                className="react-flow__connection-line"
                fill="none"
                stroke="#222"
                strokeWidth={1.5}
                d={edgePath}
                // markerEnd={markerEnd}
            />
            <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
        </g>
    );
}
