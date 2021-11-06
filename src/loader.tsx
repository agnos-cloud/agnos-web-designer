import React, { useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { withRouter, RouteComponentProps } from "react-router";
import Canvas from "./canvas";
import { Menu as MenuDefinition } from "./menu-definitions";
import awsMenuDefs from "./menu-definitions/aws";
import companiesMenuDefs from "./menu-definitions/companies";
import gcpMenuDefs from "./menu-definitions/gcp";
import generalMenuDefs from "./menu-definitions/general";
import runtimesMenuDefs from "./menu-definitions/runtimes";

export interface LoaderProps extends RouteComponentProps {}

const Loader = (props: LoaderProps) => {
    const menus: MenuDefinition[] = [
        ...generalMenuDefs,
        ...runtimesMenuDefs,
        ...awsMenuDefs,
        ...gcpMenuDefs,
        ...companiesMenuDefs,
    ];

    return (
        <ReactFlowProvider>
            <Canvas elements={[]} menus={menus} designId={props.match.params["id"]} />
        </ReactFlowProvider>
    );
}

export default withRouter(Loader);

  