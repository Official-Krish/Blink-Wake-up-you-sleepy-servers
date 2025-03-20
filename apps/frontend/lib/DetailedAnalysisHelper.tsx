import { HealthHistoryData, LatencyData, WebsiteData } from "@/lib/types";
  
  export const serverData = [
    {
      id: '1',
      name: 'Web Server 01',
      status: 'online',
      location: 'US East',
      cpu: 45,
      memory: 62,
      disk: 78,
      lastRestart: '7 days ago'
    },
    {
      id: '2',
      name: 'API Server 01',
      status: 'online',
      location: 'US East',
      cpu: 32,
      memory: 54,
      disk: 42,
      lastRestart: '14 days ago'
    },
    {
      id: '3',
      name: 'Database Server',
      status: 'degraded',
      location: 'US West',
      cpu: 92,
      memory: 88,
      disk: 76,
      lastRestart: '2 days ago'
    },
    {
      id: '4',
      name: 'CDN Server 01',
      status: 'online',
      location: 'Europe',
      cpu: 28,
      memory: 45,
      disk: 36,
      lastRestart: '30 days ago'
    },
    {
      id: '5',
      name: 'Backup Server',
      status: 'offline',
      location: 'Asia',
      cpu: 0,
      memory: 0,
      disk: 94,
      lastRestart: '1 hour ago'
    }
  ] as const;
  
  // Overall status data
  export function statusData (websiteData: WebsiteData[]) {
    return {
      totalMonitors: websiteData.length,
      monitorsUp: websiteData.filter(w => w.status === 'up').length,
      monitorsDown: websiteData.filter(w => w.status === 'down').length,
      monitorsWarning: websiteData.filter(w => w.status === 'pending').length,
    }
  };
  
  // Calculate latency statistics
  export function calculateLatencyStats (data: number[]) {
    return {
      max: Math.max(...data),
      min: Math.min(...data),
      average: Math.round(data.reduce((sum, val) => sum + val, 0) / data.length)
    };
  };
  

export function findClosestDataPoint(data: HealthHistoryData[], targetTime: Date): HealthHistoryData | null {
    if (!data || data.length === 0) return null;
    
    // Ensure targetTime is properly handled
    const targetTimeMs = targetTime.getTime();
    
    return data.reduce((closest, current) => {
      // Explicitly parse the ISO string to ensure consistent handling
      const currentDate = new Date(current.time);
      const currentTimeMs = currentDate.getTime();
      
      if (!closest) return current;
      
      const closestDate = new Date(closest.time);
      const closestTimeMs = closestDate.getTime();
      
      const currentDiff = Math.abs(currentTimeMs - targetTimeMs);
      const closestDiff = Math.abs(closestTimeMs - targetTimeMs);
      
      return currentDiff < closestDiff ? current : closest;
    }, null as HealthHistoryData | null);
}

export function findClosestDataPoint2(data: LatencyData[], targetTime: Date): LatencyData | null {
  if (!data || data.length === 0) return null;
  
  // Ensure targetTime is properly handled
  const targetTimeMs = targetTime.getTime();
  
  return data.reduce((closest, current) => {
    // Explicitly parse the ISO string to ensure consistent handling
    const currentDate = new Date(current.time);
    const currentTimeMs = currentDate.getTime();
    
    if (!closest) return current;
    
    const closestDate = new Date(closest.time);
    const closestTimeMs = closestDate.getTime();
    
    const currentDiff = Math.abs(currentTimeMs - targetTimeMs);
    const closestDiff = Math.abs(closestTimeMs - targetTimeMs);
    
    return currentDiff < closestDiff ? current : closest;
  }, null as LatencyData | null);
}

export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}