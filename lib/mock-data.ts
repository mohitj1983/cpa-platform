import { Transformation, TransformationDetail, CampaignStatus } from "./types";

export const mockTransformations: Transformation[] = [
  {
    id: "1",
    name: "Offline → Omnichannel",
    description: "Convert store-only customers to shop both online and offline",
    value: 12000000, // ₹12M
    customerCount: 8200,
    successProbability: 67,
    status: "pending",
    category: "Channel Expansion",
    estimatedROI: 3.2,
    timeframe: "60-90 days",
  },
  {
    id: "2",
    name: "Single → Multi-Category",
    description: "Expand customers from 1 category to 3+ categories",
    value: 8500000, // ₹8.5M
    customerCount: 12400,
    successProbability: 58,
    status: "pending",
    category: "Category Expansion",
    estimatedROI: 2.8,
    timeframe: "45-60 days",
  },
  {
    id: "3",
    name: "Occasional → Frequent",
    description: "Increase purchase frequency from <2/month to 4+ purchases/month",
    value: 6800000, // ₹6.8M
    customerCount: 15600,
    successProbability: 72,
    status: "in_progress",
    category: "Frequency Boost",
    estimatedROI: 4.1,
    timeframe: "30-45 days",
  },
  {
    id: "4",
    name: "Guest → Loyalty Member",
    description: "Enroll non-members into loyalty program",
    value: 4200000, // ₹4.2M
    customerCount: 18900,
    successProbability: 64,
    status: "pending",
    category: "Loyalty",
    estimatedROI: 3.5,
    timeframe: "15-30 days",
  },
  {
    id: "5",
    name: "Small Basket → Large Basket",
    description: "Increase average order value from <₹500 to ₹2000+",
    value: 5100000, // ₹5.1M
    customerCount: 9800,
    successProbability: 55,
    status: "pending",
    category: "Basket Size",
    estimatedROI: 2.9,
    timeframe: "45-75 days",
  },
];

export const mockTransformationDetail: TransformationDetail = {
  ...mockTransformations[0],
  why: {
    ltvIncrease: 240, // 240% increase
    causalImpact:
      "Customers who shop both online and offline have 3.4x higher lifetime value",
    validationStrength: "Very High",
    impactRange: "2.8x to 4.1x",
    sampleSize: 12400,
    revenueOpportunity: 12000000,
  },
  who: {
    highPropensityCount: 8200,
    targetCustomers: [
      {
        id: "C001",
        propensity: 89,
        currentState: "Offline-only, 5+ visits/month",
        predictedValue: 45000,
      },
      {
        id: "C002",
        propensity: 82,
        currentState: "Offline-only, has mobile app",
        predictedValue: 38000,
      },
      {
        id: "C003",
        propensity: 78,
        currentState: "Offline-only, high basket size",
        predictedValue: 42000,
      },
    ],
    cohortComparison: {
      highPropensity: { engagement: 85, ltv: 42000 },
      lowPropensity: { engagement: 32, ltv: 12000 },
    },
  },
  how: {
    journeyFlow: {
      nodes: [
        // Start node
        {
          id: "start",
          type: "start",
          position: { x: 0, y: 200 },
          data: {
            label: "Start",
            customerCount: 8200,
          },
        },
        // Path A - Tech-Savvy Customers (60%)
        {
          id: "path-a-1",
          type: "action",
          position: { x: 250, y: 50 },
          data: {
            label: "App Download SMS",
            action: "Send app download link with 10% discount",
            channel: "SMS",
            timing: "Day 0",
            successRate: 85,
            customerCount: 4920,
            pathName: "Tech-Savvy Path",
          },
        },
        {
          id: "path-a-2",
          type: "action",
          position: { x: 550, y: 50 },
          data: {
            label: "In-App Onboarding",
            action: "Personalized product recommendations",
            channel: "In-App",
            timing: "Day 2",
            successRate: 90,
            customerCount: 4182,
            pathName: "Tech-Savvy Path",
          },
        },
        {
          id: "path-a-3",
          type: "action",
          position: { x: 850, y: 50 },
          data: {
            label: "First Purchase Nudge",
            action: "Free delivery on first online order",
            channel: "Push Notification",
            timing: "Day 5",
            successRate: 75,
            customerCount: 3764,
            pathName: "Tech-Savvy Path",
          },
        },
        // Path B - Traditional Customers (40%)
        {
          id: "path-b-1",
          type: "action",
          position: { x: 250, y: 350 },
          data: {
            label: "In-Store QR Code",
            action: "Scan QR code for exclusive online deals",
            channel: "In-Store",
            timing: "Day 0",
            successRate: 70,
            customerCount: 3280,
            pathName: "Traditional Path",
          },
        },
        {
          id: "path-b-2",
          type: "action",
          position: { x: 550, y: 350 },
          data: {
            label: "Assisted Setup",
            action: "Staff-assisted app installation",
            channel: "In-Store",
            timing: "Day 3",
            successRate: 80,
            customerCount: 2296,
            pathName: "Traditional Path",
          },
        },
        {
          id: "path-b-3",
          type: "action",
          position: { x: 850, y: 350 },
          data: {
            label: "Email Promotion",
            action: "Exclusive online-only deals",
            channel: "Email",
            timing: "Day 7",
            successRate: 65,
            customerCount: 1837,
            pathName: "Traditional Path",
          },
        },
        // End node
        {
          id: "end",
          type: "end",
          position: { x: 1150, y: 200 },
          data: {
            label: "Omnichannel Customer",
            customerCount: 4021,
          },
        },
      ],
      edges: [
        // Start to Path A
        {
          id: "e-start-a1",
          source: "start",
          target: "path-a-1",
          label: "60% - Tech-Savvy",
          animated: true,
          style: { stroke: "#3b82f6", strokeWidth: 2 },
        },
        // Start to Path B
        {
          id: "e-start-b1",
          source: "start",
          target: "path-b-1",
          label: "40% - Traditional",
          animated: true,
          style: { stroke: "#8b5cf6", strokeWidth: 2 },
        },
        // Path A progression
        {
          id: "e-a1-a2",
          source: "path-a-1",
          target: "path-a-2",
          label: "85% success",
          animated: true,
          style: { stroke: "#3b82f6" },
        },
        {
          id: "e-a2-a3",
          source: "path-a-2",
          target: "path-a-3",
          label: "90% success",
          animated: true,
          style: { stroke: "#3b82f6" },
        },
        {
          id: "e-a3-end",
          source: "path-a-3",
          target: "end",
          label: "75% success",
          animated: true,
          style: { stroke: "#3b82f6" },
        },
        // Path B progression
        {
          id: "e-b1-b2",
          source: "path-b-1",
          target: "path-b-2",
          label: "70% success",
          animated: true,
          style: { stroke: "#8b5cf6" },
        },
        {
          id: "e-b2-b3",
          source: "path-b-2",
          target: "path-b-3",
          label: "80% success",
          animated: true,
          style: { stroke: "#8b5cf6" },
        },
        {
          id: "e-b3-end",
          source: "path-b-3",
          target: "end",
          label: "65% success",
          animated: true,
          style: { stroke: "#8b5cf6" },
        },
      ],
    },
    channelMix: [
      { channel: "SMS", percentage: 30 },
      { channel: "Push Notification", percentage: 25 },
      { channel: "Email", percentage: 20 },
      { channel: "In-App", percentage: 15 },
      { channel: "In-Store", percentage: 10 },
    ],
  },
};

export const mockCampaignStatus: CampaignStatus[] = [
  {
    transformationId: "3",
    transformationName: "Occasional → Frequent",
    customersInPipeline: 4820,
    stages: [
      { name: "Stage 1: Initial Contact", count: 2100, conversionRate: 78 },
      { name: "Stage 2: Engagement", count: 1600, conversionRate: 68 },
      { name: "Stage 3: First Action", count: 890, conversionRate: 72 },
      { name: "Stage 4: Conversion", count: 230, conversionRate: 65 },
    ],
    actualVsPredicted: {
      predicted: 72,
      actual: 68,
    },
    alerts: [
      {
        message: "45 customers dropped off at Stage 2 today (2x normal)",
        severity: "warning",
      },
    ],
  },
];
