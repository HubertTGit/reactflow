import { FlowBuilder } from "../ui/flowBuilder";
import { ReactFlowProvider } from "@xyflow/react";
import { NodeSelector } from "@/ui/nodeSelector";
import { getNodes, getEdges } from "@/lib/db";
import DialogComponent from "../ui/dialogComponent";

export default async function Home() {
  const nodes = await getNodes();
  const edges = await getEdges();

  return (
    <>
      <main className="grid h-screen w-screen grid-cols-10">
        <ReactFlowProvider>
          <div className="col-span-9">
            <FlowBuilder initialNodes={nodes} initialEdges={edges} />
          </div>
          <NodeSelector />
        </ReactFlowProvider>
      </main>
    </>
  );
}
