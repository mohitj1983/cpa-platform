"use client";

import { CohortPreview as CohortPreviewType } from "@/lib/cohort-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Target, DollarSign } from "lucide-react";
import AnimatedNumber from "@/components/ui/animated-number";
import { Progress } from "@/components/ui/progress";

interface CohortPreviewProps {
  preview: CohortPreviewType;
  isLoading?: boolean;
}

export function CohortPreview({ preview, isLoading = false }: CohortPreviewProps) {
  const conversionRate = preview.estimatedConversionRate || 0;
  const expectedConversions = Math.round((preview.startAudienceCount * conversionRate) / 100);

  return (
    <Card className="border-primary/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Audience Preview & Estimates
        </CardTitle>
        <CardDescription>
          AI-powered predictions based on your cohort definition
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Audience Counts */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              Start Audience Size
            </div>
            <div className="text-3xl font-bold text-primary">
              {isLoading ? (
                <span className="animate-pulse">---</span>
              ) : (
                <>
                  <AnimatedNumber value={preview.startAudienceCount} className="inline" />
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Customers matching start state criteria
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Expected Conversions
            </div>
            <div className="text-3xl font-bold text-primary">
              {isLoading ? (
                <span className="animate-pulse">---</span>
              ) : (
                <>
                  <AnimatedNumber value={expectedConversions} className="inline" />
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated customers reaching end state
            </p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Target className="h-4 w-4 text-primary" />
              Predicted Success Rate
            </div>
            <span className="text-2xl font-bold text-primary">
              {isLoading ? (
                <span className="animate-pulse">--</span>
              ) : (
                `${conversionRate}%`
              )}
            </span>
          </div>
          <Progress value={conversionRate} className="h-3" />
          <p className="text-xs text-muted-foreground">
            Based on historical transformation patterns and customer behavior
          </p>
        </div>

        {/* Estimated Value */}
        <div className="space-y-2 border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            Estimated Opportunity Value
          </div>
          <div className="text-3xl font-bold text-primary">
            {isLoading ? (
              <span className="animate-pulse">---</span>
            ) : (
              <>
                ₹<AnimatedNumber value={preview.estimatedValue / 10000000} className="inline" />Cr
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Projected revenue impact from successful transformations
          </p>
        </div>

        {/* AI Insight */}
        {!isLoading && preview.startAudienceCount > 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 p-1.5 rounded">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold">AI Recommendation</p>
                <p className="text-xs text-muted-foreground">
                  {conversionRate >= 25 ? (
                    <>
                      <span className="text-green-600 font-medium">High potential transformation.</span> This cohort shows strong conversion probability. Consider prioritizing this strategy.
                    </>
                  ) : conversionRate >= 15 ? (
                    <>
                      <span className="text-yellow-600 font-medium">Moderate potential.</span> Expected results are good. Monitor early performance and optimize touchpoints.
                    </>
                  ) : (
                    <>
                      <span className="text-orange-600 font-medium">Lower conversion expected.</span> Consider refining audience criteria or extending timeline for better results.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
