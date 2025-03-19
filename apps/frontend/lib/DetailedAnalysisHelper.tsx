import { WebsiteData } from "@/lib/types";
  
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
  export const calculateLatencyStats = (data: { value: number }[]) => {
    const values = data.map(item => item.value);
    
    return {
      average: Math.round(values.reduce((sum, val) => sum + val, 0) / values.length),
      max: Math.max(...values),
      min: Math.min(...values)
    };
  };
  

export function findClosestDataPoint (data: WebsiteData[], targetTime: Date): WebsiteData | null {
    if (!data || data.length === 0) return null;
    
    return data.reduce((closest, current) => {
      const currentDate = new Date(current.CheckedAt);
      const closestDate = closest ? new Date(closest.CheckedAt) : null;
      
      if (!closestDate) return current;
      
      const currentDiff = Math.abs(currentDate.getTime() - targetTime.getTime());
      const closestDiff = Math.abs(closestDate.getTime() - targetTime.getTime());
      
      return currentDiff < closestDiff ? current : closest;
    }, null as WebsiteData | null);
  };