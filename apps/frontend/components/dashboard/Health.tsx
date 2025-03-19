import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BarChart3, XCircle } from "lucide-react";
import { Progress } from "../ui/progress";

export default function Health({ timeRange }: { timeRange: string }) {
    return <div>
        <Card className="bg-white/5 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Health Timeline ({timeRange})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-border/60"></div>
                  
                  {/* Timeline events */}
                  <div className="space-y-6 relative ml-8">
                    <div className="relative">
                      <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-danger/20 border border-danger/40 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-danger" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Service Outage</p>
                          <p className="text-xs text-muted-foreground">2 days ago, 14:32</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Server unavailable for 23 minutes due to database connection issues.</p>
                        <div className="mt-2 pl-4 border-l-2 border-danger/40 text-sm space-y-2">
                          <p>Error: Database connection timeout after 30s</p>
                          <p>Resolution: Database server restarted and connection pool reconfigured</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-warning/20 border border-warning/40 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Performance Degradation</p>
                          <p className="text-xs text-muted-foreground">5 days ago, 09:45</p>
                        </div>
                        <p className="text-sm text-muted-foreground">High response times (800ms+) for 45 minutes due to increased traffic.</p>
                        <div className="mt-2 pl-4 border-l-2 border-warning/40 text-sm space-y-2">
                          <p>Traffic increased by 243% during marketing campaign launch</p>
                          <p>Auto-scaling triggered at 10:05, additional 3 instances added</p>
                          <p>Response times normalized by 10:30</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-success/20 border border-success/40 flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-success" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Load Balancer Optimized</p>
                          <p className="text-xs text-muted-foreground">7 days ago, 16:12</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Load balancing algorithm updated for better request distribution.</p>
                        <div className="mt-2 pl-4 border-l-2 border-success/40 text-sm space-y-2">
                          <p>Previous avg. response time: 245ms</p>
                          <p>Current avg. response time: 187ms</p>
                          <p>Improvement: 23.7%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Availability by Region */}
            <Card className="bg-white/5 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Regional Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Map would go here in a real app */}
                  <div className="hidden md:flex items-center justify-center h-[250px] bg-white/5 rounded-lg">
                    <p className="text-muted-foreground text-sm">World map would be displayed here</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm">North America</p>
                        <p className="text-sm font-medium">99.98%</p>
                      </div>
                      <Progress value={99.98} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm">Europe</p>
                        <p className="text-sm font-medium">99.95%</p>
                      </div>
                      <Progress value={99.95} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm">Asia</p>
                        <p className="text-sm font-medium">99.82%</p>
                      </div>
                      <Progress value={99.82} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm">Australia</p>
                        <p className="text-sm font-medium">99.72%</p>
                      </div>
                      <Progress value={99.72} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm">South America</p>
                        <p className="text-sm font-medium">98.96%</p>
                      </div>
                      <Progress value={98.96} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
    </div>
}