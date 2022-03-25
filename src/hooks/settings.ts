import { useEffect, useState } from "react";
import { SettingsLocalStorage } from "../data/local";

const settingsLocalStorage = new SettingsLocalStorage();

export function useSettings(userId: string) {
  const [autoSave, setAutoSave] = useState(false);
  const [useGrayscaleIcons, setUseGrayscaleIcons] = useState(false);

  useEffect(() => {
    const restoreSettings = async () => {
      if (!userId) return;

      const settingsContainer = await settingsLocalStorage.get(userId);
      if (!settingsContainer) return;

      const { settings } = settingsContainer;

      if (settings) {
        setAutoSave(settings.autoSave);
        setUseGrayscaleIcons(settings.useGrayscaleIcons);
      }
    };

    restoreSettings();
  }, [userId]);

  useEffect(() => {
    const saveSettings = async () => {
      if (!userId) return;

      settingsLocalStorage.save({
        id: userId,
        settings: {
          useGrayscaleIcons,
          autoSave,
        },
      });
    };

    saveSettings();
  }, [autoSave, useGrayscaleIcons]);

  return [
    autoSave,
    setAutoSave,
    useGrayscaleIcons,
    setUseGrayscaleIcons,
  ] as const;
}
