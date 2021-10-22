import Component, { Path } from "../models/component";
import Connector from "../models/connector";
import Page from "../models/page";

export default class Renderer {
    public static CANVAS_COLOR = "#EEE";
    public static DEFAULT_COLOR = "#000";
    public static DEFAULT_LINE_WIDTH = 2;
    public static HOVER_COLOR = "#3ACCFF";
    public static SELECTION_COLOR = "#33CCFF";
    public static SELECTION_LINE_WIDTH = 4;
    
    public drawComponent = (context: CanvasRenderingContext2D, component: Component) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.lineWidth = Renderer.DEFAULT_LINE_WIDTH;
        if (component.path) {
            context.translate(component.x, component.y);
            let paths: Path[] = [];
            if(Object.prototype.toString.call(component.path) === '[object Array]') {
                paths = component.path as Path[];
            } else {
                paths = [component.path as Path]
            }
            paths.forEach((path) => {
                context.strokeStyle = path.stroke || Renderer.DEFAULT_COLOR;
                context.fillStyle = path.fill || Renderer.DEFAULT_COLOR;
                const path2D = new Path2D(path.d);
                context.fill(path2D);
                context.stroke(path2D);
            });
        } else if (component.image) {
            const {x, y, width, height} = component;
            context.drawImage(component.image, x, y, width, height);
        }

        if (component.isHoveredOver) this.drawComponentHover(context, component);
        if (component.isActive) this.drawComponentSelection(context, component);
    }

    public drawComponentHover = (context: CanvasRenderingContext2D, component: Component) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.strokeStyle = Renderer.HOVER_COLOR;
        context.strokeRect(component.x - 1, component.y - 1, component.width + 2, component.height + 2);
    }

    public drawComponentSelection = (context: CanvasRenderingContext2D, component: Component) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.strokeStyle = Renderer.SELECTION_COLOR;
        context.strokeRect(component.x - 1, component.y - 1, component.width + 2, component.height + 2);
    }

    public drawConnector = (context: CanvasRenderingContext2D, connector: Connector) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (connector.fromComponent && connector.toComponent) {
            context.fillStyle = connector.isActive ? Renderer.SELECTION_COLOR : connector.isHoveredOver ? Renderer.HOVER_COLOR : Renderer.DEFAULT_COLOR;
            context.strokeStyle = connector.isActive ? Renderer.SELECTION_COLOR : connector.isHoveredOver ? Renderer.HOVER_COLOR : Renderer.DEFAULT_COLOR;
            context.lineWidth = connector.isActive || connector.isHoveredOver ? Renderer.SELECTION_LINE_WIDTH : Renderer.DEFAULT_LINE_WIDTH;

            let { x1, y1, x2, y2 } = connector;
            const off = 6;

            if (connector.isEasthWard) {
                x1 += off;
                x2 -= off;
            } else if (connector.isWestWard) {
                x1 -= off;
                x2 += off;
            } else if (connector.isSouthEastWard) {
                x1 += off;
                y1 += off;
                x2 -= off;
                y2 -= off;
            } else if (connector.isSouthWestWard) {
                x1 -= off;
                y1 += off;
                x2 += off;
                y2 -= off;
            } else if (connector.isSouthWard) {
                y1 += off;
                y2 -= off;
            } else if (connector.isNorthEastWard) {
                x1 += off;
                y1 -= off;
                x2 -= off;
                y2 += off;
            } else if (connector.isNorthWestWard) {
                x1 -= off;
                y1 -= off;
                x2 += off;
                y2 += off;
            } else if (connector.isNorthWard) {
                y1 -= off;
                y2 += off;
            }

            // draw from point
            context.beginPath();
            context.arc(x1, y1, off / 2, 0, 2 * Math.PI);
            context.stroke();
            context.fill();

            // draw line
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();

            // down arrow
            context.beginPath();
            if (connector.isEasthWard) {
                context.moveTo(x2, y2 + (off / 2));
                context.lineTo(x2 + (off / 2), y2);
                context.lineTo(x2, y2 - (off / 2));
                context.closePath();
            } else if (connector.isWestWard) {
                context.moveTo(x2, y2 + (off / 2));
                context.lineTo(x2 - (off / 2), y2);
                context.lineTo(x2, y2 - (off / 2));
                context.closePath();
            } else if (connector.isSouthEastWard) {
                context.moveTo(x2 - (off / 3), y2 + (off / 2));
                context.lineTo(x2 + (off / 3), y2 + (off / 2));
                context.lineTo(x2 + (off / 3), y2 - (off / 2));
                context.closePath();
            } else if (connector.isSouthWestWard) {
                context.moveTo(x2 + (off / 3), y2 + (off / 2));
                context.lineTo(x2 - (off / 3), y2 + (off / 2));
                context.lineTo(x2 - (off / 3), y2 - (off / 2));
                context.closePath();
            } else if (connector.isSouthWard) {
                context.moveTo(x2 - (off / 2), y2);
                context.lineTo(x2, y2 + (off / 2));
                context.lineTo(x2 + (off / 2), y2);
                context.closePath();
            } else if (connector.isNorthEastWard) {
                context.moveTo(x2 - (off / 3), y2 - (off / 2));
                context.lineTo(x2 + (off / 3), y2 - (off / 2));
                context.lineTo(x2 + (off / 3), y2 + (off / 2));
                context.closePath();
            } else if (connector.isNorthWestWard) {
                context.moveTo(x2 + (off / 3), y2 - (off / 2));
                context.lineTo(x2 - (off / 3), y2 - (off / 2));
                context.lineTo(x2 - (off / 3), y2 + (off / 2));
                context.closePath();
            } else if (connector.isNorthWard) {
                context.moveTo(x2 - (off / 2), y2);
                context.lineTo(x2, y2 - (off / 2));
                context.lineTo(x2 + (off / 2), y2);
                context.closePath();
            }
            context.stroke();
            context.fill();
        }
    }
    
    public drawPage = (context: CanvasRenderingContext2D, page: Page) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, page.width, page.height)

        context.fillStyle = Renderer.CANVAS_COLOR;
        context.fillRect(0, 0, page.width, page.height);

        // context.imageSmoothingEnabled = false;

        page.items
            .filter((item) => item instanceof Component)
            .sort((a, b) => a.z - b.z)
            .sort((a, b) => (a.isActive ? 1 : 0) - (b.isActive ? 1 : 0))
            .map((item) => item as Component)
            .forEach((component) => this.drawComponent(context, component));

        page.items
            .filter((item) => item instanceof Connector)
            .sort((a, b) => a.z - b.z)
            .sort((a, b) => (a.isActive ? 1 : 0) - (b.isActive ? 1 : 0))
            .map((item) => item as Connector)
            .forEach((connector) => this.drawConnector(context, connector));
    }

    public detectIntersection = (rectA: Rectangle, rectB: Rectangle) => {
        const { x: minAx, y: minAy, width: wa, height: ha } = rectA;
        const maxAx = minAx + wa;
        const maxAy = minAy + ha;

        const { x: minBx, y: minBy, width: wb, height: hb } = rectB;
        const maxBx = minBx + wb;
        const maxBy = minBy + hb;

        return minAx <= maxBx && maxAx >= minBx && minAy <= maxBy && maxAy >= minBy;
    }

    public detectPointInLine = (point: Point, line: Line) => {
        const { x, y } = point;
        const { x1, y1, x2, y2 } = line;

        const pointDiffAC = this.distanceBetweenPoints({ x, y }, { x: x1, y: y1 });
        const pointDiffBC = this.distanceBetweenPoints({ x, y }, { x: x2, y: y2 });
        const pointDiffAB = this.distanceBetweenPoints({ x: x2, y: y2 }, { x: x1, y: y1 });

        // typically we would say
        // return pointDiffAC + pointDiffBC === pointDiffAB;
        // but since we can't be too perfect with the position of the mouse, we'd say:
        return Math.abs((pointDiffAC + pointDiffBC) - pointDiffAB) < 1;
    }

    private distanceBetweenPoints = (a: Point, b: Point) => Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
}

export type Rectangle = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type Point = {
    x: number;
    y: number;
}

export type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
