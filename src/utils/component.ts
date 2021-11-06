import { XYPosition } from "react-flow-renderer";
import uuid from "react-native-uuid";
import { MenuAction } from "../menu-definitions";

export type CreateComponentOptions = {
    id?: string;
    position?: XYPosition;
    useGrayscaleIcons?: boolean;
};

export const createComponentFromMenuAction = (action: MenuAction, options?: CreateComponentOptions) => ({
    id: options?.id || uuid.v4().toString(),
    type: "component",
    position: options?.position || { x: 10, y: 50 },
    data: {
        action,
        useGrayscaleIcons: options?.useGrayscaleIcons,
    },
})