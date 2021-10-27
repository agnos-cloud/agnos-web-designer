import { FlowElement } from "react-flow-renderer";

export type Menu = {
    id: string;
    icon: JSX.Element;
    actions?: MenuAction[]
};

export type MenuAction = {
    id: string;
    text?: string;
    icon?: JSX.Element;
    image?: string;
    paths?: MenuActionPath[];
};

export type MenuActionPath = {
    d: string;
    fill?: string;
    stroke?: string;
    style?: string;
    transform?: string;
}
