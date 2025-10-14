import { PropertyDefinition } from "./cohort-types";

export const COHORT_PROPERTIES: PropertyDefinition[] = [
  // User Properties
  {
    key: "channel_preference",
    label: "Channel Preference",
    type: "user",
    valueType: "multi_select",
    operators: ["equals", "not_equals", "is_one_of", "is_not_one_of"],
    options: ["Online", "Offline", "Both"],
  },
  {
    key: "vip_status",
    label: "VIP Status",
    type: "user",
    valueType: "boolean",
    operators: ["is_true", "is_false"],
  },
  {
    key: "customer_segment",
    label: "Customer Segment",
    type: "user",
    valueType: "multi_select",
    operators: ["equals", "is_one_of", "is_not_one_of"],
    options: ["Premium", "Regular", "New", "At-Risk", "Churned"],
  },
  {
    key: "city",
    label: "City",
    type: "user",
    valueType: "multi_select",
    operators: ["equals", "is_one_of", "is_not_one_of"],
    options: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"],
  },
  {
    key: "registration_date",
    label: "Registration Date",
    type: "user",
    valueType: "date",
    operators: ["before_date", "after_date", "in_last_days"],
  },
  {
    key: "loyalty_member",
    label: "Loyalty Program Member",
    type: "user",
    valueType: "boolean",
    operators: ["is_true", "is_false"],
  },

  // Behavioral Properties
  {
    key: "online_orders",
    label: "Online Orders Count",
    type: "behavioral",
    valueType: "number",
    operators: ["equals", "not_equals", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal", "between"],
    placeholder: "Enter number",
  },
  {
    key: "offline_orders",
    label: "Offline Orders Count",
    type: "behavioral",
    valueType: "number",
    operators: ["equals", "not_equals", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal", "between"],
    placeholder: "Enter number",
  },
  {
    key: "last_purchase_date",
    label: "Last Purchase Date",
    type: "behavioral",
    valueType: "date",
    operators: ["in_last_days", "before_date", "after_date"],
  },
  {
    key: "last_purchase_channel",
    label: "Last Purchase Channel",
    type: "behavioral",
    valueType: "multi_select",
    operators: ["equals", "is_one_of"],
    options: ["Online", "Store", "App", "Phone"],
  },
  {
    key: "active_days",
    label: "Active Days (Last 90 Days)",
    type: "behavioral",
    valueType: "number",
    operators: ["greater_than", "less_than", "between"],
    placeholder: "Enter number of days",
  },
  {
    key: "product_categories_purchased",
    label: "Product Categories Purchased",
    type: "behavioral",
    valueType: "number",
    operators: ["equals", "greater_than", "less_than"],
    placeholder: "Number of categories",
  },
  {
    key: "purchase_frequency_per_month",
    label: "Purchase Frequency (Per Month)",
    type: "behavioral",
    valueType: "number",
    operators: ["greater_than", "less_than", "between"],
    placeholder: "Purchases per month",
  },

  // Transactional Properties
  {
    key: "total_spend",
    label: "Total Spend (₹)",
    type: "transactional",
    valueType: "number",
    operators: ["greater_than", "less_than", "between", "equals"],
    placeholder: "Enter amount in ₹",
  },
  {
    key: "average_order_value",
    label: "Average Order Value (₹)",
    type: "transactional",
    valueType: "number",
    operators: ["greater_than", "less_than", "between"],
    placeholder: "Enter amount in ₹",
  },
  {
    key: "lifetime_value",
    label: "Lifetime Value (₹)",
    type: "transactional",
    valueType: "number",
    operators: ["greater_than", "less_than", "between"],
    placeholder: "Enter amount in ₹",
  },
  {
    key: "last_order_value",
    label: "Last Order Value (₹)",
    type: "transactional",
    valueType: "number",
    operators: ["greater_than", "less_than", "equals"],
    placeholder: "Enter amount in ₹",
  },
];

export const OPERATOR_LABELS: Record<string, string> = {
  equals: "equals",
  not_equals: "does not equal",
  greater_than: "greater than",
  less_than: "less than",
  greater_than_or_equal: "greater than or equal to",
  less_than_or_equal: "less than or equal to",
  between: "between",
  is_one_of: "is one of",
  is_not_one_of: "is not one of",
  contains: "contains",
  not_contains: "does not contain",
  is_true: "is true",
  is_false: "is false",
  is_set: "is set",
  is_not_set: "is not set",
  in_last_days: "in last X days",
  before_date: "before date",
  after_date: "after date",
};

export function getPropertyDefinition(propertyKey: string): PropertyDefinition | undefined {
  return COHORT_PROPERTIES.find(p => p.key === propertyKey);
}

export function getAvailableOperators(propertyKey: string) {
  const property = getPropertyDefinition(propertyKey);
  return property?.operators || [];
}
