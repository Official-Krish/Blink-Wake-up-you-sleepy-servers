import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LoadTimeData } from "@/lib/types";

export default function Performance({ loadTime }: { loadTime: LoadTimeData[] }) {
    return (
        <div>
            <Card className="bg-white/5 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Page Load Time Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={loadTime}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      barSize={20}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="time" 
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                      />
                      <YAxis 
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                      />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const total = payload.reduce((sum, entry) => {
                                if (!entry) return sum;
                                return sum + (typeof entry.value === 'number' ? entry.value : 0);
                            }, 0);
                            return (
                              <div className="bg-background border border-border p-3 rounded-md shadow-md text-xs">
                                <p className="font-medium mb-2">{label}</p>
                                {payload.map((entry, index) => (
                                  <div key={index} className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                      <div 
                                        className="w-2.5 h-2.5 rounded-sm" 
                                        style={{ backgroundColor: entry.color }}
                                      />
                                      <span>{entry.name === 'ttfb' ? 'Server Response' : entry.name === 'html' ? 'HTML Load' : 'Resources Load'}</span>
                                    </div>
                                    <span className="font-mono">{entry.value} ms</span>
                                  </div>
                                ))}
                                <div className="mt-2 pt-2 border-t border-border flex justify-between items-center">
                                  <span className="font-medium">Total</span>
                                  <span className="font-mono font-medium">{total} ms</span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="ttfb" stackId="a" name="Server Response" fill="#8884d8" />
                      <Bar dataKey="html" stackId="a" name="HTML Load" fill="#82ca9d" />
                      <Bar dataKey="resources" stackId="a" name="Resources Load" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#8884d8' }}></div>
                    <div className="text-sm">Server Response</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#82ca9d' }}></div>
                    <div className="text-sm">HTML Load</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#ffc658' }}></div>
                    <div className="text-sm">Resources Load</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Core Web Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/5 border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Largest Contentful Paint (LCP)</p>
                    <Badge variant="outline" className="bg-success/20 text-success border-success/20">Good</Badge>
                  </div>
                  <p className="text-2xl font-bold">1.8s</p>
                  <div className="mt-4">
                    <Progress value={60} className="h-1.5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Good: Under 2.5s</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">First Input Delay (FID)</p>
                    <Badge variant="outline" className="bg-success/20 text-success border-success/20">Good</Badge>
                  </div>
                  <p className="text-2xl font-bold">65ms</p>
                  <div className="mt-4">
                    <Progress value={32.5} className="h-1.5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Good: Under 100ms</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Cumulative Layout Shift (CLS)</p>
                    <Badge variant="outline" className="bg-warning/20 text-warning border-warning/20">Needs Improvement</Badge>
                  </div>
                  <p className="text-2xl font-bold">0.18</p>
                  <div className="mt-4">
                    <Progress value={75} className="h-1.5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Good: Under 0.1</p>
                </CardContent>
              </Card>
            </div>
        </div>
    )
}