import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import uuid from "react-native-uuid";
import dagre from "dagre";
import {
  Elements,
  isNode,
  OnLoadParams,
  Position,
  useZoomPanHelper,
} from "react-flow-renderer";
import { FlowLocalStorage } from "../data/local";
import { MenuAction } from "../menu-definitions";
import { createComponentFromMenuAction } from "../utils/component";

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

export function useFlow(
  designId: string,
  initialElements: Elements<any>,
  autoSave: boolean,
  useGrayscaleIcons: boolean
) {
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

  return {
    elements,
    nodeEdit,
    reactFlowInstance,
    reactFlowWrapper,
    layoutElements,
    saveElements,
    setElements,
    setNodeEdit,
    setReactFlowInstance,
  } as const;
}
