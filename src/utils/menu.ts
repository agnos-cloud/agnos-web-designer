import uuid from "react-native-uuid";
import { Menu as MenuDefinition } from "../menu-definitions";

export const mergeMenus = (defaultMenus: MenuDefinition[], installedMenus: MenuDefinition[]) => {
    const combinedMenus: MenuDefinition[] = [];

    defaultMenus.forEach((menu) => {
        const newMenu: MenuDefinition = {
            ...menu,
            actions: [...(menu.actions || [])],
        };

        const matchingMenus = installedMenus.filter((m) => m.actions?.length && m.text === menu.text);
        if (matchingMenus.length) {
            newMenu.actions.push({
                id: uuid.v4().toString(),
                isDivider: true,
            });
        }
        matchingMenus.forEach((m) => {
            newMenu.actions.push(...m.actions.map((a) => ({
                ...a,
                id: uuid.v4().toString(),
            })));
        });

        combinedMenus.push(newMenu);
    });

    const allNonMatchingMenus = installedMenus.filter((m) => m.actions?.length && !defaultMenus.map((d) => d.text).includes(m.text));
    const uniqueNonMatchingMenus: MenuDefinition[] = [];
    allNonMatchingMenus.forEach((menu) => {
        const matchingMenu = uniqueNonMatchingMenus.find((m) => m.text === menu.text);
        if (matchingMenu) {
            matchingMenu.actions.push(...menu.actions.map((a) => ({
                ...a,
                id: uuid.v4().toString(),
            })));
        } else {
            uniqueNonMatchingMenus.push({
                ...menu,
                id: uuid.v4().toString(),
                actions: menu.actions.map((a) => ({
                    ...a,
                    id: uuid.v4().toString(),
                })),
            });
        }
    });
    combinedMenus.push(...uniqueNonMatchingMenus);

    return combinedMenus;
}
