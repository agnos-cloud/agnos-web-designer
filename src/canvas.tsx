import React, { useEffect, useState } from 'react';
import ReactFlow, {
    removeElements,
    addEdge,
    Background,
    Elements,
    BackgroundVariant,
    FlowElement,
    Node,
    Edge,
    Connection,
    OnLoadParams,
    Controls,
    MiniMap,
} from 'react-flow-renderer';
import { Fab, Action } from "react-tiny-fab";
import { AddShoppingCart, Menu as MenuIcon, MenuBook, MenuOpen, Save } from "@material-ui/icons";
import { Menu } from "./menus";

const mainButtonStyles = { height: 40, width: 40 };
const actionButtonStyles = { height: 36, width: 36 };
  
const onNodeDragStop = (_: React.MouseEvent<Element, MouseEvent>, node: Node) => console.log('drag stop', node);
const onElementClick = (_: React.MouseEvent<Element, MouseEvent>, element: FlowElement) => console.log('click', element);

export type CanvasPropType = {
    elements: Elements;
    menus?: Menu[];
}
  
const Canvas = (prop: CanvasPropType) => {
    const { elements: initialElements, menus } = prop;
    const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);
    const [elements, setElements] = useState<Elements>(initialElements);
    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        body.style.height = "98vh";
        body.style.width = "98vw";

        const main = document.getElementsByTagName('main')[0];
        main.style.height = "100%";
        main.style.width = "100%";

        const application = document.getElementById('single-spa-application:@agnos/agnos-web-designer');
        application.style.height = "100%";
        application.style.width = "100%";
    }, []);

    const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params: Edge | Connection) => setElements((els) => addEdge(params, els));
    const onLoad = (reactFlowInstance: OnLoadParams) => setRfInstance(reactFlowInstance);
  
    const logToObject = () => console.log(rfInstance?.toObject());
    const resetTransform = () => rfInstance?.setTransform({ x: 0, y: 0, zoom: 1 });
  
    return (
        <ReactFlow
            elements={elements}
            className="react-flow-basic-example"
            defaultZoom={1.5}
            minZoom={0.2}
            maxZoom={4}
            snapToGrid={true} // TODO: expose as settings
            snapGrid={[15, 15]}
            onLoad={onLoad}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
        >
            <MiniMap
                nodeStrokeColor={(n: Node) => {
                if (n.style?.background) return n.style.background.toString();
                if (n.type === 'input') return '#0041d0';
                if (n.type === 'output') return '#ff0072';
                if (n.type === 'default') return '#1a192b';

                return '#eee';
                }}
                nodeColor={(n: Node) => {
                if (n.style?.background) return n.style.background.toString();

                return '#fff';
                }}
                nodeBorderRadius={2}
            />
            <Controls />
            <Background variant={BackgroundVariant.Dots} color="#aaa" gap={16} />

            <Fab
                icon={<MenuIcon />}
                mainButtonStyles={mainButtonStyles}
                style={{ top: 0, left: 0 }}
                event="click"
                alwaysShowTitle={true}
            >
                <Action
                    style={actionButtonStyles}
                    text="Save"
                    onClick={() => resetTransform()}
                >
                    <Save />
                </Action>
                <Action
                    style={actionButtonStyles}
                    text="Get Component"
                    onClick={() => setElements((els) => [...els, {
                        id: '10',
                        type: 'input',
                        data: {
                          label: (
                            <>
                              Welcome to <strong>React Flow!</strong>
                            </>
                          ),
                        },
                        position: { x: 350, y: 100 },
                      }])}
                >
                    <AddShoppingCart />
                </Action>
                <Action
                    style={actionButtonStyles}
                    text="New Menu"
                    onClick={() => {}}
                >
                    <MenuOpen />
                </Action>
            </Fab>
            {menus.map((menu, index) => (
                <Fab
                    key={menu.id}
                    icon={menu.icon}
                    mainButtonStyles={mainButtonStyles}
                    style={{ top: 0, left: 50 * (index + 1) }}
                    event="click"
                    alwaysShowTitle={true}
                >
                    {menu.actions.map((action) => (
                        <Action
                            key={action.id}
                            style={actionButtonStyles}
                            text={action.text}
                            onClick={
                                () => setElements(
                                    (els) => [
                                        ...els,
                                        {
                                            ...action.element,
                                            position: {
                                                x: 10,
                                                y: 50
                                            }
                                        }
                                    ]
                                )
                            }
                        >
                            {action.icon}
                        </Action>
                    ))}
                </Fab>
            ))}
    
            <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 4 }}>
            <button onClick={resetTransform} style={{ marginRight: 5 }}>
                reset transform
            </button>
            <button onClick={logToObject}>toObject</button>
            </div>
        </ReactFlow>
    );
  };
  
  export default Canvas;
