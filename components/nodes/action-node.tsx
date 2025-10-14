"use client";

import { Handle, Position } from "reactflow";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Smartphone, Store, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionNodeProps {
  data: {
    label: string;
    action?: string;
    channel?: string;
    timing?: string;
    successRate?: number;
    customerCount?: number;
    pathName?: string;
  };
}

const channelIcons: Record<string, any> = {
  SMS: MessageSquare,
  Email: Mail,
  "Push Notification": Bell,
  "In-App": Smartphone,
  "In-Store": Store,
};

export function ActionNode({ data }: ActionNodeProps) {
  const Icon = data.channel ? channelIcons[data.channel] : null;
  const isPathA = data.pathName?.includes("Tech-Savvy");

  return (
    <div
      className={cn(
        "bg-card border-2 rounded-lg shadow-lg min-w-[240px] max-w-[280px]",
        isPathA ? "border-blue-500" : "border-purple-500"
      )}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      {/* Header with success rate */}
      <div
        className={cn(
          "px-3 py-2 rounded-t-md",
          isPathA ? "bg-blue-500" : "bg-purple-500"
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white text-sm">{data.label}</h3>
          {data.successRate && (
            <Badge variant="secondary" className="bg-white text-xs">
              {data.successRate}% Success
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {data.action && (
          <p className="text-xs text-muted-foreground">{data.action}</p>
        )}

        <div className="flex items-center justify-between text-xs">
          {Icon && data.channel && (
            <div className="flex items-center gap-1 text-primary">
              <Icon className="h-3 w-3" />
              <span className="font-medium">{data.channel}</span>
            </div>
          )}
          {data.timing && (
            <span className="text-muted-foreground">{data.timing}</span>
          )}
        </div>

        {data.customerCount && (
          <div className="text-xs font-semibold text-primary">
            {data.customerCount.toLocaleString()} customers
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
}

export function StartNode({ data }: { data: { label: string; customerCount?: number } }) {
  return (
    <div className="bg-card border-2 border-primary rounded-full shadow-lg px-6 py-4 min-w-[140px] text-center">
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      <h3 className="font-bold text-primary text-sm">{data.label}</h3>
      {data.customerCount && (
        <p className="text-xs text-muted-foreground mt-1">
          {data.customerCount.toLocaleString()} customers
        </p>
      )}
    </div>
  );
}

export function EndNode({ data }: { data: { label: string; customerCount?: number } }) {
  return (
    <div className="bg-primary border-2 border-primary rounded-full shadow-lg px-6 py-4 min-w-[140px] text-center">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <h3 className="font-bold text-primary-foreground text-sm">{data.label}</h3>
      {data.customerCount && (
        <p className="text-xs text-primary-foreground/80 mt-1">
          {data.customerCount.toLocaleString()} customers
        </p>
      )}
    </div>
  );
}
