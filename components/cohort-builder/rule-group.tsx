"use client";

import { useCallback } from "react";
import { RuleGroup as RuleGroupType, Rule, LogicalOperator } from "@/lib/cohort-types";
import { RuleRow } from "./rule-row";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface RuleGroupProps {
  group: RuleGroupType;
  onUpdate: (group: RuleGroupType) => void;
  onRemove?: () => void;
  canRemove?: boolean;
  depth?: number;
}

export function RuleGroup({ group, onUpdate, onRemove, canRemove = false, depth = 0 }: RuleGroupProps) {
  // Update operator (AND/OR)
  const updateOperator = (operator: LogicalOperator) => {
    onUpdate({ ...group, operator });
  };

  // Add a new rule
  const addRule = () => {
    const newRule: Rule = {
      id: `rule-${Date.now()}-${Math.random()}`,
      property: "",
      operator: "equals",
      value: null,
      propertyType: "user",
    };
    onUpdate({ ...group, rules: [...group.rules, newRule] });
  };

  // Update a specific rule (memoized to prevent re-renders)
  const updateRule = useCallback((ruleId: string, field: keyof Rule, value: string | number | string[] | boolean | null) => {
    onUpdate({
      ...group,
      rules: group.rules.map((r) =>
        r.id === ruleId ? { ...r, [field]: value } : r
      ),
    });
  }, [group, onUpdate]);

  // Remove a rule
  const removeRule = (ruleId: string) => {
    onUpdate({
      ...group,
      rules: group.rules.filter((r) => r.id !== ruleId),
    });
  };

  // Add a nested group
  const addGroup = () => {
    const newGroup: RuleGroupType = {
      id: `group-${Date.now()}-${Math.random()}`,
      operator: "AND",
      rules: [
        {
          id: `rule-${Date.now()}-${Math.random()}`,
          property: "",
          operator: "equals",
          value: null,
          propertyType: "user",
        },
      ],
      groups: [],
    };
    onUpdate({ ...group, groups: [...group.groups, newGroup] });
  };

  // Update a nested group
  const updateNestedGroup = (groupId: string, updatedGroup: RuleGroupType) => {
    onUpdate({
      ...group,
      groups: group.groups.map((g) => (g.id === groupId ? updatedGroup : g)),
    });
  };

  // Remove a nested group
  const removeNestedGroup = (groupId: string) => {
    onUpdate({
      ...group,
      groups: group.groups.filter((g) => g.id !== groupId),
    });
  };

  const canRemoveRule = group.rules.length > 1;

  return (
    <Card
      className={cn(
        "border-l-4 transition-colors",
        depth === 0 && "border-l-primary",
        depth === 1 && "border-l-blue-400",
        depth === 2 && "border-l-purple-400",
        depth >= 3 && "border-l-pink-400"
      )}
    >
      <CardContent className="p-4 space-y-4">
        {/* Header with operator selector and remove button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Match</span>
            <Select value={group.operator} onValueChange={updateOperator}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">ALL</SelectItem>
                <SelectItem value="OR">ANY</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">of the following rules:</span>
          </div>
          {canRemove && onRemove && (
            <Button variant="ghost" size="icon" onClick={onRemove}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>

        {/* Rules */}
        <div className="space-y-3">
          {group.rules.map((rule) => {
            // Create stable callbacks for this specific rule
            const handleUpdate = (field: keyof Rule, value: string | number | string[] | boolean | null) => {
              updateRule(rule.id, field, value);
            };
            const handleRemove = () => {
              removeRule(rule.id);
            };

            return (
              <RuleRow
                key={rule.id}
                rule={rule}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
                canRemove={canRemoveRule}
              />
            );
          })}
        </div>

        {/* Nested Groups */}
        {group.groups.length > 0 && (
          <div className="space-y-3 pl-4">
            {group.groups.map((nestedGroup) => (
              <RuleGroup
                key={nestedGroup.id}
                group={nestedGroup}
                onUpdate={(updatedGroup) => updateNestedGroup(nestedGroup.id, updatedGroup)}
                onRemove={() => removeNestedGroup(nestedGroup.id)}
                canRemove={true}
                depth={depth + 1}
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={addRule} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Rule
          </Button>
          {depth < 3 && (
            <Button variant="outline" onClick={addGroup} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Group ({group.operator})
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
