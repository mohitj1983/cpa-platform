"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTransformations } from "@/lib/mock-data";
import Link from "next/link";
import { TrendingUp, Users, Target, Clock, Sparkles, ArrowRight, Wand2 } from "lucide-react";
import AnimatedNumber from "@/components/ui/animated-number";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

export default function Dashboard() {
  // Calculate total metrics
  const totalValue = mockTransformations.reduce((sum, t) => sum + t.value, 0);
  const totalCustomers = mockTransformations.reduce((sum, t) => sum + t.customerCount, 0);
  const avgROI = (mockTransformations.reduce((sum, t) => sum + t.estimatedROI, 0) / mockTransformations.length).toFixed(1);
  const activeTransformations = mockTransformations.filter(t => t.status === "in_progress").length;

  // Get top recommended transformation (highest value pending transformation)
  const topRecommendation = mockTransformations
    .filter(t => t.status === "pending")
    .sort((a, b) => b.value - a.value)[0];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Customer Potential & Activation</h1>
            <p className="text-muted-foreground text-lg">
              AI-powered transformation intelligence platform
            </p>
          </div>
          <Link href="/create-strategy">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Wand2 className="mr-2 h-5 w-5" />
              Create Custom Strategy
            </Button>
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Opportunity Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹<AnimatedNumber value={totalValue / 10000000} className="inline" />Cr
              </div>
              <p className="text-xs text-muted-foreground">Across all transformations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Target Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <AnimatedNumber value={totalCustomers / 1000} className="inline" />K
              </div>
              <p className="text-xs text-muted-foreground">High-propensity cohort</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <AnimatedNumber value={parseFloat(avgROI)} className="inline" />:1
              </div>
              <p className="text-xs text-muted-foreground">Expected ROAS</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <AnimatedNumber value={activeTransformations} className="inline" />
              </div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Next Action */}
        {topRecommendation && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2 flex-wrap">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Recommended Next Action</CardTitle>
                <AnimatedGradientText>
                  ✨ AI-Powered
                </AnimatedGradientText>
              </div>
              <CardDescription className="mt-2">
                Highest-impact transformation opportunity based on predictive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-1">
                      {topRecommendation.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {topRecommendation.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">
                        ₹{(topRecommendation.value / 10000000).toFixed(1)}Cr Revenue
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">
                        {(topRecommendation.customerCount / 1000).toFixed(1)}K Customers
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">
                        {topRecommendation.successProbability}% Success Rate
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">
                        {topRecommendation.timeframe}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href={`/transformation/${topRecommendation.id}`}>
                  <Button size="lg" className="bg-primary w-full md:w-auto">
                    Explore Strategy
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transformation Opportunities */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Transformation Opportunities</h2>
            <Badge variant="secondary">Ranked by Value</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockTransformations.map((transformation, index) => (
              <Card key={transformation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{transformation.name}</CardTitle>
                      <Badge variant={transformation.status === "in_progress" ? "default" : "outline"}>
                        {transformation.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {transformation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Opportunity Value</span>
                      <span className="font-semibold">₹{(transformation.value / 10000000).toFixed(1)}Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target Customers</span>
                      <span className="font-semibold">{(transformation.customerCount / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Success Probability</span>
                      <span className="font-semibold">{transformation.successProbability}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expected ROI</span>
                      <span className="font-semibold">{transformation.estimatedROI}:1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Timeframe</span>
                      <span className="font-semibold">{transformation.timeframe}</span>
                    </div>
                  </div>

                  <Link href={`/transformation/${transformation.id}`}>
                    <Button className="w-full" variant="default">
                      Explore Transformation
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
