"use client"
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { calculateLatencyStats, findClosestDataPoint, findClosestDataPoint2, formatTime } from '@/lib/DetailedAnalysisHelper';
import { useParams } from 'next/navigation';
import TopBar from '@/components/dashboard/TopBar';
import MetricCard from '@/components/dashboard/MetricsCard';
import DashboardTabs from '@/components/dashboard/Tabs';
import axios from 'axios';
import { HealthHistoryData, LatencyData, latencyStats, LoadTimeData, ResourceUsageData, WebsiteData, WebsiteWithUptime } from '@/lib/types';

const WebsiteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [website, setWebsite] = useState<WebsiteData[]>([]);
  const [latencyData, setLatencyData] = useState<LatencyData[]>([]);
  const [latencyStats, setLatencyStats] = useState<latencyStats>();
  const [healthHistory, setHealthHistory] = useState<HealthHistoryData[]>([]);
  const [resourceUsage, setResourceUsage] = useState<ResourceUsageData[]>([]);
  const [loadTime, setLoadTime] = useState<LoadTimeData[]>([]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [websiteWithUptime, setWebsiteDataWithUptime] = useState<WebsiteWithUptime>();

  async function getWebsiteDetails() {
    try {
      const res = await axios.get(`/api/getWebsiteDetails?websiteId=${id}`);
      setWebsite(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    console.log("fetching website details");
    getWebsiteDetails();
  }, [id]);
  
  useEffect(() => {
    const hourMultiplier = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
    const dataPoints = timeRange === '24h' ? 24 : timeRange === '7d' ? 28 : 30;

    const latencyData: LatencyData[] = [];
    website.map((site: WebsiteData) => {
      latencyData.push({
        value: site.responseTime,
        time: site.CheckedAt
      })
    });

    const LatencyData: LatencyData[] = [];
    for (let i = dataPoints; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - (i * hourMultiplier));
      
      // Find the closest data point in time from the API data
      const closestDataPoint = findClosestDataPoint2(latencyData, time);
      
      LatencyData.push({
        value: closestDataPoint ? closestDataPoint.value : 0,
        time: formatTime(closestDataPoint?.time || time.toISOString()) 
      });
    }
    setLatencyData(LatencyData);

    const latencyStatsData: number[] = [];
    website.map((site: WebsiteData) => {
      latencyStatsData.push(site.responseTime);
    });
    setLatencyStats(calculateLatencyStats(latencyStatsData));
    


    // Generate health history (up/down/degraded status over time)
    const data: HealthHistoryData[] = [];
    website.map((site: WebsiteData) => {
      if (site.status === 'UP') {
        data.push({
          time: site.CheckedAt,
          status: 'Up'
        });
      } else if (site.status === 'DOWN') {
        data.push({
          time: site.CheckedAt,
          status: 'Down'
        });
      } else if (site.status === 'UNKNOWN') {
        data.push({
          time: site.CheckedAt,
          status: 'Unknown'
        });
      }
    });
    const healthData: HealthHistoryData[] = [];
    
    for (let i = dataPoints; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - (i * hourMultiplier));
      
      // Find the closest data point in time from the API data
      const closestDataPoint = findClosestDataPoint(data, time);
      
      healthData.push({
        time: timeRange === '24h' 
          ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : time.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        status: closestDataPoint?.status || 'unknown'
      });
    }

    setHealthHistory(healthData);
    
    // Generate resource usage data (CPU, Memory, Disk)
    //TODO: Replace with actual data from the API
    const resourceData: ResourceUsageData[] = [];
    for (let i = dataPoints; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - (i * hourMultiplier));
      
      resourceData.push({
        time: timeRange === '24h' 
          ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : time.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        cpu: Math.floor(Math.random() * 60) + 20,
        memory: Math.floor(Math.random() * 40) + 40,
        disk: Math.floor(Math.random() * 30) + 60
      });
    }
    setResourceUsage(resourceData);
    
    //TODO: Replace with actual data from the API
    const loadTimeData: LoadTimeData[] = [];
    for (let i = dataPoints; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - (i * hourMultiplier));
      
      loadTimeData.push({
        time: timeRange === '24h' 
          ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : time.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        html: Math.floor(Math.random() * 400) + 200,
        resources: Math.floor(Math.random() * 800) + 400,
        ttfb: Math.floor(Math.random() * 150) + 50
      });
    }
    setLoadTime(loadTimeData);

    const upTime = website.filter(w => w.status === 'UP').length;
    const totalMonitors = website.length;
    setWebsiteDataWithUptime({ 
      ...website[0],
      uptime: (upTime / totalMonitors) * 100,
    });

  }, [id, timeRange, website]);
  
  if (!website) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout> 
      <div className="space-y-6">
        {/* Header with back button, website name, and status */}
        <TopBar website={website[0]} />
        
        {/* Top metrics cards */}
        <MetricCard website={websiteWithUptime!} latencyStats={latencyStats!} resourceUsage={resourceUsage} />
        
        {/* Time range selector */}
        <div className="flex justify-end">
          <div className="inline-flex p-1 bg-white/10 rounded-lg">
            <Button 
              variant="ghost" 
              size="sm"
              className={timeRange === '24h' ? 'bg-white/20' : 'hover:bg-white/10'}
              onClick={() => setTimeRange('24h')}
            >
              24h
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className={timeRange === '7d' ? 'bg-white/20' : 'hover:bg-white/10'}
              onClick={() => setTimeRange('7d')}
            >
              7d
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className={timeRange === '30d' ? 'bg-white/20' : 'hover:bg-white/10'}
              onClick={() => setTimeRange('30d')}
            >
              30d
            </Button>
          </div>
        </div>
        
        {/* Tabs for different charts and metrics */}
        <DashboardTabs healthHistory={healthHistory} latencyData={latencyData} latencyStats={latencyStats!} resourceUsage={resourceUsage} timeRange={timeRange} loadTime={loadTime} />
        
      </div>
    </DashboardLayout>
  );
};

export default WebsiteDetails;