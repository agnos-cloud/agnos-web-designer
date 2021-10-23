import React, { useEffect, useRef, useState } from "react";
import Component from "./ui/models/component";
import Connector from "./ui/models/connector";
import Item from "./ui/models/item";
import Page from "./ui/models/page";
import Renderer, { Line, Point, Rectangle } from "./ui/interactions/renderer";

export type CanvasPropTyep = {
    page: Page;
    renderer: Renderer;
    scale?: number;
    setScale?: (scale: number) => any
}

const Canvas = (props: CanvasPropTyep) => {
    const { page, renderer, scale, setScale, ...otherProps } = props;
    const scaleRef = useRef(scale);
    const canvasRef = useRef(null);
    const activeItemRef = useRef<Item | null>(null);
    const [activeItem, setActiveItem] = useState<Item | null>(null);
    const [activeItemLocation, setActiveItemLocation] = useState<Point>({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef<Point>({ x: 0, y: 0 });
    const dragEndRef = useRef<Point>({ x: 0, y: 0 });

    const handleCanvasMouseDownToSelectActiveComponent = (e: MouseEvent) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        activeItemRef.current = null;
        page.items.forEach((item) => {
            item.isActive = false;
            if (activeItemRef.current) return;
            if (item instanceof Component) {
                const itemRect: Rectangle = {
                    x: item.x * scaleRef.current,
                    y: item.y * scaleRef.current,
                    width: item.width * scaleRef.current,
                    height: item.height * scaleRef.current,
                };
                if(renderer.detectIntersection(itemRect, { x, y, width: 1, height: 1 })) {
                    if (!activeItemRef.current || (activeItemRef.current && activeItemRef.current.z <= item.z)) {
                        item.isActive = true;
                        activeItemRef.current = item;
                    }
                }
            } else if (item instanceof Connector) {
                const itemLine: Line = {
                    x1: item.x1 * scaleRef.current,
                    y1: item.y1 * scaleRef.current,
                    x2: item.x2 * scaleRef.current,
                    y2: item.y2 * scaleRef.current,
                };
                if(renderer.detectPointInLine({ x, y }, itemLine)) {
                    if (!activeItemRef.current || (activeItemRef.current && activeItemRef.current.z <= item.z)) {
                        item.isActive = true;
                        activeItemRef.current = item;
                    }
                }
            }
        });
        setActiveItem(activeItemRef.current);
    }

    const handleCanvasMouseDownToBeginDrag = (e: MouseEvent) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isDraggingRef.current = true;
        dragStartRef.current = { x, y };
    }

    const handleCanvasMouseUpToEndDrag = (e: MouseEvent) => {
        isDraggingRef.current = false;
        canvasRef.current.style.cursor = "default";
    }

    const handleCanvasMouseMoveToPerformDrag = (e: MouseEvent) => {
        // It's a little challenging to drag components with the canvas is scaled up
        // Partly because when scaled up, dragging affects the canvas, not just the components on the canvas
        // And partly because the change in mouse position (dragEnd-dragStart) cannot be scaled (multiplied by scaleRef.current)
        // As that would make the component move faster than the mouse
        // For now, we disable this feature whe the canvas is scaled
        if (isDraggingRef.current && scaleRef.current === 1) {
            canvasRef.current.style.cursor = "grabbing";
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                const rect = canvasRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                dragEndRef.current = { x, y };
                const dx = dragEndRef.current.x - dragStartRef.current.x;
                const dy = dragEndRef.current.y - dragStartRef.current.y;
                activeItemRef.current.x = activeItemRef.current.x + dx;
                activeItemRef.current.y = activeItemRef.current.y + dy;
                setActiveItemLocation({ x: activeItemRef.current.x, y: activeItemRef.current.y });
                dragStartRef.current = { x, y };
            }
        }
    }
    const handleCanvasMouseMoveToResizeAndScrollCanvas = (e: MouseEvent) => {
        // As explained in handleCanvasMouseMoveToPerformDrag
        // we don't attempt to move components when scale > 1
        if (isDraggingRef.current && scaleRef.current === 1) {
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                resizeAndScrollCanvas();
            }
        }
    }
    const handleCanvasMouseMoveToPerformHover = (e: MouseEvent) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        page.items.forEach((item) => {
            if (item instanceof Component) {
                const itemRect: Rectangle = {
                    x: item.x * scaleRef.current,
                    y: item.y * scaleRef.current,
                    width: item.width * scaleRef.current,
                    height: item.height * scaleRef.current,
                };
                if(renderer.detectIntersection(itemRect, { x, y, width: 1, height: 1 })) {
                    item.isHoveredOver = true;
                } else {
                    item.isHoveredOver = false;
                }
            } else if (item instanceof Connector) {
                const itemLine: Line = {
                    x1: item.x1 * scaleRef.current,
                    y1: item.y1 * scaleRef.current,
                    x2: item.x2 * scaleRef.current,
                    y2: item.y2 * scaleRef.current,
                };
                if(renderer.detectPointInLine({ x, y }, itemLine)) {
                    item.isHoveredOver = true;
                } else {
                    item.isHoveredOver = false;
                }
            }
        });
        // show appropriate mouse cursor
        if (!isDraggingRef.current) {
            if (page.items.some((item) => item.isHoveredOver)) {
                canvasRef.current.style.cursor = "pointer";
            } else {
                canvasRef.current.style.cursor = "default";
            }
        }
        // fire a custom event to force the canvas to refresh
        window.dispatchEvent(new Event("dirty"));
    }

    const handleWindowKeyDownToMoveActiveComponent = (e: KeyboardEvent) => {
        // As explained in handleCanvasMouseMoveToPerformDrag
        // we don't attempt to move components when scale > 1
        if (scaleRef.current === 1 && (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight")) {
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                e.preventDefault();
                if (e.code === "ArrowUp") activeItemRef.current.y = activeItemRef.current.y - 5;
                if (e.code === "ArrowDown") activeItemRef.current.y = activeItemRef.current.y + 5;
                if (e.code === "ArrowLeft") activeItemRef.current.x = activeItemRef.current.x - 5;
                if (e.code === "ArrowRight") activeItemRef.current.x = activeItemRef.current.x + 5;
                setActiveItemLocation({ x: activeItemRef.current.x, y: activeItemRef.current.y });
            }
        }
    }

    const handleWindowKeyDownToResizeAndScrollCanvas = (e: KeyboardEvent) => {
        // As explained in handleCanvasMouseMoveToPerformDrag
        // we don't attempt to move components when scale > 1
        if (scaleRef.current === 1 && (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight")) {
            if (activeItemRef.current && activeItemRef.current instanceof Component) {
                e.preventDefault();
                resizeAndScrollCanvas();
            }
        }
    }

    const resizeAndScrollCanvas = () => {
        const body = document.body; // Safari
        const html = document.documentElement; // Chrome, Firefox, IE and Opera
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        if (rect.width - (activeItemRef.current.x + activeItemRef.current.width) < 50) {
            const width = rect.width + activeItemRef.current.width + 200;
            canvas.width = width;
            page.width = width;
            canvas.style.width = `${width}px`;
        }

        if (rect.height - (activeItemRef.current.y + activeItemRef.current.height) < 50) {
            const height = rect.height + activeItemRef.current.height + 200;
            canvas.height = height;
            page.height = height;
            canvas.style.height = `${height}px`;
        }

        if ((window.innerWidth + (html.scrollLeft || body.scrollLeft)) - (activeItemRef.current.x + activeItemRef.current.width) < 50) {
            body.scrollLeft += 10;
            html.scrollLeft += 10;
        } else if (activeItemRef.current.x - (html.scrollLeft || body.scrollLeft) < 50) {
            body.scrollLeft -= 10;
            html.scrollLeft -= 10;
        }

        if ((window.innerHeight + (html.scrollTop || body.scrollTop)) - (activeItemRef.current.y + activeItemRef.current.height) < 50) {
            body.scrollTop += 10;
            html.scrollTop += 10;
        } else if (activeItemRef.current.y - (html.scrollTop || body.scrollTop) < 50) {
            body.scrollTop -= 10;
            html.scrollTop -= 10;
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
        canvas.addEventListener("mousedown", handleCanvasMouseDownToSelectActiveComponent);
        canvas.addEventListener("mousedown", handleCanvasMouseDownToBeginDrag);
        canvas.addEventListener("mouseup", handleCanvasMouseUpToEndDrag);
        canvas.addEventListener("mousemove", handleCanvasMouseMoveToPerformDrag);
        canvas.addEventListener("mousemove", handleCanvasMouseMoveToResizeAndScrollCanvas);
        canvas.addEventListener("mousemove", handleCanvasMouseMoveToPerformHover);
        window.addEventListener("keydown", handleWindowKeyDownToMoveActiveComponent);
        window.addEventListener("keydown", handleWindowKeyDownToResizeAndScrollCanvas);

        // custom events
        const handleWindowDirtyToForceCanvasRepaint = () => renderer.drawPage(context, page);
        window.addEventListener("dirty", handleWindowDirtyToForceCanvasRepaint);

        return () => {
            canvas.removeEventListener("mousedown", handleCanvasMouseDownToSelectActiveComponent);
            canvas.removeEventListener("mousedown", handleCanvasMouseDownToBeginDrag);
            canvas.removeEventListener("mouseup", handleCanvasMouseUpToEndDrag);
            canvas.removeEventListener("mousemove", handleCanvasMouseMoveToPerformDrag);
            canvas.removeEventListener("mousemove", handleCanvasMouseMoveToResizeAndScrollCanvas);
            canvas.removeEventListener("mousemove", handleCanvasMouseMoveToPerformHover);
            window.removeEventListener("keydown", handleWindowKeyDownToMoveActiveComponent);
            window.removeEventListener("keydown", handleWindowKeyDownToResizeAndScrollCanvas);
            window.removeEventListener("dirty", handleWindowDirtyToForceCanvasRepaint);
        };
    }, []);

    useEffect(() => {
        if (!page.isDeserialized) return;

        const canvas = canvasRef.current;
        const context: CanvasRenderingContext2D = canvas.getContext("2d");

        renderer.drawPage(context, page);
    }, [page, renderer, activeItem, activeItemRef.current, activeItemLocation, isDraggingRef.current]);

    useEffect(() => {
        scaleRef.current = scale;
        setScale(scale);
    }, [scale]);

    return <canvas ref={canvasRef} {...otherProps}/>;
}

export default Canvas;
