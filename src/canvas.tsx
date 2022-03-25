import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
import {
  ArrowDownward,
  ArrowForward,
  Close,
  CloudDownload,
  Image,
  Menu as MenuIcon,
  Restore,
  Save,
  Settings,
} from "@material-ui/icons";
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
import { FlowLocalStorage } from "./data/local";
import ManageMenusDialog from "./components/manage-menus-dialog";
import { useMenus, useSettings } from "./hooks";

const flowLocalStorage = new FlowLocalStorage();

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
};

const Canvas = (props: CanvasPropType) => {
  const {
    elements: initialElements,
    menus: initialMenus,
    designId,
    userId,
  } = props;
  const history = useHistory();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<OnLoadParams | null>(null);
  const [elements, setElements] = useState<Elements>(
    getLayoutedElements(initialElements)
  );
  const [nodeEdit, setNodeEdit] = useState<{ id: string; text: string } | null>(
    null
  );
  const [autoSave, setAutoSave, useGrayscaleIcons, setUseGrayscaleIcons] =
    useSettings(userId);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [openMenuDialog, setOpenMenuDialog] = React.useState(false);
  const [graphDirection, setGraphDirection] = useState<"LR" | "TB">("TB");
  const [menus, setMenus, installedMenus, setInstalledMenus] = useMenus(
    userId,
    initialMenus
  );

  const layoutElements = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);
      setElements(layoutedElements);
    },
    [elements]
  );

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

  const resetTransform = () =>
    reactFlowInstance?.setTransform({ x: 0, y: 0, zoom: 1 });

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.height = "98vh";
    body.style.width = "98vw";

    const main = document.getElementsByTagName("main")[0];
    main.style.height = "100%";
    main.style.width = "100%";

    const application = document.getElementById(
      "single-spa-application:@agnos/agnos-web-designer"
    );
    application.style.height = "100%";
    application.style.width = "100%";
  }, []);

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
        id: !designId || designId === "+" ? id : designId,
        flow: {
          ...flow,
          elements: elementsToSave,
        },
      });

      if (!designId || designId === "+") {
        history.push(`/designs/${id}`);
      }
    }
  }, [reactFlowInstance, designId, useGrayscaleIcons]);
  useEffect(() => {
    const restoreElements = async () => {
      if (!designId || designId === "+") return;

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

  const handleAutoSaveSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setAutoSave(event.target.checked);
  const handleUseGrayscaleIconsSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setUseGrayscaleIcons(event.target.checked);

  const handleMenuDrag = (event /*: DragEvent*/, action: MenuAction) => {
    event.dataTransfer.setData(
      "application/reactflow:action",
      JSON.stringify(action)
    );
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
  };
  const handleOnDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const handleOnDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const actionStr = event.dataTransfer.getData(
      "application/reactflow:action"
    );
    let action: MenuAction = { id: "" };
    if (actionStr) action = JSON.parse(actionStr);

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    setElements((es) =>
      es.concat(
        createComponentFromMenuAction(action, {
          position,
          useGrayscaleIcons,
          setNodeEdit,
        })
      )
    );
  };
  // gets called after end of edge gets dragged to another source or target
  const handleOnEdgeUpdate = (oldEdge: Edge<any>, newConnection: Connection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  const handleOnElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const handleOnLoad = (reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(reactFlowInstance);
  const handleOnNodeDragStop = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node<any>
  ) => {
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
          if (n.type === "input") return "#0041d0";
          if (n.type === "output") return "#ff0072";
          if (n.type === "default") return "#1a192b";

          return "#000";
        }}
        nodeColor={(n: Node) => {
          if (n.style?.background) return n.style.background.toString();

          return "#eee";
        }}
        nodeBorderRadius={2}
      />
      <Controls style={{ position: "absolute", left: 80 }} />
      <Background variant={BackgroundVariant.Dots} color="#aaa" gap={16} />

      <div style={{ position: "absolute", left: 60, top: 80, zIndex: 4 }}>
        <Menu
          id="menu-0"
          anchorElement={anchorElement}
          setAnchorElement={setAnchorElement}
          closeContent={<MenuIcon />}
          openContent={<Close />}
          items={[
            {
              id: "menu-0-save",
              icon: <Save />,
              text: "Save",
              onClick: () => saveElements(),
            },
            {
              id: "menu-0-download-as-image",
              icon: <CloudDownload />,
              text: "Download Design as Image",
              onClick: () => {
                const node = document.getElementsByClassName(
                  "react-flow__renderer"
                )[0];
                if (!node) return;

                domtoimage.toBlob(node).then(function (blob) {
                  saveAs(blob, "design.png");
                });
              },
            },
            {
              id: "menu-0-preview-as-image",
              icon: <Image />,
              text: "Preview Design as Image",
              onClick: () => {
                const node = document.getElementsByClassName(
                  "react-flow__renderer"
                )[0];
                if (!node) return;

                domtoimage.toBlob(node).then(function (blob) {
                  const link = window.URL.createObjectURL(blob);
                  // window.location.href = link;
                  window.open(link, "_blank").focus();
                });
              },
            },
            {
              id: "menu-0-divider-1",
              isDivider: true,
            },
            {
              id: "menu-0-manage-menus",
              icon: <Settings />,
              text: "Manage Menus",
              onClick: () => setOpenMenuDialog(true),
            },
          ]}
        />
      </div>

      <div style={{ position: "absolute", left: 130, top: 80, zIndex: 4 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {menus.map((menu) => (
            <Menu
              key={menu.id}
              id={menu.id}
              anchorElement={anchorElement}
              setAnchorElement={setAnchorElement}
              closeContent={menu.text}
              openContent={menu.text}
              items={menu.actions.map((action) =>
                action.isDivider
                  ? {
                      id: `menu-item-${action.id}`,
                      isDivider: true,
                    }
                  : {
                      id: `menu-item-${action.id}`,
                      draggable: true,
                      onDragStart: (event) => handleMenuDrag(event, action),
                      icon: <MenuActionIcon action={action} />,
                      text: action.text,
                      onClick: () =>
                        setElements((els) => [
                          ...els,
                          createComponentFromMenuAction(action, {
                            useGrayscaleIcons,
                            setNodeEdit,
                          }),
                        ]),
                    }
              )}
            />
          ))}
        </ButtonGroup>
      </div>

      <ManageMenusDialog
        open={openMenuDialog}
        onClose={() => setOpenMenuDialog(false)}
        menus={installedMenus}
        setInstalledMenus={setInstalledMenus}
      />

      <div style={{ position: "absolute", left: 120, bottom: 10, zIndex: 4 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button variant="outlined" size="small" onClick={resetTransform}>
            <Restore fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              layoutElements(graphDirection);
              setGraphDirection(graphDirection === "LR" ? "TB" : "LR");
            }}
          >
            {graphDirection === "LR" && <ArrowForward fontSize="small" />}
            {graphDirection === "TB" && <ArrowDownward fontSize="small" />}
          </Button>
        </ButtonGroup>
      </div>

      <div style={{ position: "absolute", left: 220, bottom: 10, zIndex: 4 }}>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={useGrayscaleIcons}
              inputProps={{ "aria-label": "controlled" }}
              onChange={handleUseGrayscaleIconsSwitchChange}
            />
          }
          label="use grayscale icons"
          style={{
            color: useGrayscaleIcons ? "#1976d2" : "gray",
          }}
        />
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={autoSave}
              inputProps={{ "aria-label": "controlled" }}
              onChange={handleAutoSaveSwitchChange}
            />
          }
          label="auto-save"
          style={{
            color: autoSave ? "#1976d2" : "gray",
          }}
        />
      </div>
    </ReactFlow>
  );
};

export default Canvas;
