import Component from "./component";
import Connector from "./connector";
import Item from "./item";

class Page {
    private _isDeserialized: boolean = false;

    public env: { [key: string]: any } = {};
    public items: Item[] = [];
    public height: number = 500;
    public width: number = 500;

    public get isDeserialized() {
        return this._isDeserialized;
    }

    public addItem(item: Item) {
        item.page = this;
        this.items.push(item);
    }

    public findItemById(id: string) {
        return this.items.find((item) => item.id === id);
    }

    public deserializeFromJSON(jsonString: string) {
        const json = JSON.parse(jsonString);

        this.height = json.height || this.height;
        this.width = json.width || this.width;

        const items: any[] = json.items || [];
        items.forEach((item) => {
            if (item.type !== "connector") {
                const component = new Component(item.id);
                this.addItem(component);
                component.deserializeFromJSON(JSON.stringify(item));
            } else {
                const connector = new Connector(item.id);
                this.addItem(connector);
                connector.deserializeFromJSON(JSON.stringify(item));
            }
        });

        this._isDeserialized = true;
    }
    public syncEnv() {
        this.items.forEach((i) => {
            for (let key in this.env) {
                i.env[key] = i.env[key] || {};
            }

            const keysToDelete = [];
            for (let key in i.env) {
                if (!this.env[key]) {
                    keysToDelete.push(key);
                }
            }
            keysToDelete.forEach((key) => i.env[key] = undefined);
        });
    }
}

export default Page;
