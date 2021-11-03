import React, { useEffect, useState } from "react";
import Canvas from "./canvas";
import { Menu as MenuDefinition } from "./menu-definitions";
import ErrorBoundary from "./error-boundary";
import awsMenuDefs from "./menu-definitions/aws";
import companiesMenuDefs from "./menu-definitions/companies";
import gcpMenuDefs from "./menu-definitions/gcp";
import generalMenuDefs from "./menu-definitions/general";
import runtimesMenuDefs from "./menu-definitions/runtimes";

export default function Root(props) {
  const defaultMenus: MenuDefinition[] = [
    ...generalMenuDefs,
    ...runtimesMenuDefs,
    ...awsMenuDefs,
    ...gcpMenuDefs,
    ...companiesMenuDefs,
  ];
  const [menus, setMenus] = useState<MenuDefinition[]>([...defaultMenus]);

  console.log(props);
  
  return (
    <ErrorBoundary>
      <React.StrictMode>
        <Canvas elements={[]} menus={menus} />
      </React.StrictMode>
    </ErrorBoundary>
  );
}
