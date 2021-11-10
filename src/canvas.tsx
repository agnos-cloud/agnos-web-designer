import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory  } from "react-router-dom";
import ReactFlow, {
    removeElements,
    addEdge,
    Background,
    Elements,
    BackgroundVariant,
    Node,
    Edge,
    Connection,
    OnLoadParams,
    Controls,
    MiniMap,
    ArrowHeadType,
    ConnectionLineType,
    updateEdge,
    isNode,
    Position,
    useZoomPanHelper,
} from "react-flow-renderer";
import { ArrowDownward, ArrowForward, Close, CloudDownload, Image, Menu as MenuIcon, Restore, Save, Settings } from "@material-ui/icons";
import { Button, ButtonGroup, FormControlLabel, Switch } from "@mui/material";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import dagre from "dagre";
import uuid from "react-native-uuid";
import { Menu as MenuDefinition, MenuAction } from "./menu-definitions";
import { nodeTypes } from "./custom-elements/nodes";
import { edgeTypes } from "./custom-elements/edges";
import SmoothStepArrowHead from "./custom-elements/connection-lines/smoothstep-arrowhead";
import Menu from "./components/menu";
import MenuActionIcon from "./components/menu-action-icon";
import { createComponentFromMenuAction } from "./utils/component";
import { FlowLocalStorage, SettingsLocalStorage } from "./data/local";
import { mergeMenus } from "./utils/menu";

const flowLocalStorage = new FlowLocalStorage();
const settingsLocalStorage = new SettingsLocalStorage();

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (elements: Elements, direction = "LR") => {
    let nodeWidth = 100;
    let nodeHeight = 100;
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
        if (isNode(el)) {
            if (el.type === "text") {
                nodeWidth = 172;
                nodeHeight = 36;
            } else {
                nodeWidth = 100;
                nodeHeight = 100;
            }

            dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
        } else {
            dagreGraph.setEdge(el.source, el.target);
        }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
        if (isNode(el)) {
            if (el.type === "text") {
                nodeWidth = 172;
                nodeHeight = 36;
            } else {
                nodeWidth = 100;
                nodeHeight = 100;
            }

            const nodeWithPosition = dagreGraph.node(el.id);
            el.targetPosition = isHorizontal ? Position.Left : Position.Top;
            el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

            // unfortunately we need this little hack to pass a slightly different position
            // to notify react flow about the change. Moreover we are shifting the dagre node position
            // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
            el.position = {
                x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
                y: nodeWithPosition.y - nodeHeight / 2,
            };
        }

        return el;
    });
};

export type CanvasPropType = {
    elements: Elements;
    menus?: MenuDefinition[];
    designId?: string;
    userId?: string;
}
  
const Canvas = (props: CanvasPropType) => {
    const { elements: initialElements, menus: initialMenus, designId, userId } = props;
    const history = useHistory();
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams | null>(null);
    const [elements, setElements] = useState<Elements>(getLayoutedElements(initialElements));
    const [nodeEdit, setNodeEdit] = useState<{ id: string, text: string } | null>(null);
    const [autoSave, setAutoSave] = useState(false);
    const [useGrayscaleIcons, setUseGrayscaleIcons] = useState(false);
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const [graphDirection, setGraphDirection] = useState<"LR" | "TB">("TB");
    const [menus, setMenus] = useState<MenuDefinition[]>([]);
    const [installedMenus, setInstalledMenus] = useState<MenuDefinition[]>([]);

    const layoutElements = useCallback((direction) => {
        const layoutedElements = getLayoutedElements(elements, direction);
        setElements(layoutedElements);
    }, [elements]);

    const recreateNodeElements = (els: Elements) => {
        const elementsToRecreate = els.map((el) => {
            if (isNode(el)) {
                let action: MenuAction = {
                    id: "",
                    ...el.data["action"],
                };
                // const useGrayscaleIcons = el.data["useGrayscaleIcons"];

                return createComponentFromMenuAction(action, {
                    id: el.id,
                    position: el.position,
                    useGrayscaleIcons,
                    setNodeEdit,
                });
            }
            return el;
        });
        setElements(elementsToRecreate || []);
    };

    const resetTransform = () => reactFlowInstance?.setTransform({ x: 0, y: 0, zoom: 1 });

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

    useEffect(() => {
        const restoreSettings = async () => {
            if (!userId) return;
            
            const settingsContainer = await settingsLocalStorage.get(userId);
            if (!settingsContainer) return;
    
            const { settings } = settingsContainer;
    
            if (settings) {
                setAutoSave(settings.autoSave);
                setUseGrayscaleIcons(settings.useGrayscaleIcons);
            }
        };

        restoreSettings();
    }, [userId]);
    useEffect(() => {
        const saveSettings = async () => {
            if (!userId) return;
            
            settingsLocalStorage.save({
                id: userId,
                settings: {
                    useGrayscaleIcons,
                    autoSave,
                },
            });
        };

        saveSettings();
    }, [autoSave, useGrayscaleIcons]);

    useEffect(() => {
        setMenus(mergeMenus(initialMenus, installedMenus));
    }, [installedMenus]);

    useEffect(() => {
        if (nodeEdit) {
            setElements((els) =>
                els.map((el) => {
                    if (el.id === nodeEdit.id) {
                        el.data = {
                            ...el.data,
                            action: {
                                ...el.data.action,
                                text: nodeEdit.text,
                            },
                        };
                    }
            
                    return el;
                })
            );
        }
    }, [nodeEdit, setElements]);

    useEffect(() => {
        recreateNodeElements(elements);
    }, [useGrayscaleIcons]);

    const { transform } = useZoomPanHelper();
    const saveElements = useCallback(() => {
        if (reactFlowInstance) {
            const id = uuid.v4().toString();
            const flow = reactFlowInstance.toObject();
            const elementsToSave = flow.elements.map((el) => {
                if (isNode(el)) {
                    return {
                        id: el.id,
                        type: el.type,
                        position: el.position,
                        data: {
                            action: el.data["action"],
                            useGrayscaleIcons, // : el.data["useGrayscaleIcons"],
                        },
                    };
                }
                return el;
            });
            flowLocalStorage.save({
                id: designId,
                flow: {
                    ...flow,
                    elements: elementsToSave,
                },
            });

            if (!designId) {
                history.push(`/designs/${id}`);
            }
        }
    }, [reactFlowInstance, designId, useGrayscaleIcons]);
    useEffect(() => {
        const restoreElements = async () => {
            if (!designId) return;
            
            const flowContainer = await flowLocalStorage.get(designId);
            if (!flowContainer) return;

            const { flow } = flowContainer;

            if (flow) {
                const [x = 0, y = 0] = flow.position;
                recreateNodeElements(flow.elements);
                transform({ x, y, zoom: flow.zoom || 0 });
            }
        };
    
        restoreElements();
    }, [transform, designId, useGrayscaleIcons]);

    useEffect(() => {
        if (autoSave) {
            saveElements();
        }
    }, [elements]);

    const handleAutoSaveSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => setAutoSave(event.target.checked);
    const handleUseGrayscaleIconsSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => setUseGrayscaleIcons(event.target.checked);

    const handleMenuDrag = (event/*: DragEvent*/, action: MenuAction) => {
        event.dataTransfer.setData("application/reactflow:action", JSON.stringify(action));
        // const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        // const position = rfInstance.project({
        //     x: event.clientX - reactFlowBounds.left,
        //     y: event.clientY - reactFlowBounds.top,
        // });
        // // event.dataTransfer.setDragImage(event.target, position.x, position.y);
        // event.dataTransfer.setDragImage(document.getElementById(`menu-item-${action.id}`), position.x, position.y);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleOnConnect = (params: Edge | Connection) => {
        const edge: Edge = {
            ...params,
            id: `reactflow__edge-${params.source}${params.sourceHandle}-${params.target}${params.targetHandle}`,
            type: "smoothStepArrowHead",
            arrowHeadType: ArrowHeadType.ArrowClosed,
        }; 
        // edge.data = {
        //     onCancel: () => onElementsRemove([edge]),
        //     text: "wow what a world"
        // };
        setElements((els) => addEdge(edge, els));
    }
    const handleOnDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };
    const handleOnDrop = (event) => {
        event.preventDefault();
    
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const actionStr = event.dataTransfer.getData("application/reactflow:action");
        let action: MenuAction = { id: "" };
        if (actionStr) action = JSON.parse(actionStr);

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
    
        setElements((es) => es.concat(createComponentFromMenuAction(action, { position, useGrayscaleIcons, setNodeEdit })));
    };
    // gets called after end of edge gets dragged to another source or target
    const handleOnEdgeUpdate = (oldEdge: Edge<any>, newConnection: Connection) =>
        setElements((els) => updateEdge(oldEdge, newConnection, els));
    const handleOnElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
    const handleOnLoad = (reactFlowInstance: OnLoadParams) => setReactFlowInstance(reactFlowInstance);
    const handleOnNodeDragStop = (event: React.MouseEvent<Element, MouseEvent>, node: Node<any>) => {
        if (autoSave) saveElements();
    };
  
    return (
        <ReactFlow
            elements={elements}
            id="react-flow__canvas"
            className="react-flow__canvas"
            defaultZoom={1}
            minZoom={0.2}
            maxZoom={4}
            snapToGrid={true}
            snapGrid={[15, 15]}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            key="edges"
            ref={reactFlowWrapper}
            connectionLineComponent={SmoothStepArrowHead}
            connectionLineType={ConnectionLineType.SmoothStep}
            onConnect={handleOnConnect}
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
            onEdgeUpdate={handleOnEdgeUpdate}
            onElementsRemove={handleOnElementsRemove}
            onLoad={handleOnLoad}
            onNodeDragStop={handleOnNodeDragStop}
        >
            <MiniMap
                nodeStrokeColor={(n: Node) => {
                    if (n.style?.background) return n.style.background.toString();
                    if (n.type === 'input') return '#0041d0';
                    if (n.type === 'output') return '#ff0072';
                    if (n.type === 'default') return '#1a192b';

                    return '#000';
                }}
                nodeColor={(n: Node) => {
                    if (n.style?.background) return n.style.background.toString();

                    return '#eee';
                }}
                nodeBorderRadius={2}
            />
            <Controls />
            <Background variant={BackgroundVariant.Dots} color="#aaa" gap={16} />

            <div style={{ position: 'absolute', left: 0, top: 20, zIndex: 4 }}>
                <Menu
                    id="menu-0"
                    anchorElement={anchorElement}
                    setAnchorElement={setAnchorElement}
                    closeContent={<MenuIcon />}
                    openContent={<Close />}
                    items={[{
                        id: "menu-0-save",
                        icon: (<Save />),
                        text: "Save",
                        onClick: () => saveElements(),
                    }, {
                        id: "menu-0-download-as-image",
                        icon: (<CloudDownload />),
                        text: "Download Design as Image",
                        onClick: () => {
                            const node = document.getElementsByClassName("react-flow__renderer")[0];
                            if(!node) return;
    
                            domtoimage.toBlob(node)
                                .then(function (blob) {
                                    saveAs(blob, "design.png");
                                });
                        },
                    }, {
                        id: "menu-0-preview-as-image",
                        icon: (<Image />),
                        text: "Preview Design as Image",
                        onClick: () => {
                            const node = document.getElementsByClassName("react-flow__renderer")[0];
                            if(!node) return;
    
                            domtoimage.toBlob(node)
                                .then(function (blob) {
                                    const link = window.URL.createObjectURL(blob);
                                    // window.location.href = link;
                                    window.open(link, '_blank').focus();
                                });
                        },
                    }, {
                        id: "menu-0-divider-1",
                        isDivider: true,
                    }, {
                        id: "menu-0-manage-menus",
                        icon: (<Settings />),
                        text: "Manage Menus",
                        onClick: () => setInstalledMenus([{
                            id: "companies",
                            text: "Companies",
                            actions: [
                                {
                                    id: 'companies_ms',
                                    text: 'Microsoft',
                                    paths: [{
                                        d: "M 13.355469 36.394531 C 4.902344 50.917969 10.277344 72.957031 19.625 86.320312 C 24.292969 93.003906 29.015625 99 35.488281 99 C 35.609375 99 35.734375 98.996094 35.859375 98.992188 C 38.898438 98.871094 41.09375 97.945312 43.21875 97.050781 C 45.605469 96.042969 48.070312 95.003906 51.941406 95.003906 C 55.621094 95.003906 57.96875 96.011719 60.242188 96.984375 C 62.480469 97.941406 64.785156 98.933594 68.191406 98.871094 C 75.480469 98.738281 79.957031 92.265625 83.90625 86.554688 C 88.027344 80.59375 90.09375 74.808594 90.789062 72.59375 L 90.820312 72.507812 C 90.949219 72.113281 90.761719 71.683594 90.382812 71.511719 C 90.371094 71.507812 90.332031 71.492188 90.324219 71.488281 C 89.039062 70.96875 77.78125 66.023438 77.660156 52.542969 C 77.550781 41.59375 86.109375 35.792969 87.824219 34.742188 L 87.902344 34.695312 C 88.089844 34.574219 88.21875 34.386719 88.261719 34.171875 C 88.308594 33.957031 88.261719 33.734375 88.136719 33.554688 C 82.230469 24.996094 73.179688 23.707031 69.535156 23.554688 C 69.003906 23.5 68.460938 23.472656 67.910156 23.472656 C 63.628906 23.472656 59.53125 25.074219 56.234375 26.359375 C 53.960938 27.25 51.996094 28.015625 50.640625 28.015625 C 49.121094 28.015625 47.144531 27.238281 44.855469 26.339844 C 41.796875 25.140625 38.332031 23.777344 34.660156 23.777344 C 34.574219 23.777344 34.484375 23.777344 34.402344 23.78125 C 25.867188 23.902344 17.800781 28.738281 13.355469 36.394531 Z M 13.355469 36.394531",
                                    }, {
                                        d: "M 69.542969 0 C 64.375 0.210938 58.171875 3.359375 54.46875 7.65625 C 51.320312 11.265625 48.242188 17.289062 49.054688 23.359375 C 49.105469 23.738281 49.414062 24.03125 49.800781 24.0625 C 50.152344 24.089844 50.507812 24.101562 50.859375 24.101562 C 55.914062 24.101562 61.367188 21.335938 65.089844 16.878906 C 69.007812 12.171875 70.988281 6.132812 70.390625 0.722656 C 70.34375 0.300781 69.964844 -0.015625 69.542969 0 Z M 69.542969 0",
                                    }]
                                }
                            ]
                        }, {
                            id: "runtimes",
                            text: "Runtimes",
                            actions: [{
                                id: "runtimes_laptop",
                                text: "Laptop PC",
                                paths: [{
                                    d: "M 92.1875 74.886719 L 92.1875 20.671875 C 92.1875 17.648438 89.734375 15.1875 86.71875 15.1875 L 13.28125 15.1875 C 10.265625 15.1875 7.8125 17.648438 7.8125 20.671875 L 7.8125 74.886719 L 0 74.886719 L 0 78.195312 L 5 84.8125 L 95 84.8125 L 100 78.195312 L 100 74.886719 Z M 14.0625 21.4375 L 85.9375 21.4375 L 85.9375 74.886719 L 14.0625 74.886719 Z M 14.0625 21.4375",
                                }]
                            }],
                        }]),
                    }]}
                />
            </div>
    
            <div style={{ position: 'absolute', left: 70, top: 20, zIndex: 4 }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                {menus.map((menu) => (
                    <Menu
                        key={menu.id}
                        id ={menu.id}
                        anchorElement={anchorElement}
                        setAnchorElement={setAnchorElement}
                        closeContent={menu.text}
                        openContent={menu.text}
                        items={menu.actions.map((action) =>
                            action.isDivider ? ({
                                id: `menu-item-${action.id}`,
                                isDivider: true,
                            }) : ({
                                id: `menu-item-${action.id}`,
                                draggable: true,
                                onDragStart: (event) => handleMenuDrag(event, action),
                                icon: <MenuActionIcon action={action} />,
                                text: action.text,
                                onClick: () => setElements((els) => [
                                    ...els,
                                    createComponentFromMenuAction(action, { useGrayscaleIcons, setNodeEdit }),
                                ]),
                            })
                        )}
                    />
                ))}
                </ButtonGroup>
            </div>

            <div style={{ position: 'absolute', left: 50, bottom: 10, zIndex: 4 }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="outlined" size="small" onClick={resetTransform}>
                        <Restore  fontSize="small" />
                    </Button>
                    <Button variant="outlined" size="small" onClick={() => {
                        layoutElements(graphDirection);
                        setGraphDirection(graphDirection === "LR" ? "TB" : "LR");
                    }}>
                        {graphDirection === "LR" && <ArrowForward fontSize="small" />}
                        {graphDirection === "TB" && <ArrowDownward fontSize="small" />}
                    </Button>
                </ButtonGroup>
            </div>

            <div style={{ position: 'absolute', left: 150, bottom: 10, zIndex: 4 }}>
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={useGrayscaleIcons}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleUseGrayscaleIconsSwitchChange}
                        />
                    }
                    label="use grayscale icons"
                    style={{
                        color: useGrayscaleIcons ? "#1976d2" : "gray"
                    }}
                />
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={autoSave}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleAutoSaveSwitchChange}
                        />
                    }
                    label="auto-save"
                    style={{
                        color: autoSave ? "#1976d2" : "gray"
                    }}
                />
            </div>
        </ReactFlow>
    );
};

export default Canvas;
