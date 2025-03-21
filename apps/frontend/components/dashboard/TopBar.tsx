import { AlertTriangle, CheckCircle, Clock, ExternalLink, Globe, XCircle } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { formatDateTime, formatRelativeTime } from "@/lib/DetailedAnalysisHelper";

interface Website {
    title: string;
    url: string;
    status: string;
    CheckedAt: string;
}

export default function TopBar({ website }: { website: Website }) {
    if (!website) {
        return <div>Loading</div>;
    }
    return <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10">
    <div className="flex items-center gap-3">
      <div>
        <h1 className="text-2xl font-bold">GETTING STARTED</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <a 
            onClick={() => window.open(website.url)}
            className="hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer"
          >
            {website.url}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <StatusIndicator website={website} />
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span>Last checked: {formatRelativeTime(website.CheckedAt)}</span>
      </div>
    </div>
  </div>
}

const StatusIndicator = ({ website }: { website: Website }) => {
    switch (website.status) {
      case 'UP':
        return (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <Badge variant="outline" className="bg-success/20 text-success border-success/20">Online</Badge>
          </div>
        );
      case 'DOWN':
        return (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-danger" />
            <Badge variant="outline" className="bg-danger/20 text-danger border-danger/20">Offline</Badge>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <Badge variant="outline" className="bg-warning/20 text-warning border-warning/20">Degraded</Badge>
          </div>
        );
    }
  };