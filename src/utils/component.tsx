import { XYPosition } from "react-flow-renderer";
import uuid from "react-native-uuid";
import { MenuAction } from "../menu-definitions";
import { MenuActionLargeIcon } from "./menu-action";

export type CreateComponentOptions = {
    position?: XYPosition;
    useBlackIcons?: boolean;
};

export const createComponentFromMenuAction = (action: MenuAction, options?: CreateComponentOptions) => ({
    id: uuid.v4().toString(),
    type: "component",
    position: options?.position || { x: 10, y: 50 },
    data: {
        text: action.text,
        content: (<MenuActionLargeIcon action={action} useBlackIcons={options?.useBlackIcons} />)
    },
})
