"use client";

import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  ConnectionMode,
} from "reactflow";
import "reactflow/dist/style.css";

import { ActionNode, StartNode, EndNode } from "./nodes/action-node";
import { Badge } from "./ui/badge";

interface JourneyFlowChartProps {
  nodes: Node[];
  edges: Edge[];
}

const nodeTypes = {
  action: ActionNode,
  start: StartNode,
  end: EndNode,
};

export function JourneyFlowChart({ nodes, edges }: JourneyFlowChartProps) {
  const onInit = useCallback((reactFlowInstance: { fitView: (options: { padding: number }) => void }) => {
    // Fit view on initial load
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.2 });
    }, 50);
  }, []);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-500/10" />
          <span className="text-sm font-medium">Tech-Savvy Path (60%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-purple-500 bg-purple-500/10" />
          <span className="text-sm font-medium">Traditional Path (40%)</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Badge variant="outline">Multiple journey paths based on customer behavior</Badge>
        </div>
      </div>

      {/* React Flow Chart */}
      <div className="h-[600px] bg-muted/30 rounded-lg border border-border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onInit={onInit}
          connectionMode={ConnectionMode.Strict}
          fitView
          attributionPosition="bottom-left"
          minZoom={0.5}
          maxZoom={1.5}
          defaultEdgeOptions={{
            animated: true,
            style: { strokeWidth: 2 },
          }}
        >
          <Background className="bg-background" gap={16} />
          <Controls className="bg-card border border-border" />
          <MiniMap
            className="bg-card border border-border"
            nodeColor={(node) => {
              if (node.type === "start") return "hsl(var(--primary))";
              if (node.type === "end") return "hsl(var(--primary))";
              // Check if it's path A or B based on node data
              const nodeData = node.data as { pathName?: string };
              const isPathA = nodeData?.pathName?.includes("Tech-Savvy");
              return isPathA ? "#3b82f6" : "#8b5cf6";
            }}
          />
        </ReactFlow>
      </div>

      {/* Instructions */}
      <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
        <p>
          <strong>How to use:</strong> Use mouse wheel to zoom, click and drag to pan.
          Each path shows different customer journeys with success rates at each step.
        </p>
      </div>
    </div>
  );
}
