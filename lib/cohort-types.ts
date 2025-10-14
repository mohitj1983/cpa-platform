// Cohort Builder Types - Similar to CleverTap/MoEngage/Amplitude

export type LogicalOperator = "AND" | "OR";

export type PropertyType = "user" | "behavioral" | "transactional";

export type OperatorType =
  | "equals"
  | "not_equals"
  | "greater_than"
  | "less_than"
  | "greater_than_or_equal"
  | "less_than_or_equal"
  | "between"
  | "is_one_of"
  | "is_not_one_of"
  | "contains"
  | "not_contains"
  | "is_true"
  | "is_false"
  | "is_set"
  | "is_not_set"
  | "in_last_days"
  | "before_date"
  | "after_date";

export interface Rule {
  id: string;
  property: string;
  operator: OperatorType;
  value: string | number | string[] | boolean | null;
  propertyType: PropertyType;
}

export interface RuleGroup {
  id: string;
  operator: LogicalOperator;
  rules: Rule[];
  groups: RuleGroup[];
}

export interface Timeline {
  duration: number;
  unit: "days" | "weeks" | "months";
}

export interface CohortDefinition {
  name: string;
  description: string;
  startAudience: RuleGroup;
  endAudience: RuleGroup;
  timeline: Timeline;
}

export interface PropertyDefinition {
  key: string;
  label: string;
  type: PropertyType;
  valueType: "string" | "number" | "boolean" | "date" | "multi_select";
  operators: OperatorType[];
  options?: string[]; // For dropdowns
  placeholder?: string;
}

export interface CohortPreview {
  startAudienceCount: number;
  endAudienceCount: number;
  estimatedConversionRate: number;
  estimatedValue: number;
}
