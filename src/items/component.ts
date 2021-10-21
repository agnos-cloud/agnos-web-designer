import Item from "./item";

class Component extends Item {
    constructor(id?: string) {
        super(id);
    }

    public image?: HTMLImageElement;
    public path?: Path | Path[];

    public deserializeFromJSON(jsonString: string) {
        const json = JSON.parse(jsonString);

        this.height = json.height || this.height;
        this.width = json.width || this.width;
        this.x = json.x || this.x;
        this.y = json.y || this.y;
        this.z = json.z || this.z;

        if (json.path) {
            if(Object.prototype.toString.call(json.path) === '[object Array]') {
                this.path = json.path.filter((path) => !!path.d).map((path) => ({
                    d: path.d,
                    fill: path.fill,
                    stroke: path.stroke,
                }));
            } else if (json.path.d) {
                const { d, fill, stroke } = json.path;
                this.path = { d, fill, stroke };
            }
        } else if (json.image && json.image.src) {
            const img = document.createElement("img");
            img.src = json.image.src;
            img.width = this.width * window.devicePixelRatio;
            img.height = this.height * window.devicePixelRatio;
            img.addEventListener('load', () => {
                this.image = img;
                // fire a custom event to force the canvas to refresh
                const event = new Event("componentimageload");
                window.dispatchEvent(event);
            });
        }
    }
}

export type Path = {
    d: string;
    fill?: string;
    stroke?: string;
}

export default Component;
