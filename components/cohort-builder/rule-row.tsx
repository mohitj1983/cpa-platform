"use client";

import { useCallback, useMemo, memo } from "react";
import { Rule, OperatorType } from "@/lib/cohort-types";
import { COHORT_PROPERTIES, OPERATOR_LABELS, getPropertyDefinition, getAvailableOperators } from "@/lib/cohort-properties";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface RuleRowProps {
  rule: Rule;
  onUpdate: (field: keyof Rule, value: string | number | string[] | boolean | null) => void;
  onRemove: () => void;
  canRemove: boolean;
}

function RuleRowComponent({ rule, onUpdate, onRemove, canRemove }: RuleRowProps) {
  const property = getPropertyDefinition(rule.property);
  const operators = getAvailableOperators(rule.property);

  // Group properties by type for better UX (memoized to avoid recreation)
  const userProperties = useMemo(() => COHORT_PROPERTIES.filter(p => p.type === "user"), []);
  const behavioralProperties = useMemo(() => COHORT_PROPERTIES.filter(p => p.type === "behavioral"), []);
  const transactionalProperties = useMemo(() => COHORT_PROPERTIES.filter(p => p.type === "transactional"), []);

  // Handle property change - reset operator and value
  const handlePropertyChange = useCallback((propertyKey: string) => {
    const newProperty = getPropertyDefinition(propertyKey);
    onUpdate("property", propertyKey);
    onUpdate("propertyType", newProperty?.type || "user");
    onUpdate("operator", "");
    onUpdate("value", null);
  }, [onUpdate]);

  // Render value input based on property type
  const renderValueInput = () => {
    if (!property) return null;

    switch (property.valueType) {
      case "boolean":
        return (
          <div className="flex items-center space-x-2 h-10">
            <Checkbox
              id={`${rule.id}-checkbox`}
              checked={rule.value === true}
              onCheckedChange={(checked) => onUpdate("value", checked)}
            />
            <Label htmlFor={`${rule.id}-checkbox`} className="cursor-pointer">
              {rule.operator === "is_true" ? "True" : "False"}
            </Label>
          </div>
        );

      case "number":
        if (rule.operator === "between") {
          return (
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={Array.isArray(rule.value) ? rule.value[0] : ""}
                onChange={(e) => {
                  const min = e.target.value;
                  const max = Array.isArray(rule.value) ? rule.value[1] : "";
                  onUpdate("value", [min, max]);
                }}
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={Array.isArray(rule.value) ? rule.value[1] : ""}
                onChange={(e) => {
                  const min = Array.isArray(rule.value) ? rule.value[0] : "";
                  const max = e.target.value;
                  onUpdate("value", [min, max]);
                }}
              />
            </div>
          );
        }
        return (
          <Input
            type="number"
            placeholder={property.placeholder || "Enter number"}
            value={rule.value as number || ""}
            onChange={(e) => onUpdate("value", parseFloat(e.target.value) || null)}
          />
        );

      case "date":
        if (rule.operator === "in_last_days") {
          return (
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Days"
                value={rule.value as number || ""}
                onChange={(e) => onUpdate("value", parseInt(e.target.value) || null)}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          );
        }
        return (
          <Input
            type="date"
            value={rule.value as string || ""}
            onChange={(e) => onUpdate("value", e.target.value)}
          />
        );

      case "multi_select":
        if (rule.operator === "is_one_of" || rule.operator === "is_not_one_of") {
          // For multi-select, show checkboxes or a multi-select component
          // For simplicity, using a select with multiple
          return (
            <Select
              value={Array.isArray(rule.value) ? rule.value[0] : (rule.value as string) || ""}
              onValueChange={(value) => onUpdate("value", [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select value" />
              </SelectTrigger>
              <SelectContent>
                {property.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }
        return (
          <Select
            value={rule.value as string || ""}
            onValueChange={(value) => onUpdate("value", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
              {property.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "string":
      default:
        return (
          <Input
            type="text"
            placeholder={property.placeholder || "Enter value"}
            value={rule.value as string || ""}
            onChange={(e) => onUpdate("value", e.target.value)}
          />
        );
    }
  };

  return (
    <div className="flex gap-2 items-end">
      {/* Property Selector */}
      <div className="flex-1 space-y-2">
        <Label>Property</Label>
        <Select value={rule.property} onValueChange={handlePropertyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select property" />
          </SelectTrigger>
          <SelectContent>
            {COHORT_PROPERTIES.map((prop) => (
              <SelectItem key={prop.key} value={prop.key}>
                {prop.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Operator Selector */}
      <div className="flex-1 space-y-2">
        <Label>Operator</Label>
        <Select
          value={rule.operator}
          onValueChange={(value) => onUpdate("operator", value as OperatorType)}
          disabled={!rule.property}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {operators.map((op) => (
              <SelectItem key={op} value={op}>
                {OPERATOR_LABELS[op]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Value Input */}
      <div className="flex-1 space-y-2">
        <Label>Value</Label>
        {renderValueInput()}
      </div>

      {/* Remove Button */}
      {canRemove && (
        <Button
          variant="outline"
          size="icon"
          onClick={onRemove}
          className="flex-shrink-0"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      )}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders when parent updates
export const RuleRow = memo(RuleRowComponent, (prevProps, nextProps) => {
  // Only re-render if the rule object or canRemove flag actually changed
  return (
    prevProps.rule === nextProps.rule &&
    prevProps.canRemove === nextProps.canRemove
  );
});
