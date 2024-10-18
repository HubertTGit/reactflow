import { promises as fs } from 'fs';
import { FlowBuilder } from '../ui/flowBuilder';
import { Edge, Node, ReactFlowProvider } from '@xyflow/react';
import { NodeSelector } from '@/ui/nodeSelector';
import { nodespath, edgespath } from '@/utils/constant';

export default async function Home() {
  const nodesData = await fs.readFile(nodespath, 'utf-8');
  const edgesData = await fs.readFile(edgespath, 'utf-8');
  const nodesParsed = JSON.parse(nodesData) satisfies Node[];
  const edgesParsed = JSON.parse(edgesData) satisfies Edge[];

  return (
    <>
      <main className="grid grid-cols-10 h-screen w-screen">
        <div className="col-span-9">
          <ReactFlowProvider>
            <FlowBuilder
              initialNodes={nodesParsed}
              initialEdges={edgesParsed}
            />
          </ReactFlowProvider>
        </div>

        <NodeSelector />
      </main>
    </>
  );
}
