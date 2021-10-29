import { XYPosition } from "react-flow-renderer";
import uuid from "react-native-uuid";
import { MenuAction } from "../menu-definitions";
import { MenuActionLargeIcon } from "./menu-action";

export const createComponentFromMenuAction = (action: MenuAction, position: XYPosition = { x: 10, y: 50 }) => ({
    id: uuid.v4().toString(),
    type: "component",
    position,
    data: {
        text: action.text,
        content: (<MenuActionLargeIcon action={action} />)
    },
})
