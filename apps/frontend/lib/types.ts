export interface WebsiteData {
    id: string;
    title: string;
    url: string;
    status: string;
    responseTime: number;
    CheckedAt: string;
}

export type LatencyData = {
    value: number;
    time: string;
}

export interface HealthHistoryData {
    time: string;
    status: string;
}

export interface latencyStats {
    average: number;
    max: number;
    min: number;
}

export interface LoadTimeData {
    time: string;
    html: number;
    resources: number;
    ttfb: number;
}

export interface ResourceUsageData {
    time: string;
    cpu: number;
    memory: number;
    disk: number;
}

export interface WebsiteWithUptime {
    title: string;
    url: string;
    status: string;
    CheckedAt: string;
    uptime: number;
    responseTime: number;
}