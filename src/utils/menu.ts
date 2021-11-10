import uuid from "react-native-uuid";
import { Menu as MenuDefinition } from "../menu-definitions";

export const mergeMenus = (defaultMenus: MenuDefinition[], installedMenus: MenuDefinition[]) => {
    const combinedMenus: MenuDefinition[] = [];

    defaultMenus?.forEach((menu) => {
        const newMenu: MenuDefinition = {
            ...menu,
            actions: [...(menu.actions || [])],
        };

        let matchingMenus = installedMenus.filter((m) => m.actions?.length && m.text === menu.text);
        if (matchingMenus.length) {
            newMenu.actions.push({
                id: uuid.v4().toString(),
                isDivider: true,
            });
        }

        matchingMenus.forEach((m) => {
            m.actions.forEach((a) => {
                newMenu.actions.push({
                    ...a,
                    id: uuid.v4().toString(),
                });
            });
        });

        combinedMenus.push(newMenu);
    });

    return combinedMenus;
}
