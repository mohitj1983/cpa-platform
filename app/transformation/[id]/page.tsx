"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { mockTransformationDetail } from "@/lib/mock-data";
import { JourneyFlowChart } from "@/components/journey-flow-chart";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, AlertCircle, CheckCircle, Award } from "lucide-react";

export default function TransformationDetail({ params }: { params: { id: string } }) {
  // In a real app, fetch based on params.id
  const transformation = mockTransformationDetail;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight">{transformation.name}</h1>
            <Badge variant={transformation.status === "in_progress" ? "default" : "outline"}>
              {transformation.status.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">{transformation.description}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Opportunity Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{(transformation.value / 10000000).toFixed(1)}Cr</div>
              <p className="text-xs text-muted-foreground mt-1">Estimated revenue impact</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Target Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(transformation.customerCount / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground mt-1">High-propensity cohort</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Expected ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{transformation.estimatedROI}:1</div>
              <p className="text-xs text-muted-foreground mt-1">Return on ad spend</p>
            </CardContent>
          </Card>
        </div>

        {/* WHY-WHO-HOW Tabs */}
        <Tabs defaultValue="why" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="why">
              <span className="hidden sm:inline">WHY - Value Quantification</span>
              <span className="sm:hidden">WHY</span>
            </TabsTrigger>
            <TabsTrigger value="who">
              <span className="hidden sm:inline">WHO - Target Customers</span>
              <span className="sm:hidden">WHO</span>
            </TabsTrigger>
            <TabsTrigger value="how">
              <span className="hidden sm:inline">HOW - Journey Strategy</span>
              <span className="sm:hidden">HOW</span>
            </TabsTrigger>
          </TabsList>

          {/* WHY Tab */}
          <TabsContent value="why" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Impact Analysis</CardTitle>
                <CardDescription>Proven results and revenue opportunity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Lifetime Value Impact
                  </h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-3xl font-bold text-primary">+{transformation.why.ltvIncrease}%</div>
                    <p className="text-sm text-muted-foreground mt-1">LTV increase for transformed customers</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">What We&apos;ve Learned</h3>
                  <p className="text-muted-foreground">{transformation.why.causalImpact}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Validation & Confidence</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <div className="text-sm text-muted-foreground">Validation Strength</div>
                      </div>
                      <div className="text-2xl font-bold text-primary">{transformation.why.validationStrength}</div>
                      <Badge variant="default" className="mt-2">Proven Results</Badge>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Expected Impact Range</div>
                      <div className="text-xl font-semibold">{transformation.why.impactRange}</div>
                      <div className="text-xs text-muted-foreground mt-2">higher lifetime value</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Based On Real Data</h3>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Analysis of similar customers</div>
                    <div className="text-2xl font-bold text-primary">
                      {transformation.why.sampleSize.toLocaleString()} customers
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Revenue Opportunity</h3>
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-4xl font-bold text-primary">
                      ₹{(transformation.why.revenueOpportunity / 10000000).toFixed(1)}Cr
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Total addressable opportunity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WHO Tab */}
          <TabsContent value="who" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Target Customer Intelligence</CardTitle>
                <CardDescription>Propensity-based targeting and segmentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      High-Propensity Customers
                    </h3>
                    <Badge variant="default">{transformation.who.highPropensityCount.toLocaleString()} customers</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customers with &gt;60% probability of successful transformation
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Top Target Customers</h3>
                  {transformation.who.targetCustomers.map((customer) => (
                    <div key={customer.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Customer {customer.id}</div>
                        <Badge variant="secondary">{customer.propensity}% Propensity</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{customer.currentState}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Predicted Value:</span>
                        <span className="font-semibold">₹{customer.predictedValue.toLocaleString()}</span>
                      </div>
                      <Progress value={customer.propensity} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Cohort Comparison</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="text-sm font-medium">High Propensity Cohort</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Engagement</span>
                          <span className="font-semibold">{transformation.who.cohortComparison.highPropensity.engagement}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Avg LTV</span>
                          <span className="font-semibold">₹{transformation.who.cohortComparison.highPropensity.ltv.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="text-sm font-medium">Low Propensity Cohort</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Engagement</span>
                          <span className="font-semibold">{transformation.who.cohortComparison.lowPropensity.engagement}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Avg LTV</span>
                          <span className="font-semibold">₹{transformation.who.cohortComparison.lowPropensity.ltv.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HOW Tab */}
          <TabsContent value="how" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Journey Strategy & Execution</CardTitle>
                <CardDescription>
                  Multiple customer paths based on behavior patterns - each segment follows an optimized journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JourneyFlowChart
                  nodes={transformation.how.journeyFlow.nodes}
                  edges={transformation.how.journeyFlow.edges}
                />
              </CardContent>
            </Card>

            {/* Channel Mix Card */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Mix</CardTitle>
                <CardDescription>Distribution of communication channels across all paths</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {transformation.how.channelMix.map((channel) => (
                    <div key={channel.channel} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{channel.channel}</span>
                        <span className="font-semibold">{channel.percentage}%</span>
                      </div>
                      <Progress value={channel.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Execute Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" size="lg">
            Customize Strategy
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="lg" className="bg-primary">
                Execute Transformation
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-2xl">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  Confirm Campaign Execution
                </AlertDialogTitle>
                <AlertDialogDescription className="text-base pt-4">
                  You are about to launch a transformation campaign for <strong>{transformation.name}</strong>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-4 py-4">
                {/* Campaign Summary */}
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase">Campaign Summary</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Target Customers</div>
                      <div className="text-lg font-bold">{transformation.customerCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Expected Value</div>
                      <div className="text-lg font-bold">₹{(transformation.value / 10000000).toFixed(1)}Cr</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Success Probability</div>
                      <div className="text-lg font-bold">{transformation.successProbability}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Timeframe</div>
                      <div className="text-lg font-bold">{transformation.timeframe}</div>
                    </div>
                  </div>
                </div>

                {/* Journey Preview */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-3">Campaign Journey</h4>
                  <div className="space-y-2">
                    {transformation.how.journeyFlow.nodes
                      .filter(node => node.type === "action")
                      .slice(0, 3)
                      .map((node) => (
                        <div key={node.id} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{node.data.label}:</span>
                          <span className="text-xs">{node.data.action}</span>
                        </div>
                      ))}
                    <div className="text-xs text-muted-foreground pl-6">
                      + {transformation.how.journeyFlow.nodes.filter(n => n.type === "action").length - 3} more steps across multiple paths
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-destructive/10 border-destructive/20 border rounded-lg p-3 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-destructive mb-1">This action will immediately start the campaign</p>
                    <p className="text-muted-foreground">
                      Emails, SMS, and push notifications will be sent to {transformation.customerCount.toLocaleString()} customers according to the journey schedule.
                    </p>
                  </div>
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-primary">
                  Yes, Execute Campaign
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
