import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceUsageData } from "@/lib/types";
import { Activity, Calendar, Cpu, HardDrive, RotateCcw, Server } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Resources({ resourceUsage }: { resourceUsage: ResourceUsageData[] }) {
    return <div>
        <Card className="bg-white/5 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Resource Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={resourceUsage} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
                                      <span>{entry.name}</span>
                                    </div>
                                    <span className="font-mono">{entry.value}%</span>
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cpu" 
                        name="CPU" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="memory" 
                        name="Memory" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="disk" 
                        name="Disk" 
                        stroke="#ffc658" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#8884d8' }}></div>
                    <div className="text-sm">CPU</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#82ca9d' }}></div>
                    <div className="text-sm">Memory</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#ffc658' }}></div>
                    <div className="text-sm">Disk</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* System Information */}
            <Card className="bg-white/5 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Server</p>
                        <p className="text-sm text-muted-foreground">Web Server 01 (US East)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <HardDrive className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Storage</p>
                        <p className="text-sm text-muted-foreground">SSD: 500GB (76% used)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Cpu className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Processor</p>
                        <p className="text-sm text-muted-foreground">Intel Xeon E5-2680 v3 @ 2.50GHz (12 cores)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Operating System</p>
                        <p className="text-sm text-muted-foreground">Ubuntu 22.04.3 LTS</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <RotateCcw className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Last Restart</p>
                        <p className="text-sm text-muted-foreground">7 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Deployment</p>
                        <p className="text-sm text-muted-foreground">Last updated 3 days ago (v2.4.1)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
    </div>
}