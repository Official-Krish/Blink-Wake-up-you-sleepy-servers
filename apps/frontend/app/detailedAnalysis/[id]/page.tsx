"use client"
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { calculateLatencyStats, findClosestDataPoint } from '@/lib/DetailedAnalysisHelper';
import { useParams } from 'next/navigation';
import TopBar from '@/components/dashboard/TopBar';
import MetricCard from '@/components/dashboard/MetricsCard';
import DashboardTabs from '@/components/dashboard/Tabs';
import axios from 'axios';
import { LatencyData, WebsiteData } from '@/lib/types';

const WebsiteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [website, setWebsite] = useState<WebsiteData[]>([]);
  const [latencyData, setLatencyData] = useState<LatencyData[]>([]);
  const [latencyStats, setLatencyStats] = useState<any>(null);
  const [healthHistory, setHealthHistory] = useState<any[]>([]);
  const [resourceUsage, setResourceUsage] = useState<any[]>([]);
  const [loadTime, setLoadTime] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [websiteData, setWebsiteData] = useState<any>(null);

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
    setLatencyData(website.map((site: WebsiteData) => {
      return {
        responseTime: site.responseTime,
        CheckedAt: site.CheckedAt
      }
    }));

    const latencyStats: number[] = website.map((site: WebsiteData) => {
      return site.responseTime
    });
    setLatencyStats(calculateLatencyStats(latencyStats.map(stat => ({ value: stat }))));
    


    // Generate health history (up/down/degraded status over time)
    const hourMultiplier = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
    const dataPoints = timeRange === '24h' ? 24 : timeRange === '7d' ? 28 : 30;
    const healthData = [];
    
    for (let i = dataPoints; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - (i * hourMultiplier));
      
      // Find the closest data point in time from the API data
      const closestDataPoint = findClosestDataPoint(website, time);
      
      healthData.push({
        time: timeRange === '24h' 
          ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : time.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        status: closestDataPoint?.status || 'unknown'
      });
    }


    setHealthHistory(healthData);
    
    // Generate resource usage data (CPU, Memory, Disk)
    const resourceData = [];
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
    
    // Generate page load time data
    const loadTimeData = [];
    for (let i = dataPoints; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - (i * hourMultiplier));
      
      // Find the closest data point in time
      const closestDataPoint = findClosestDataPoint(website, time);
      
      loadTimeData.push({
        time: timeRange === '24h' 
          ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : time.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        html: closestDataPoint ? Math.floor(closestDataPoint.responseTime * 0.3) : 300,
        resources: closestDataPoint ? Math.floor(closestDataPoint.responseTime * 0.6) : 600,
        ttfb: closestDataPoint ? Math.floor(closestDataPoint.responseTime * 0.1) : 100
      });
    }
    setLoadTime(loadTimeData);

    const upTime = website.filter(w => w.status === 'UP').length;
    const totalMonitors = website.length;
    console.log("uptime", (upTime / totalMonitors) * 100);
    setWebsiteData({ 
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
        <MetricCard website={websiteData} latencyStats={latencyStats} resourceUsage={resourceUsage} />
        
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
        <DashboardTabs healthHistory={healthHistory} latencyData={latencyData} latencyStats={latencyStats} resourceUsage={resourceUsage} timeRange={timeRange} loadTime={loadTime} />
        
      </div>
    </DashboardLayout>
  );
};

export default WebsiteDetails;