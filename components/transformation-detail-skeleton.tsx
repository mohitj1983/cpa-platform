import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TransformationDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-40" />

        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>

        {/* Key Metrics Skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-24 mb-2" />
                <Skeleton className="h-3 w-40" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-4">
          <div className="grid w-full grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>

          {/* Tab Content Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <div className="bg-muted p-4 rounded-lg">
                  <Skeleton className="h-10 w-24 mb-2" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-muted p-4 rounded-lg space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex justify-end gap-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-12 w-56" />
        </div>
      </div>
    </div>
  );
}
