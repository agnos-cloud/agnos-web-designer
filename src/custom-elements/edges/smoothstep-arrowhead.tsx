import React, { useState } from "react";
import { getSmoothStepPath, getMarkerEnd, getEdgeCenter } from "react-flow-renderer";

const foreignObjectSize = 40;

export default function SmoothStepArrowHead({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    arrowHeadType,
    markerEndId,
}){
    const [showX, setShowX] = useState(false);
    const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} strokeWidth={1.5} />
            {data && data.text && <text>
                <textPath
                    href={`#${id}`}
                    startOffset={data.onCancel ? "0%" : "50%"}
                    textAnchor={data.onCancel ? "start" : "middle"}
                    style={{ fontSize: '12px' }}
                >
                    {data.text}
                </textPath>
            </text>}
            {data && data.onCancel && <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - (foreignObjectSize / 2)}
                y={edgeCenterY - (foreignObjectSize / 2)}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                    <button
                        className="edgebutton"
                        style={{
                            borderRadius: 10
                        }}
                        onClick={(event) => data.onCancel(event)}
                    >x</button>
                </body>
            </foreignObject>}
        </>
    );
}
