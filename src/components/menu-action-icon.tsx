import React from "react";
import { MenuAction } from "../menu-definitions";

export type MenuActionIconProps = {
    action: MenuAction,
}

const MenuActionIcon = (props: MenuActionIconProps) => {
    const { action } = props;

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

export default MenuActionIcon;
