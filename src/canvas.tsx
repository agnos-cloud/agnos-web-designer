import React, { useEffect, useRef, useState } from "react";
import Component, { Path } from "./items/component";
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

    const drawComponent = (context: CanvasRenderingContext2D, component: Component) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.lineWidth = 2;
        if (component.path) {
            context.translate(component.x, component.y);
            let paths: Path[] = [];
            if(Object.prototype.toString.call(component.path) === '[object Array]') {
                paths = component.path as Path[];
            } else {
                paths = [component.path as Path]
            }
            paths.forEach((path) => {
                context.strokeStyle = path.stroke || "#000";
                context.fillStyle = path.fill || "#000";
                const path2D = new Path2D(path.d);
                context.fill(path2D);
                context.stroke(path2D);
            });
        } else if (component.image) {
            const {x, y, width, height} = component;
            context.drawImage(component.image, x, y, width, height);
        }

        if (component.isActive) drawComponentSelection(context, component);
    }

    const drawComponentSelection = (context: CanvasRenderingContext2D, component: Component) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.strokeStyle = "#3aafdc";
        context.lineWidth = 2;
        context.strokeRect(component.x - 1, component.y - 1, component.width + 2, component.height + 2);
    }

    const drawConnector = (context: CanvasRenderingContext2D, connector: Connector) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (connector.fromComponent && connector.toComponent) {
            context.fillStyle = connector.isActive ? "#3aafdc" : "#000";
            context.strokeStyle = connector.isActive ? "#3aafdc" : "#000";
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

    const drawPage = (context: CanvasRenderingContext2D, page: Page) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
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
    const handleCanvasMouseMove2 = (e: MouseEvent) => {
        if (isDraggingRef.current) {
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                const body = document.body; // Safari
                const html = document.documentElement; // Chrome, Firefox, IE and Opera
                const canvas = canvasRef.current;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (rect.width - x < (activeItemRef.current.width + 100)) {
                    const width = rect.width + activeItemRef.current.width + 200;
                    canvas.width = width;
                    page.width = width;
                    canvas.style.width = `${width}px`;
                }

                if (rect.height - y < (activeItemRef.current.height + 100)) {
                    const height = rect.height + activeItemRef.current.height + 200;
                    canvas.height = height;
                    page.height = height;
                    canvas.style.height = `${height}px`;
                }

                if (window.innerWidth - e.clientX < 150) {
                    body.scrollLeft += 10;
                    html.scrollLeft += 10;
                } else if (e.clientX < 150) {
                    body.scrollLeft -= 10;
                    html.scrollLeft -= 10;
                }

                if (window.innerHeight - e.clientY < 150) {
                    body.scrollTop += 10;
                    html.scrollTop += 10;
                } else if (e.clientY < 150) {
                    body.scrollTop -= 10;
                    html.scrollTop -= 10;
                }
            }
        }
    }
    const handleWindowKeyDown = (e: KeyboardEvent) => {
        if (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                e.preventDefault();
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

    const handleWindowKeyDown2 = (e: KeyboardEvent) => {
        if (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                e.preventDefault();
                const item = page.items.find((item) => item.id === activeItemRef.current.id);
                if (item) {
                    const body = document.body;
                    const html = document.documentElement;
                    const canvas = canvasRef.current;
                    const rect = canvas.getBoundingClientRect();

                    if (rect.width - (item.x + item.width) < 50) {
                        const width = rect.width + item.width + 200;
                        canvas.width = width;
                        page.width = width;
                        canvas.style.width = `${width}px`;
                    }
    
                    if (rect.height - (item.y + item.height) < 50) {
                        const height = rect.height + item.height + 200;
                        canvas.height = height;
                        page.height = height;
                        canvas.style.height = `${height}px`;
                    }

                    if ((window.innerWidth + (html.scrollLeft || body.scrollLeft)) - (item.x + item.width) < 50) {
                        body.scrollLeft += 10;
                        html.scrollLeft += 10;
                    } else if (item.x - (html.scrollLeft || body.scrollLeft) < 50) {
                        body.scrollLeft -= 10;
                        html.scrollLeft -= 10;
                    }

                    if ((window.innerHeight + (html.scrollTop || body.scrollTop)) - (item.y + item.height) < 50) {
                        body.scrollTop += 10;
                        html.scrollTop += 10;
                    } else if (item.y - (html.scrollTop || body.scrollTop) < 50) {
                        body.scrollTop -= 10;
                        html.scrollTop -= 10;
                    }
                }
            }
        }
    }

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        body.style.height = "100vh";
        body.style.width = "100vw";

        const canvas = canvasRef.current;

        const bodyRect = body.getBoundingClientRect();
        const height = Math.max(bodyRect.height, page.height);
        const width = Math.max(bodyRect.width, page.width);
        canvas.height = height;
        page.height = height;
        canvas.style.height = `${height}px`;
        canvas.width = width;
        page.width = width;
        canvas.style.width = `${width}px`;

        canvas.style.imageRendering = "crisp-edges";
        const context: CanvasRenderingContext2D = canvas.getContext("2d");

        // events
        canvas.addEventListener("mousedown", handleCanvasClick);
        canvas.addEventListener("mousedown", handleCanvasMouseDown);
        canvas.addEventListener("mouseup", handleCanvasMouseUp);
        canvas.addEventListener("mousemove", handleCanvasMouseMove);
        canvas.addEventListener("mousemove", handleCanvasMouseMove2);
        window.addEventListener("keydown", handleWindowKeyDown);
        window.addEventListener("keydown", handleWindowKeyDown2);

        // custom events
        const handleComponentImageLoad = () => drawPage(context, page);
        window.addEventListener("componentimageload", handleComponentImageLoad);

        return () => {
            canvas.removeEventListener("mousedown", handleCanvasClick);
            canvas.removeEventListener("mousedown", handleCanvasMouseDown);
            canvas.removeEventListener("mouseup", handleCanvasMouseUp);
            canvas.removeEventListener("mousemove", handleCanvasMouseMove);
            canvas.removeEventListener("mousemove", handleCanvasMouseMove2);
            window.removeEventListener("keydown", handleWindowKeyDown);
            window.removeEventListener("keydown", handleWindowKeyDown2);
            window.removeEventListener("componentimageload", handleComponentImageLoad);
        };
    }, []);

    useEffect(() => {
        if (!page.isDeserialized) return;

        const canvas = canvasRef.current;
        const context: CanvasRenderingContext2D = canvas.getContext("2d");

        drawPage(context, page);
    }, [page, activeItem, activeItemRef.current, activeItemLocation, isDraggingRef.current]);

    return <canvas ref={canvasRef} {...otherProps}/>;
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
