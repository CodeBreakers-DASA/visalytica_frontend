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
  console.log(dataFiltrada);
  
  
  return (
    <Card className="flex flex-1 flex-col h-full ">
      <CardHeader className="pb-5 pl-14">
        <CardDescription className="text-cinza_escuro text-[16px]">
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
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
              width={40}
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
              fill={gradient ? "url(#gradienteBarra)" : "#716FEA"}
              radius={[6, 6, 6, 6]}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
