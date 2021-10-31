import React from "react";
import { MenuAction } from "../menu-definitions";

export type MenuActionIconPropType = {
    action: MenuAction,
    useBlackIcons?: boolean;
}

export const MenuActionLargeIcon = (prop: MenuActionIconPropType) => {
    const { action, useBlackIcons } = prop;

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
                            fill={path.fill && !useBlackIcons ? path.fill : ""}
                            stroke={path.stroke && !useBlackIcons ? path.stroke : ""}
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
