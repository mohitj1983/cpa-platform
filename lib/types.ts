// Type definitions for Customer Potential & Activation platform

export interface Transformation {
  id: string;
  name: string;
  description: string;
  value: number; // in ₹
  customerCount: number;
  successProbability: number; // 0-100
  status: "pending" | "in_progress" | "completed";
  category: string;
  estimatedROI: number;
  timeframe: string; // e.g., "60-90 days"
}

// Journey Flow Types for React Flow
export interface JourneyNode {
  id: string;
  type: "start" | "action" | "decision" | "end";
  position: { x: number; y: number };
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

export interface JourneyEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
  animated?: boolean;
  style?: Record<string, string | number>;
}

export interface TransformationDetail extends Transformation {
  why: {
    ltvIncrease: number; // percentage
    causalImpact: string;
    validationStrength: "Very High" | "High" | "Medium"; // Business-friendly instead of p-value
    impactRange: string; // e.g., "2.8x to 4.1x" instead of confidence interval
    sampleSize: number; // Number of customers analyzed
    revenueOpportunity: number;
  };
  who: {
    highPropensityCount: number;
    targetCustomers: {
      id: string;
      propensity: number;
      currentState: string;
      predictedValue: number;
    }[];
    cohortComparison: {
      highPropensity: { engagement: number; ltv: number };
      lowPropensity: { engagement: number; ltv: number };
    };
  };
  how: {
    journeyFlow: {
      nodes: JourneyNode[];
      edges: JourneyEdge[];
    };
    channelMix: { channel: string; percentage: number }[];
  };
}

export interface CampaignStatus {
  transformationId: string;
  transformationName: string;
  customersInPipeline: number;
  stages: {
    name: string;
    count: number;
    conversionRate: number;
  }[];
  actualVsPredicted: {
    predicted: number;
    actual: number;
  };
  alerts: {
    message: string;
    severity: "info" | "warning" | "error";
  }[];
}
