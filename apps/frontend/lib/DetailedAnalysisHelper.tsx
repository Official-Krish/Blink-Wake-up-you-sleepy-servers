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
  

export function findClosestDataPoint(
  data: HealthHistoryData[], 
  targetTime: Date,
  maxTimeThreshold: number = 30 * 60 * 1000 // Default 30 minutes in milliseconds
): HealthHistoryData | { status: 'unknown' } {
  if (!data || data.length === 0) return { status: 'unknown' };
  
  // Ensure targetTime is properly handled
  const targetTimeMs = targetTime.getTime();
  
  let closest: HealthHistoryData | null = null;
  let minDiff = Infinity;
  
  // Find the closest data point
  for (const point of data) {
    const currentDate = new Date(point.time);
    const currentTimeMs = currentDate.getTime();
    const diff = Math.abs(currentTimeMs - targetTimeMs);
    
    if (diff < minDiff) {
      minDiff = diff;
      closest = point;
    }
  }
  
  // Return unknown if no point found or if closest point is too far away
  if (!closest || minDiff > maxTimeThreshold) {
    return { status: 'unknown' };
  }
  
  return closest;
}

export function findClosestDataPoint2(data: LatencyData[], targetTime: Date, maxTimeThreshold: number = 30 * 60 * 1000): LatencyData | null {
  if (!data || data.length === 0) return { time: targetTime.toISOString(), value: 0 };
  
  // Ensure targetTime is properly handled
  const targetTimeMs = targetTime.getTime();
  
  let closest: LatencyData | null = null;
  let minDiff = Infinity;
  
  // Find the closest data point
  for (const point of data) {
    const currentDate = new Date(point.time);
    const currentTimeMs = currentDate.getTime();
    const diff = Math.abs(currentTimeMs - targetTimeMs);
    
    if (diff < minDiff) {
      minDiff = diff;
      closest = point;
    }
  }
  
  if (!closest || minDiff > maxTimeThreshold) {
    return { value: 0, time: targetTime.toISOString() };
  }
  
  return closest;
}

export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + 
         date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) {
    return diffMins === 0 ? 'Just now' : `${diffMins}m ago`;
  } else {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}