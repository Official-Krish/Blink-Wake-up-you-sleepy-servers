import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LatencyData } from "@/lib/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LatencyChartProps {
  title: string;
  data: LatencyData[];
  average: number;
  max: number;
  min: number;
}

export const LatencyChart: React.FC<LatencyChartProps> = ({
  title,
  data,
  average,
  max,
  min,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md text-xs">
          <p className="text-muted-foreground">{`${label}`}</p>
          <p className="font-semibold">{`${payload[0].value} ms`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <Card className="border-0 bg-white/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div>
          {data.map((point, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground text-white">{point.CheckedAt}</p>
              <p className="text-lg font-medium text-white">{point.responseTime} ms</p>
            </div>
          ))}
        </div> */}
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                domain={[0, 'dataMax + 100']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-lg font-medium">{average} ms</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Max</p>
            <p className="text-lg font-medium">{max} ms</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Min</p>
            <p className="text-lg font-medium">{min} ms</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
