"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShineBorder } from "@/components/ui/shine-border";
import { Particles } from "@/components/ui/particles";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Target,
  Users,
  TrendingUp,
  Wand2,
  CheckCircle2
} from "lucide-react";

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface JourneyStep {
  id: string;
  name: string;
  channel: string;
  timing: string;
  action: string;
}

export default function CreateStrategy() {
  const [strategyName, setStrategyName] = useState("");
  const [description, setDescription] = useState("");
  const [startStateRules, setStartStateRules] = useState<Rule[]>([
    { id: "1", field: "", operator: "", value: "" }
  ]);
  const [endStateRules, setEndStateRules] = useState<Rule[]>([
    { id: "1", field: "", operator: "", value: "" }
  ]);
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const fields = [
    "Purchase Frequency",
    "Average Order Value",
    "Channel Preference",
    "Product Category",
    "Loyalty Status",
    "Engagement Score",
    "Last Purchase Date",
    "Customer Tenure"
  ];

  const operators = ["equals", "greater than", "less than", "contains", "not equals"];
  const channels = ["SMS", "Email", "Push Notification", "In-App", "In-Store"];

  const addRule = (type: "start" | "end") => {
    const newRule = { id: Date.now().toString(), field: "", operator: "", value: "" };
    if (type === "start") {
      setStartStateRules([...startStateRules, newRule]);
    } else {
      setEndStateRules([...endStateRules, newRule]);
    }
  };

  const removeRule = (type: "start" | "end", id: string) => {
    if (type === "start") {
      setStartStateRules(startStateRules.filter(r => r.id !== id));
    } else {
      setEndStateRules(endStateRules.filter(r => r.id !== id));
    }
  };

  const updateRule = (type: "start" | "end", id: string, field: keyof Rule, value: string) => {
    const updateRules = (rules: Rule[]) =>
      rules.map(r => r.id === id ? { ...r, [field]: value } : r);

    if (type === "start") {
      setStartStateRules(updateRules(startStateRules));
    } else {
      setEndStateRules(updateRules(endStateRules));
    }
  };

  const addJourneyStep = () => {
    setJourneySteps([
      ...journeySteps,
      { id: Date.now().toString(), name: "", channel: "", timing: "", action: "" }
    ]);
  };

  const removeJourneyStep = (id: string) => {
    setJourneySteps(journeySteps.filter(s => s.id !== id));
  };

  const updateJourneyStep = (id: string, field: keyof JourneyStep, value: string) => {
    setJourneySteps(journeySteps.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleCreateStrategy = () => {
    setShowSuccess(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={80}
        color="#3b82f6"
        refresh
      />

      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Wand2 className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">Create Custom Strategy</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Define your transformation goals with our intelligent rule builder
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <ShineBorder
            className="bg-primary/10 border-primary p-6"
            color={["#3b82f6", "#8b5cf6", "#06b6d4"]}
          >
            <div className="flex items-center gap-3 text-primary">
              <CheckCircle2 className="h-6 w-6" />
              <div>
                <h3 className="font-semibold text-lg">Strategy Created Successfully!</h3>
                <p className="text-sm">Redirecting to dashboard...</p>
              </div>
            </div>
          </ShineBorder>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Strategy Details
            </CardTitle>
            <CardDescription>Give your transformation strategy a name and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Strategy Name</Label>
              <Input
                id="name"
                placeholder="e.g., Weekend Shoppers → Weekday Shoppers"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this transformation aims to achieve..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Start State Rules */}
        <ShineBorder
          className="relative"
          color={["#3b82f6", "#06b6d4"]}
          borderWidth={2}
        >
          <Card className="border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Start State (Current Customer Behavior)
              </CardTitle>
              <CardDescription>
                Define rules to identify customers in their current state
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {startStateRules.map((rule, index) => (
                <div key={rule.id} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Label>Customer Attribute</Label>
                    <Select
                      value={rule.field}
                      onValueChange={(value) => updateRule("start", rule.id, "field", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select attribute" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map(field => (
                          <SelectItem key={field} value={field}>{field}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Condition</Label>
                    <Select
                      value={rule.operator}
                      onValueChange={(value) => updateRule("start", rule.id, "operator", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map(op => (
                          <SelectItem key={op} value={op}>{op}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Value</Label>
                    <Input
                      placeholder="Enter value"
                      value={rule.value}
                      onChange={(e) => updateRule("start", rule.id, "value", e.target.value)}
                    />
                  </div>
                  {startStateRules.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeRule("start", rule.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addRule("start")}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Condition (AND)
              </Button>
            </CardContent>
          </Card>
        </ShineBorder>

        {/* End State Rules */}
        <ShineBorder
          className="relative"
          color={["#8b5cf6", "#ec4899"]}
          borderWidth={2}
        >
          <Card className="border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                End State (Desired Customer Behavior)
              </CardTitle>
              <CardDescription>
                Define rules for the target state you want customers to reach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {endStateRules.map((rule) => (
                <div key={rule.id} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Label>Customer Attribute</Label>
                    <Select
                      value={rule.field}
                      onValueChange={(value) => updateRule("end", rule.id, "field", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select attribute" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map(field => (
                          <SelectItem key={field} value={field}>{field}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Condition</Label>
                    <Select
                      value={rule.operator}
                      onValueChange={(value) => updateRule("end", rule.id, "operator", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map(op => (
                          <SelectItem key={op} value={op}>{op}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Value</Label>
                    <Input
                      placeholder="Enter value"
                      value={rule.value}
                      onChange={(e) => updateRule("end", rule.id, "value", e.target.value)}
                    />
                  </div>
                  {endStateRules.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeRule("end", rule.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addRule("end")}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Condition (AND)
              </Button>
            </CardContent>
          </Card>
        </ShineBorder>

        {/* Journey Steps (Optional) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Customer Journey (Optional)
            </CardTitle>
            <CardDescription>
              Define the steps customers will follow. Leave empty for AI to auto-generate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {journeySteps.map((step, stepIndex) => (
              <div key={step.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Step {stepIndex + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeJourneyStep(step.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Step Name</Label>
                    <Input
                      placeholder="e.g., Welcome Email"
                      value={step.name}
                      onChange={(e) => updateJourneyStep(step.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Channel</Label>
                    <Select
                      value={step.channel}
                      onValueChange={(value) => updateJourneyStep(step.id, "channel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        {channels.map(channel => (
                          <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timing</Label>
                    <Input
                      placeholder="e.g., Day 0, 2 hours after"
                      value={step.timing}
                      onChange={(e) => updateJourneyStep(step.id, "timing", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Action</Label>
                    <Input
                      placeholder="e.g., Send personalized recommendations"
                      value={step.action}
                      onChange={(e) => updateJourneyStep(step.id, "action", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addJourneyStep}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Journey Step
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/">
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
          <Button
            size="lg"
            onClick={handleCreateStrategy}
            disabled={!strategyName || !description}
            className="bg-primary"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Create Strategy
          </Button>
        </div>
      </div>
    </div>
  );
}
