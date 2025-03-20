import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { LatencyChart } from "./LatencyChart";
import { AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { HealthHistoryData, LatencyData, latencyStats } from "@/lib/types";

export default function Overview({ healthHistory, latencyStats, timeRange, latencyData }: { healthHistory: HealthHistoryData[], latencyStats: latencyStats, timeRange: string, latencyData: LatencyData[] }) {
    return (
      <div>
        <Card className="bg-white/5 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border p-2 rounded-md shadow-md text-xs">
                            <p className="text-muted-foreground">{label}</p>
                            <p className="font-semibold capitalize">{payload[0].payload.status}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="stepAfter" 
                    dataKey="status" 
                    stroke="url(#statusGradient)" 
                    fill="url(#statusGradient)"
                    isAnimationActive={false}
                  />
                  <defs>
                    <linearGradient id="statusGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-"></div>
                <div className="text-sm">Online</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="text-sm">Degraded</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger"></div>
                <div className="text-sm">Offline</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latency Chart (reusing existing component) */}
        <LatencyChart
          title={`Response Time (${timeRange})`}
          data={latencyData}
          average={latencyStats?.average || 0}
          max={latencyStats?.max || 0}
          min={latencyStats?.min || 0}
        />
        
        {/* Incidents Summary */}
        <Card className="bg-white/5 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-danger/10 rounded-lg border border-danger/20">
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-danger flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    <span>Service Outage</span>
                  </div>
                  <Badge variant="outline" className="bg-danger/20 text-danger border-danger/20">
                    2 days ago
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Server unavailable for 23 minutes due to database connection issues.</p>
              </div>
              
              <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-warning flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Performance Degradation</span>
                  </div>
                  <Badge variant="outline" className="bg-warning/20 text-warning border-warning/20">
                    5 days ago
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">High response times (800ms+) for 45 minutes due to increased traffic.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}