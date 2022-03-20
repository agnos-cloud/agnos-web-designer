import React, { useEffect, useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { UsersLocalStorage } from "./data/local";
import Canvas from "./canvas";
import { Menu as MenuDefinition } from "./menu-definitions";
import awsMenuDefs from "./menu-definitions/aws";
import companiesMenuDefs from "./menu-definitions/companies";
import gcpMenuDefs from "./menu-definitions/gcp";
import generalMenuDefs from "./menu-definitions/general";
import runtimesMenuDefs from "./menu-definitions/runtimes";

const usersLocalStorage = new UsersLocalStorage();

export interface LoaderProps extends RouteComponentProps {}

const Loader = (props: LoaderProps) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const restoreCurrentUser = async () => {
            const userContainer = await usersLocalStorage.get("current_user");
            if (!userContainer) return;

            setCurrentUser(userContainer.user);
        };

        restoreCurrentUser();
    }, []);

    const menus: MenuDefinition[] = [
        ...generalMenuDefs,
        ...runtimesMenuDefs,
        ...awsMenuDefs,
        ...gcpMenuDefs,
        ...companiesMenuDefs,
    ];

    return currentUser ? (
        <ReactFlowProvider>
            <Canvas
                elements={[]}
                menus={menus}
                designId={props.match.params["id"]}
                userId="frank123"
            />
        </ReactFlowProvider>
    ) : <Link to={`/?return_url=${encodeURI(props.location.pathname)}`}>You need to login</Link>;
}

export default withRouter(Loader);

  