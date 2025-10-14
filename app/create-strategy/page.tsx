"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShineBorder } from "@/components/ui/shine-border";
import { Particles } from "@/components/ui/particles";
import { RuleGroup } from "@/components/cohort-builder/rule-group";
import { TimelineSelector } from "@/components/cohort-builder/timeline-selector";
import { CohortPreview } from "@/components/cohort-builder/cohort-preview";
import {
  RuleGroup as RuleGroupType,
  Timeline,
  CohortDefinition,
  CohortPreview as CohortPreviewType,
} from "@/lib/cohort-types";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  CheckCircle2
} from "lucide-react";

export default function CreateStrategy() {
  const [strategyName, setStrategyName] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize cohort builder state
  const [startAudience, setStartAudience] = useState<RuleGroupType>({
    id: "start-root",
    operator: "AND",
    rules: [
      {
        id: `rule-${Date.now()}`,
        property: "",
        operator: "equals",
        value: null,
        propertyType: "user",
      },
    ],
    groups: [],
  });

  const [endAudience, setEndAudience] = useState<RuleGroupType>({
    id: "end-root",
    operator: "AND",
    rules: [
      {
        id: `rule-${Date.now() + 1}`,
        property: "",
        operator: "equals",
        value: null,
        propertyType: "user",
      },
    ],
    groups: [],
  });

  const [timeline, setTimeline] = useState<Timeline>({
    duration: 3,
    unit: "months",
  });

  const [preview, setPreview] = useState<CohortPreviewType>({
    startAudienceCount: 0,
    endAudienceCount: 0,
    estimatedConversionRate: 0,
    estimatedValue: 0,
  });

  // Mock preview calculation - in real app, this would call an API
  useEffect(() => {
    const calculatePreview = () => {
      // Check if start audience has any valid rules
      const hasValidStartRules = startAudience.rules.some(r => r.property && r.operator);
      const hasValidEndRules = endAudience.rules.some(r => r.property && r.operator);

      if (!hasValidStartRules) {
        setPreview({
          startAudienceCount: 0,
          endAudienceCount: 0,
          estimatedConversionRate: 0,
          estimatedValue: 0,
        });
        return;
      }

      // Mock calculation based on rules complexity
      const startCount = 25000 + Math.random() * 50000;
      const conversionRate = hasValidEndRules ? 15 + Math.random() * 20 : 0;
      const value = (startCount * conversionRate * 1200) / 100;

      setPreview({
        startAudienceCount: Math.round(startCount),
        endAudienceCount: Math.round((startCount * conversionRate) / 100),
        estimatedConversionRate: Math.round(conversionRate),
        estimatedValue: Math.round(value),
      });
    };

    const timeoutId = setTimeout(calculatePreview, 500);
    return () => clearTimeout(timeoutId);
  }, [startAudience, endAudience, timeline]);

  const handleCreateStrategy = () => {
    const cohortDefinition: CohortDefinition = {
      name: strategyName,
      description,
      startAudience,
      endAudience,
      timeline,
    };

    // In production, save to backend
    console.log("Creating strategy:", cohortDefinition);

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
            shineColor={["#3b82f6", "#8b5cf6", "#06b6d4"]}
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

        {/* Start Audience Cohort Builder */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
              <Target className="h-6 w-6 text-blue-500" />
              Start Audience
            </h2>
            <p className="text-muted-foreground">
              Define rules to identify customers in their current state
            </p>
          </div>
          <div className="relative rounded-lg">
            <ShineBorder
              shineColor={["#3b82f6", "#06b6d4"]}
              borderWidth={2}
            />
            <div className="relative z-10">
              <RuleGroup group={startAudience} onUpdate={setStartAudience} />
            </div>
          </div>
        </div>

        {/* End Audience Cohort Builder */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-purple-500" />
              End Audience
            </h2>
            <p className="text-muted-foreground">
              Define rules for the target state you want customers to reach
            </p>
          </div>
          <div className="relative rounded-lg">
            <ShineBorder
              shineColor={["#8b5cf6", "#ec4899"]}
              borderWidth={2}
            />
            <div className="relative z-10">
              <RuleGroup group={endAudience} onUpdate={setEndAudience} />
            </div>
          </div>
        </div>

        {/* Timeline Selector */}
        <Card>
          <CardContent className="p-6">
            <TimelineSelector timeline={timeline} onUpdate={setTimeline} />
          </CardContent>
        </Card>

        {/* Cohort Preview */}
        <CohortPreview preview={preview} />

        {/* AI Journey Generation Info */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  AI-Powered Journey Generation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Once you create this strategy, our AI will automatically analyze your start and end states to generate an optimized customer journey with:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mt-3 ml-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Multiple personalized paths based on customer behavior
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Optimal channel selection (SMS, Email, Push, In-App)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Timing recommendations for each touchpoint
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Predicted success rates and customer flow
                  </li>
                </ul>
              </div>
            </div>
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
