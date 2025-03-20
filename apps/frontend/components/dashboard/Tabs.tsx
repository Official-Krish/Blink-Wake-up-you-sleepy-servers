import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./Overview";
import Performance from "./Performance";
import Resources from "./Resources";
import Health from "./Health";
import { HealthHistoryData, LatencyData, latencyStats, LoadTimeData, ResourceUsageData } from "@/lib/types";

export default function DashboardTabs({ healthHistory, latencyData, latencyStats, resourceUsage, timeRange, loadTime }: { healthHistory: HealthHistoryData[], latencyData: LatencyData[], latencyStats: latencyStats, resourceUsage: ResourceUsageData[], timeRange: string, loadTime: LoadTimeData[] }) {
    return <div>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Overview healthHistory={healthHistory} latencyStats={latencyStats} timeRange={timeRange} latencyData={latencyData} />
          </TabsContent>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Performance loadTime={loadTime} />
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Resources resourceUsage={resourceUsage} />
          </TabsContent>
          
          {/* Health Tab */}
          <TabsContent value="health" className="space-y-6">
            <Health timeRange={timeRange} />
          </TabsContent>
        </Tabs>
    </div>
}