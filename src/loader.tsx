import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useParams  } from "react-router-dom";
import Canvas from "./canvas";
import { Menu as MenuDefinition } from "./menu-definitions";
import awsMenuDefs from "./menu-definitions/aws";
import companiesMenuDefs from "./menu-definitions/companies";
import gcpMenuDefs from "./menu-definitions/gcp";
import generalMenuDefs from "./menu-definitions/general";
import runtimesMenuDefs from "./menu-definitions/runtimes";

export interface LoaderProps extends RouteComponentProps {}

const Loader = (props: LoaderProps) => {
    const params = useParams();
    console.log(params)
    console.log(props)
    const menus: MenuDefinition[] = [
        ...generalMenuDefs,
        ...runtimesMenuDefs,
        ...awsMenuDefs,
        ...gcpMenuDefs,
        ...companiesMenuDefs,
    ];

    return (
        <Canvas elements={[]} menus={menus} />
    );
}

export default withRouter(Loader);

  