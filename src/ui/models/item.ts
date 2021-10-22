import Page from "./page";

class Item {
    constructor(id?: string) {
        if (id) {
            this.id = id;
        } else {
            this.id = "generate new id";
        }
    }

    public id: string;
    public env: { [key: string]: any } = {};
    public height: number = 100;
    public isActive: boolean = false;
    public isHoveredOver: boolean = false;
    public page: Page;
    public width: number = 100;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
}

export default Item;
