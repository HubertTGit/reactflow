import { promises as fs } from 'fs';
import { FlowBuilder } from '../components/flowBuilder';
import { Edge, Node } from '@xyflow/react';

const nodespath = process.cwd() + '/app/nodes.json';
const edgespath = process.cwd() + '/app/edges.json';

export default async function Home() {
  const nodesData = await fs.readFile(nodespath, 'utf-8');
  const edgesData = await fs.readFile(edgespath, 'utf-8');
  const nodesParsed = JSON.parse(nodesData) satisfies Node[];
  const edgesParsed = JSON.parse(edgesData) satisfies Edge[];

  return (
    <main className="w-screen h-screen">
      <FlowBuilder initialNodes={nodesParsed} initialEdges={edgesParsed} />
    </main>
  );
}
