import localforage from "./localforageconfig";
import uuid from "react-native-uuid";
import { Repository } from ".";

export default class LocalStorage<T extends { id?: string }> implements Repository<T> {
    get(id: string) {
        return localforage.getItem(id) as Promise<T>;
    }
    save(data: T) {
        if (!data) return;
        data.id ||= uuid.v4().toString();
        localforage.setItem(data.id, data);
    }
}
