import Component from "./component";
import Item from "./item";

class Connector extends Item {
    constructor(id?: string) {
        super(id);

        this.z = 100;
    }

    public fromComponent: Component;
    public toComponent: Component;

    public get isEasthWard() {
        const x1 = this.fromComponent.x + this.fromComponent.width;
        const y1 = this.fromComponent.y + (this.fromComponent.height / 2);
        const x2 = this.toComponent.x;
        const y2 = this.toComponent.y + (this.toComponent.height / 2);
        const angle = this.angle(x1, y1, x2, y2);
        return (angle >= 0 && angle <= 45) || (angle >=315 && angle <=360);
    }
    public get isNorthEastWard() {
        // use same coordinates as isEastWard()
        const x1 = this.fromComponent.x + this.fromComponent.width;
        const y1 = this.fromComponent.y + (this.fromComponent.height / 2);
        const x2 = this.toComponent.x;
        const y2 = this.toComponent.y + (this.toComponent.height / 2);
        const angle = this.angle(x1, y1, x2, y2);
        return angle >= 280 && angle <=315;
    }
    public get isNorthWard() {
        const x1 = this.fromComponent.x + (this.fromComponent.width / 2);
        const y1 = this.fromComponent.y;
        const x2 = this.toComponent.x + (this.toComponent.width / 2);
        const y2 = this.toComponent.y + this.toComponent.height;
        const angle = this.angle(x1, y1, x2, y2);
        return angle >= 180 && angle <=360;
    }
    public get isNorthWestWard() {
        // use same coordinates as isWestWard()
        const x1 = this.fromComponent.x;
        const y1 = this.fromComponent.y + (this.fromComponent.height / 2);
        const x2 = this.toComponent.x + this.toComponent.width;
        const y2 = this.toComponent.y + (this.toComponent.height / 2);
        const angle = this.angle(x1, y1, x2, y2);
        return angle >= 225 && angle <=260;
    }
    public get isSouthEastWard() {
        // use same coordinates as isEastWard()
        const x1 = this.fromComponent.x + this.fromComponent.width;
        const y1 = this.fromComponent.y + (this.fromComponent.height / 2);
        const x2 = this.toComponent.x;
        const y2 = this.toComponent.y + (this.toComponent.height / 2);
        const angle = this.angle(x1, y1, x2, y2);
        return angle >= 45 && angle <=80;
    }
    public get isSouthWard() {
        const x1 = this.fromComponent.x + (this.fromComponent.width / 2);
        const y1 = this.fromComponent.y + this.fromComponent.height;
        const x2 = this.toComponent.x + (this.toComponent.width / 2);
        const y2 = this.toComponent.y;
        const angle = this.angle(x1, y1, x2, y2);
        return angle >= 0 && angle <=180;
    }
    public get isSouthWestWard() {
        // use same coordinates as isWestWard()
        const x1 = this.fromComponent.x;
        const y1 = this.fromComponent.y + (this.fromComponent.height / 2);
        const x2 = this.toComponent.x + this.toComponent.width;
        const y2 = this.toComponent.y + (this.toComponent.height / 2);
        const angle = this.angle(x1, y1, x2, y2);
        return angle >= 100 && angle <=135;
    }
    public get isWestWard() {
        const x1 = this.fromComponent.x;
        const y1 = this.fromComponent.y + (this.fromComponent.height / 2);
        const x2 = this.toComponent.x + this.toComponent.width;
        const y2 = this.toComponent.y + (this.toComponent.height / 2);
        const angle = this.angle(x1, y1, x2, y2);
        return angle >= 135 && angle <=225;
    }
    public get x1() {
        if (this.isEasthWard) return this.fromComponent.x + this.fromComponent.width;
        else if (this.isWestWard) return this.fromComponent.x;
        else if (this.isSouthEastWard) return this.fromComponent.x + this.fromComponent.width;
        else if (this.isSouthWestWard) return this.fromComponent.x;
        else if (this.isSouthWard) return this.fromComponent.x + (this.fromComponent.width / 2);
        else if (this.isNorthEastWard) return this.fromComponent.x + this.fromComponent.width;
        else if (this.isNorthWestWard) return this.fromComponent.x;
        else if (this.isNorthWard) return this.fromComponent.x + (this.fromComponent.width / 2);
        return this.fromComponent.x + (this.fromComponent.width / 2);
    }
    public get x2() {
        if (this.isEasthWard) return this.toComponent.x;
        else if (this.isWestWard) return this.toComponent.x + this.toComponent.width;
        else if (this.isSouthEastWard) return this.toComponent.x;
        else if (this.isSouthWestWard) return this.toComponent.x + this.toComponent.width;
        else if (this.isSouthWard) return this.toComponent.x + (this.toComponent.width / 2);
        else if (this.isNorthEastWard) return this.toComponent.x;
        else if (this.isNorthWestWard) return this.toComponent.x + this.toComponent.width;
        else if (this.isNorthWard) return this.toComponent.x + (this.toComponent.width / 2);
        return this.toComponent.x + (this.toComponent.width / 2);
    }
    public get y1() {
        if (this.isEasthWard) return this.fromComponent.y + (this.fromComponent.height / 2);
        else if (this.isWestWard) return this.fromComponent.y + (this.fromComponent.height / 2);
        else if (this.isSouthEastWard) return this.fromComponent.y + this.fromComponent.height;
        else if (this.isSouthWestWard) return this.fromComponent.y + this.fromComponent.height;
        else if (this.isSouthWard) return this.fromComponent.y + this.fromComponent.height;
        else if (this.isNorthEastWard) return this.fromComponent.y;
        else if (this.isNorthWestWard) return this.fromComponent.y;
        else if (this.isNorthWard) return this.fromComponent.y;
        return this.fromComponent.y + (this.fromComponent.height / 2);
    }
    public get y2() {
        if (this.isEasthWard) return this.toComponent.y + (this.toComponent.height / 2);
        else if (this.isWestWard) return this.toComponent.y + (this.toComponent.height / 2);
        else if (this.isSouthEastWard) return this.toComponent.y;
        else if (this.isSouthWestWard) return this.toComponent.y;
        else if (this.isSouthWard) return this.toComponent.y;
        else if (this.isNorthEastWard) return this.toComponent.y + this.toComponent.height;
        else if (this.isNorthWestWard) return this.toComponent.y + this.toComponent.height;
        else if (this.isNorthWard) return this.toComponent.y + this.toComponent.height;
        return this.toComponent.y + (this.toComponent.height / 2);
    }

    private angle(x1: number, y1: number, x2: number, y2: number) {
        const dy = y2 - y1;
        const dx = x2 - x1;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    public deserializeFromJSON(jsonString: string) {
        const json = JSON.parse(jsonString);

        const fromItem = this.page?.findItemById(json.fromComponent);
        if (fromItem && fromItem instanceof Component) {
            this.fromComponent = fromItem;
        }

        const toItem = this.page?.findItemById(json.toComponent);
        if (toItem && toItem instanceof Component) {
            this.toComponent = toItem;
        }
    }
}

export default Connector;
