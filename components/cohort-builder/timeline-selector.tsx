"use client";

import { Timeline } from "@/lib/cohort-types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

interface TimelineSelectorProps {
  timeline: Timeline;
  onUpdate: (timeline: Timeline) => void;
}

export function TimelineSelector({ timeline, onUpdate }: TimelineSelectorProps) {
  const updateDuration = (duration: number) => {
    onUpdate({ ...timeline, duration });
  };

  const updateUnit = (unit: "days" | "weeks" | "months") => {
    onUpdate({ ...timeline, unit });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <Label className="text-base font-semibold">Transformation Timeline</Label>
      </div>
      <p className="text-sm text-muted-foreground">
        How long should customers have to transition from start to end state?
      </p>
      <div className="flex gap-3 items-end">
        <div className="flex-1 space-y-2">
          <Label>Duration</Label>
          <Input
            type="number"
            min="1"
            placeholder="Enter duration"
            value={timeline.duration || ""}
            onChange={(e) => updateDuration(parseInt(e.target.value) || 1)}
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label>Unit</Label>
          <Select value={timeline.unit} onValueChange={updateUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="days">Days</SelectItem>
              <SelectItem value="weeks">Weeks</SelectItem>
              <SelectItem value="months">Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {timeline.duration > 0 && (
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
          <span className="font-medium">Timeline:</span> Customers will have{" "}
          <span className="font-semibold text-primary">
            {timeline.duration} {timeline.unit}
          </span>{" "}
          to complete this transformation.
        </div>
      )}
    </div>
  );
}
