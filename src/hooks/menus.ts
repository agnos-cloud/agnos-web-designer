import { useEffect, useState } from "react";
import { MenuLocalStorage } from "../data/local";
import { Menu as MenuDefinition } from "../menu-definitions";
import { mergeMenus } from "../utils/menu";

const menuLocalStorage = new MenuLocalStorage();

export function useMenus(userId: string, initialMenus: MenuDefinition[]) {
  const [menus, setMenus] = useState<MenuDefinition[]>([]);
  const [installedMenus, setInstalledMenus] = useState<MenuDefinition[]>([]);

  useEffect(() => {
    const restoreInstalledMenus = async () => {
      if (!userId) return;

      const menusContainer = await menuLocalStorage.get(userId);
      if (!menusContainer) return;

      const { menus } = menusContainer;

      if (menus) {
        setInstalledMenus(menus);
      }
    };

    restoreInstalledMenus();
  }, [userId]);

  useEffect(() => {
    const saveInstalledMenus = async () => {
      if (!userId) return;

      menuLocalStorage.save({
        id: userId,
        menus: installedMenus,
      });
    };

    saveInstalledMenus();
  }, [installedMenus]);

  useEffect(() => {
    setMenus(mergeMenus(initialMenus, installedMenus));
  }, [initialMenus, installedMenus]);

  return { menus, setMenus, installedMenus, setInstalledMenus } as const;
}
