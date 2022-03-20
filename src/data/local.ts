import localforage from "./localforageconfig";
import uuid from "react-native-uuid";
import { Repository } from ".";
import { FlowExportObject } from "react-flow-renderer";
import { Menu as MenuDefinition } from "../menu-definitions";

export class LocalStorage<T extends { id?: string }> implements Repository<T> {
    private _store: LocalForage;
    constructor(storeName: string) {
        this._store = localforage.createInstance({
            storeName
        });
    }
    async get(id: string) {
        return this._store.getItem(id) as Promise<T>;
    }
    async save(data: T) {
        if (!data) return;
        data.id ||= uuid.v4().toString();
        return this._store.setItem(data.id, data) as Promise<T>;
    }
}

export type Flow = {
    id?: string;
    flow: FlowExportObject<any>;
}
export class FlowLocalStorage extends LocalStorage<Flow> {
    constructor() {
        super("flows");
    }
}

export type Menus = {
    id?: string;
    menus: MenuDefinition[];
}
export class MenuLocalStorage extends LocalStorage<Menus> {
    constructor() {
        super("menus");
    }
}

export type Settings = {
    id?: string;
    settings: {
        useGrayscaleIcons: boolean;
        autoSave: boolean;
    };
}
export class SettingsLocalStorage extends LocalStorage<Settings> {
    constructor() {
        super("settings");
    }
}

export type User = {
    id?: string;
    user: any;
}
export class UsersLocalStorage extends LocalStorage<User> {
    constructor() {
        super("users");
    }
}
