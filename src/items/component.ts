import Item from "./item";

class Component extends Item {
    constructor(id?: string) {
        super(id);
    }

    public deserializeFromJSON(jsonString: string) {
        const json = JSON.parse(jsonString);

        this.height = json.height || this.height;
        this.width = json.width || this.width;
        this.x = json.x || this.x;
        this.y = json.y || this.y;
        this.z = json.z || this.z;
    }
}

export default Component;
