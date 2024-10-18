'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { CreateNodeForm } from './createNode';
import { INodeTypeEnum, IPayload } from '@/utils/interface';
import clsx from 'clsx';
import { EditNodeForm } from './editNodeForm';
import DialogComponent from './dialogComponent';

export type FlowBuilderProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

export const FlowBuilder = ({
  initialNodes,
  initialEdges,
}: FlowBuilderProps) => {
  const [nodes, setNode, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [payload, setPayload] = useState<Partial<IPayload> | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (!payload) {
      return;
    }

    dialogRef.current?.showModal();
  }, [payload]);

  const onDrop = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();

      setPayload({
        position: screenToFlowPosition({
          x: evt.clientX,
          y: evt.clientY,
        }),
        type: evt.dataTransfer.getData('widgetType') as INodeTypeEnum,
        isEdit: false,
      });
    },
    [setPayload, screenToFlowPosition]
  );

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
    [setPayload]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const closeModalHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dialogRef.current?.close();
    setPayload(null);
  };

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
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
};
