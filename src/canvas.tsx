import React, { useEffect, useRef, useState } from "react";
import Component from "./items/component";
import Connector from "./items/connector";
import Item from "./items/item";
import Page from "./items/page";

export type CanvasPropTyep = {
    page: Page
}

const Canvas = (props: CanvasPropTyep) => {
    const { page, ...otherProps } = props;
    const canvasRef = useRef(null);
    const activeItemRef = useRef<Item | null>(null);
    const [activeItem, setActiveItem] = useState<Item | null>(null);
    const [activeItemLocation, setActiveItemLocation] = useState<Point>({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef<Point>({ x: 0, y: 0 });
    const dragEndRef = useRef<Point>({ x: 0, y: 0 });

    const drawComponent = (context, component: Component) => {
        context.fillStyle = '#f00';
        context.fillRect(component.x, component.y, component.width, component.height);

        if (component.isActive) drawComponentSelection(context, component);
    }

    const drawComponentSelection = (context, component: Component) => {
        context.strokeStyle = "#009";
        context.strokeRect(component.x - 1, component.y - 1, component.width + 2, component.height + 2);
    }

    const drawConnector = (context, connector: Connector) => {
        if (connector.fromComponent && connector.toComponent) {
            context.fillStyle = connector.isActive ? "#009" : "#000";
            context.strokeStyle = connector.isActive ? "#009" : "#000";
            context.lineWidth = connector.isActive ? 5 : 3;

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

    const drawPage = (context, page: Page) => {
        context.clearRect(0, 0, page.width, page.height)

        context.fillStyle = '#eee';
        context.fillRect(0, 0, page.width, page.height);

        page.items
            .filter((item) => item instanceof Component)
            .sort((a, b) => a.z - b.z)
            .sort((a, b) => (a.isActive ? 1 : 0) - (b.isActive ? 1 : 0))
            .map((item) => item as Component)
            .forEach((component) => drawComponent(context, component));

        page.items
            .filter((item) => item instanceof Connector)
            .sort((a, b) => a.z - b.z)
            .sort((a, b) => (a.isActive ? 1 : 0) - (b.isActive ? 1 : 0))
            .map((item) => item as Connector)
            .forEach((connector) => drawConnector(context, connector));
    }

    const detectCollision = (rectA: Rectangle, rectB: Rectangle) => {
        const { x: minAx, y: minAy, width: wa, height: ha } = rectA;
        const maxAx = minAx + wa;
        const maxAy = minAy + ha;

        const { x: minBx, y: minBy, width: wb, height: hb } = rectB;
        const maxBx = minBx + wb;
        const maxBy = minBy + hb;

        return minAx <= maxBx && maxAx >= minBx && minAy <= maxBy && maxAy >= minBy;
    }

    const detectPointInLine = (point: Point, line: Line) => {
        const { x, y } = point;
        const { x1, y1, x2, y2 } = line;
        const dy1 = y2 - y;
        const dy2 = y - y1;

        if (dy1 === 0 && dy2 === 0) return true;

        const dx1 = x2 - x;
        const dx2 = x - x1;

        if (dx1 === 0 && dx2 === 0) return true;
        if (dx1 === 0 && dx2 !== 0) return false;
        if (dx1 !== 0 && dx2 === 0) return false;

        return ((dy2 / dx2) - (dy1 / dx1)) < 0.2;
    }

    const handleCanvasClick = (e: MouseEvent) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        activeItemRef.current = null;
        page.items.forEach((item) => {
            item.isActive = false;
            if (item instanceof Component) {
                if(detectCollision(item, { x, y, width: 1, height: 1 })) {
                    if (!activeItemRef.current || (activeItemRef.current && activeItemRef.current.z <= item.z)) {
                        item.isActive = true;
                        activeItemRef.current = item;
                    }
                }
            } else if (item instanceof Connector) {
                const { x1, y1, x2, y2 } = item;
                let rect: Rectangle = {
                    x: Math.min(x1, x2),
                    y: Math.min(y1, y2),
                    width: Math.max(Math.abs(x1 - x2), 1),
                    height: Math.max(Math.abs(y1 - y2), 1),
                };
                let line: Line = { x1, y1, x2, y2 };
                let mouseRect: Rectangle = { x, y, width: 1, height: 1 };
                let mousePoint: Point = { x, y };

                if(detectCollision(rect, mouseRect)
                && detectPointInLine(mousePoint, line)) {
                    if (!activeItemRef.current || (activeItemRef.current && activeItemRef.current.z <= item.z)) {
                        item.isActive = true;
                        activeItemRef.current = item;
                    }
                }
            }
        });
        setActiveItem(activeItemRef.current);
    }

    const handleCanvasMouseDown = (e: MouseEvent) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isDraggingRef.current = true;
        dragStartRef.current = { x, y };
    }
    const handleCanvasMouseUp = (e: MouseEvent) => {
        // setIsDragging(false);
        isDraggingRef.current = false;
    }
    const handleCanvasMouseMove = (e: MouseEvent) => {
        if (isDraggingRef.current) {
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                const rect = canvasRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                dragEndRef.current = { x, y };
                const dx = dragEndRef.current.x - dragStartRef.current.x;
                const dy = dragEndRef.current.y - dragStartRef.current.y;
                const item = page.items.find((item) => item.id === activeItemRef.current.id);
                if (item) {
                    item.x = item.x + dx;
                    item.y = item.y + dy;
                    setActiveItemLocation({ x: item.x, y: item.y });
                    dragStartRef.current = { x, y };
                }
            }
        }
    }
    const handleWindowKeyDown = (e: KeyboardEvent) => {
        if (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                const item = page.items.find((item) => item.id === activeItemRef.current.id);
                if (item) {
                    if (e.code === "ArrowUp") item.y = item.y - 5;
                    if (e.code === "ArrowDown") item.y = item.y + 5;
                    if (e.code === "ArrowLeft") item.x = item.x - 5;
                    if (e.code === "ArrowRight") item.x = item.x + 5;
                    setActiveItemLocation({ x: item.x, y: item.y });
                }
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        // events
        canvas.addEventListener("mousedown", handleCanvasClick);
        canvas.addEventListener("mousedown", handleCanvasMouseDown);
        canvas.onmouseup = handleCanvasMouseUp;
        canvas.onmousemove = handleCanvasMouseMove;
        window.onkeydown = handleWindowKeyDown;
    }, []);

    useEffect(() => {
        if (!page.isDeserialized) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        drawPage(context, page);
    }, [page, activeItem, activeItemRef.current, activeItemLocation, isDraggingRef.current]);

    return <canvas ref={canvasRef} height={page.height} width={page.width} {...otherProps}/>;
}

type Point = {
    x: number;
    y: number;
}

type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

type Rectangle = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export default Canvas;
