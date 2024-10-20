"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  NodeTypes,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { INodeTypeEnum, IPayload } from "@/utils/interface";
import DialogComponent from "./dialogComponent";
import { InputNode } from "./inputNode";
import { OutputNode } from "./outputNode";
import { MixerNode } from "./mixerNode";

export type FlowBuilderProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

/**
 * The ReactFlow component.
 * @param {FlowBuilderProps} props
 * @returns The ReactFlow JSX.Element.
 */
export const FlowBuilder = ({
  initialNodes,
  initialEdges,
}: FlowBuilderProps) => {
  /**
   * The state of all the nodes in the flow.
   * `nodes` is the current nodes, `setNodes` is the function to update the nodes and `onNodesChange` is the callback when the nodes change.
   */
  const [nodes, , onNodesChange] = useNodesState(initialNodes);

  /**
   * The state of all the edges in the flow.
   * `edges` is the current edges, `setEdges` is the function to update the edges and `onEdgesChange` is the callback when the edges change.
   */
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  /**
   * The reference to the dialog.
   */
  const dialogRef = useRef<HTMLDialogElement>(null);

  /**
   * The payload of the node to be edited or the new node to be created.
   * If `payload` is `null`, no node is being edited or created.
   */
  const [payload, setPayload] = useState<Partial<IPayload> | null>(null);

  /**
   * The screen to flow position function.
   */
  const { screenToFlowPosition } = useReactFlow();

  /**
   * The callback when a connection is made.
   * It adds the new edge to the edges state.
   * @param params The connection parameters.
   */
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  /**
   * The callback when the escape key is pressed.
   * It closes the dialog and sets the payload to null.
   * @param event The key event.
   */
  const onEscapeHandler = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      dialogRef.current?.close();
      setPayload(null);
    }
  }; // escapeHandler

  /**
   * The effect to add the escape key event listener.
   */
  useEffect(() => {
    document.addEventListener("keyup", onEscapeHandler);

    return () => {
      document.removeEventListener("keyup", onEscapeHandler);
    };
  }, []);

  /**
   * The effect to show the dialog when the payload is not null.
   */
  useEffect(() => {
    if (!payload) {
      return;
    }

    dialogRef.current?.showModal();
  }, [payload]);

  /**
   * The callback when a node is dropped.
   * It sets the payload to a new node with the type and position of the dropped node.
   * @param evt The drop event.
   */
  const onDrop = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();

      setPayload({
        position: screenToFlowPosition({
          x: evt.clientX,
          y: evt.clientY,
        }),
        type: evt.dataTransfer.getData("widgetType") as INodeTypeEnum,
        isEdit: false,
      });
    },
    [setPayload, screenToFlowPosition],
  );

  /**
   * The callback when a node is double clicked.
   * It sets the payload to the node with its id, type, position, color and label.
   * @param event The double click event.
   * @param node The node.
   */
  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const { data } = node;

      setPayload({
        id: node.id,
        type: node.type as INodeTypeEnum,
        position: node.position,
        color: data?.color as string,
        label: data.label as string,
        isEdit: true,
      });
    },
    [setPayload],
  );

  /**
   * The callback when a node is dragged over.
   * It prevents the default behavior.
   * @param event The drag over event.
   */
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  /**
   * The callback to close the dialog.
   * It sets the payload to null and closes the dialog.
   * @param event The close event.
   */
  const closeModalHandler = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault();
    }
    dialogRef.current?.close();
    setPayload(null);
  };

  /**
   * The node types.
   */
  const nodeTypes = {
    inputNode: InputNode,
    outputNode: OutputNode,
    mixerNode: MixerNode,
  } as unknown as NodeTypes;

  return (
    <>
      <DialogComponent
        ref={dialogRef}
        payload={payload}
        nodes={nodes}
        closeModalHandler={closeModalHandler}
      />
      <ReactFlow
        edges={edges}
        nodes={nodes}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
};
