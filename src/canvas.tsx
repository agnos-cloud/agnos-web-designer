import React, { useEffect, useState } from "react";
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
} from "react-flow-renderer";
import { Fab, Action } from "react-tiny-fab";
import { Add, AddShoppingCart, CloudDownload, Image, MenuOpen, Save } from "@material-ui/icons";
import { Button, ButtonGroup, Menu as MenuUI, MenuItem as MenuItemUI, ListItemIcon, ListItemText } from "@mui/material";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import uuid from "react-native-uuid";
import { Menu } from "./menus";
import { nodeTypes } from "./nodes";
// import { Divider, Button as B, MenuItem as MM } from "@material-ui/core";

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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

    const open = (menuId: string) => anchorEl ? anchorEl.id === `button-${menuId}` : false;
    const handleMenuClose = () => setAnchorEl(null);

    const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params: Edge | Connection) => setElements((els) => addEdge(params, els));
    const onLoad = (reactFlowInstance: OnLoadParams) => setRfInstance(reactFlowInstance);
  
    const logToObject = () => console.log(rfInstance?.toObject());
    const resetTransform = () => rfInstance?.setTransform({ x: 0, y: 0, zoom: 1 });
  
    return (
        <ReactFlow
            elements={elements}
            id="react-flow__canvas"
            className="react-flow__canvas"
            defaultZoom={1.5}
            minZoom={0.2}
            maxZoom={4}
            snapToGrid={true} // TODO: expose as settings
            snapGrid={[15, 15]}
            nodeTypes={nodeTypes}
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

            <Fab
                icon={<Add />}
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
                    text="Preview Image"
                    onClick={() => {
                        const node = document.getElementsByClassName("react-flow__renderer")[0];
                        if(!node) return;

                        domtoimage.toBlob(node)
                            .then(function (blob) {
                                const link = window.URL.createObjectURL(blob);
                                // window.location.href = link;
                                window.open(link, '_blank').focus();
                            });
                    }}
                >
                    <Image />
                </Action>
                <Action
                    style={actionButtonStyles}
                    text="Download as PNG"
                    onClick={() => {
                        const node = document.getElementsByClassName("react-flow__renderer")[0];
                        if(!node) return;

                        domtoimage.toBlob(node)
                            .then(function (blob) {
                                saveAs(blob, "design.png");
                            });
                    }}
                >
                    <CloudDownload />
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
    
            <div style={{ position: 'absolute', left: 70, top: 20, zIndex: 4 }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                {menus.map((menu) => (
                    <React.Fragment key={menu.id}>
                        <Button
                            id={`button-${menu.id}`}
                            aria-controls={`menu-${menu.id}`}
                            aria-haspopup="true"
                            aria-expanded={open(menu.id) ? "true" : undefined}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
                        >
                            {menu.text}
                        </Button>
                        <MenuUI
                            id={`menu-${menu.id}`}
                            anchorEl={anchorEl}
                            open={open(menu.id)}
                            onClose={handleMenuClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            {menu.actions.map((action) => (
                                <MenuItemUI
                                    key={action.id}
                                    onClick={
                                        () => {
                                            setAnchorEl(null);
                                            setElements(
                                                (els) => [
                                                    ...els,
                                                    {
                                                        id: uuid.v4().toString(),
                                                        type: "component",
                                                        position: {
                                                            x: 10,
                                                            y: 50
                                                        },
                                                        data: {
                                                            label: (
                                                              <>
                                                                {action.image && (<img src={action.image} width="98" height="98" style={{pointerEvents: "none"}} />)}
                                                                {action.paths && action.paths.length && (
                                                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 98 98" style={{pointerEvents: "none"}}>
                                                                        <g transform="scale(0.98)">
                                                                            {action.paths.map((path, index) => (
                                                                                <path
                                                                                    key={index}
                                                                                    d={path.d}
                                                                                    // fill={path.fill || "black"}
                                                                                    fill={path.fill}
                                                                                    // stroke={path.stroke || "black"}
                                                                                    stroke={path.stroke}
                                                                                    transform={path.transform}
                                                                                    // style={CssString(path.style || "")} // TODO: catch malformed strings
                                                                                />
                                                                            ))}
                                                                        </g>
                                                                    </svg>
                                                                )}
                                                              </>
                                                            ),
                                                            alt: action.text,
                                                          },
                                                    }
                                                ]
                                            );
                                        }
                                    }
                                >
                                    <ListItemIcon>
                                        {action.image && (<img src={action.image} width="18" />)}
                                        {action.paths && action.paths.length && (
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                <g transform="scale(0.18)">
                                                    {action.paths.map((path, index) => (
                                                        <path
                                                            key={index}
                                                            d={path.d}
                                                            // fill={path.fill || "black"}
                                                            fill={path.fill}
                                                            // stroke={path.stroke || "black"}
                                                            stroke={path.stroke}
                                                            transform={path.transform}
                                                            // style={CssString(path.style || "")} // TODO: catch malformed strings
                                                        />
                                                    ))}
                                                </g>
                                            </svg>
                                        )}
                                    </ListItemIcon>
                                    <ListItemText>{action.text}</ListItemText>
                                </MenuItemUI>
                            ))}
                        </MenuUI>
                    </React.Fragment>
                ))}
                </ButtonGroup>
            </div>

            <div style={{ position: 'absolute', left: 50, bottom: 10, zIndex: 4 }}>
            <button onClick={resetTransform}>
                reset
            </button>
            {/* <button onClick={logToObject}>toObject</button> */}
            </div>
        </ReactFlow>
    );
};

function CssString(str: string) {
    const css_json = `{"${str
      .replace(/; /g, '", "')
      .replace(/: /g, '": "')
      .replace(";", "")}"}`;
  
    const obj = JSON.parse(css_json);
  
    const keyValues = Object.keys(obj).map((key) => {
      var camelCased = key.replace(/-[a-z]/g, (g) => g[1].toUpperCase());
      return { [camelCased]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}
  
export default Canvas;
