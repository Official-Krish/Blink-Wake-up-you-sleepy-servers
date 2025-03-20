import { Activity, CheckCircle, Cpu, Wifi } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { latencyStats, ResourceUsageData, WebsiteWithUptime } from "@/lib/types";

export default function MetricCard({ website, latencyStats, resourceUsage }: { website: WebsiteWithUptime, latencyStats: latencyStats, resourceUsage: ResourceUsageData[] }) {

    if (!website) {
        return <div>Loading</div>;
    }
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-8">
        <Card className="bg-white/5 border-0">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="text-2xl font-bold">{website.uptime}%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                </div>
                </div>
                <Progress value={website.uptime} className="h-1.5 mt-3" />
            </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-0">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Response Time</p>
                        <p className={cn(
                        "text-2xl font-bold", 
                        website.responseTime < 300 ? "text-success" : website.responseTime < 800 ? "text-warning" : "text-danger"
                        )}>
                        {website.responseTime} ms
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Wifi className="h-5 w-5 text-primary" />
                    </div>
                </div>
                <div className="mt-3 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Avg last 24h: {latencyStats?.average || 0} ms</p>
                </div>
            </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-0">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="text-2xl font-bold">99.2%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                </div>
                <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-xs">
                <div>
                    <span className="text-muted-foreground">7 days:</span> 99.8%
                </div>
                <div>
                    <span className="text-muted-foreground">30 days:</span> 99.5%
                </div>
                </div>
            </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-0">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Server Load</p>
                    <p className={cn(
                    "text-2xl font-bold", 
                    resourceUsage?.[resourceUsage.length - 1]?.cpu < 60 ? "text-success" : 
                    resourceUsage?.[resourceUsage.length - 1]?.cpu < 80 ? "text-warning" : "text-danger"
                    )}>
                    {resourceUsage?.[resourceUsage.length - 1]?.cpu || 0}%
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Cpu className="h-5 w-5 text-primary" />
                </div>
                </div>
                <div className="mt-2">
                <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-muted-foreground">Memory:</span>
                    <span>{resourceUsage?.[resourceUsage.length - 1]?.memory || 0}%</span>
                </div>
                <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-muted-foreground">Disk:</span>
                    <span>{resourceUsage?.[resourceUsage.length - 1]?.disk || 0}%</span>
                </div>
                </div>
            </CardContent>
        </Card>
    </div>
}