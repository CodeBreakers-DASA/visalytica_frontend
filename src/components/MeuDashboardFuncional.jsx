"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function MenuDashboardFuncional({
  title,
  data,
  dataKey,
  gradient = false,
  formatter,
}) {
  
  //Pega ultimos 6
  const dataFiltrada = data.slice(-6)
  
  return (
    <Card className="flex flex-1 flex-col min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-[250px]">
      <CardHeader className="pb-2 xs:pb-3 sm:pb-4">
        <CardDescription className="text-xs xs:text-sm sm:text-base">
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-1 xs:p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5 pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataFiltrada} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            {gradient && (
              <defs>
                <linearGradient id="gradienteBarra" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A279C" />
                  <stop offset="95%" stopColor="#166DED" />
                </linearGradient>
              </defs>
            )}

            <XAxis
              dataKey="month"
              stroke="#888"
              className="text-sm"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888"
              className="text-sm"
              tickLine={false}
              axisLine={false}
              tickFormatter={formatter}
              width={30}
            />
            <Tooltip
              contentStyle={{
                fontSize: "12px",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              formatter={formatter}
            />
            <Bar
              dataKey={dataKey}
              fill={gradient ? "url(#gradienteBarra)" : "#79ABF5"}
              radius={[6, 6, 6, 6]}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
