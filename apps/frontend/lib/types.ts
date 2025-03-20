export interface WebsiteData {
    id: string;
    title: string;
    url: string;
    status: string;
    responseTime: number;
    CheckedAt: string;
}

export type LatencyData = {
    responseTime: number;
    CheckedAt: string;
}

export interface HealthHistoryData {
    time: string;
    status: string;
}