"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const getMonthName = (monthNumber) => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return months[monthNumber - 1];
};

const formatTimeFromMinutes = (decimalMinutes) => {
  if (typeof decimalMinutes !== "number" || decimalMinutes < 0) {
    return "0:00";
  }
  const totalSeconds = Math.round(decimalMinutes * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
};

export default function MeuDashboardFuncional() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const [analiseData, setAnaliseData] = useState([]);
  const [tempoMedioData, setTempoMedioData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && user) {
      const fetchData = async () => {
        try {
          const [analiseResponse, tempoMedioResponse] = await Promise.all([
            api.get("/medicos/stats/monthly-count"),
            api.get("/amostras/media-tempo-mensal"),
          ]);

          const formattedAnalise = analiseResponse.data.map((item) => ({
            month: getMonthName(item.month),
            value: item.count,
          }));

          const formattedTempoMedio = tempoMedioResponse.data.map((item) => ({
            month: getMonthName(item.mes),
            "Tempo Médio (min)": parseFloat(item.mediaTempoMinutos.toFixed(2)),
          }));

          setAnaliseData(formattedAnalise);
          setTempoMedioData(formattedTempoMedio);
        } catch (error) {
          console.error("Erro ao buscar dados para os gráficos:", error);
        } finally {
          setIsDataLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthLoading, user]);

  if (isAuthLoading || isDataLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[200px] xs:min-h-[250px] sm:min-h-[300px]">
        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full mx-auto gap-2 xs:gap-3 sm:gap-4">
      <Card className="flex flex-1 flex-col min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-[250px]">
        <CardHeader className="pb-2 xs:pb-3 sm:pb-4">
          <CardDescription className="text-xs xs:text-sm sm:text-base">
            Análises feita por{" "}
            <span className="font-bold text-azul">
              {user?.nome || "usuário"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-2 xs:p-3 sm:p-4 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={analiseData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                stroke="#888"
                fontSize={10}
                className="xs:text-xs sm:text-sm"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888"
                fontSize={10}
                className="xs:text-xs sm:text-sm"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: "12px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <Bar
                dataKey="value"
                fill="#79ABF5"
                radius={[6, 6, 6, 6]}
                className="xs:radius-[8,8,8,8] sm:radius-[10,10,10,10]"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <span className="border-b border-cinza w-3/4 xs:w-4/5 self-center my-1 xs:my-2" />

      <Card className="flex flex-1 flex-col min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-[250px]">
        <CardHeader className="pb-2 xs:pb-3 sm:pb-4">
          <CardDescription className="text-xs xs:text-sm sm:text-base">
            Tempo Médio de Análise por Mês
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-2 xs:p-3 sm:p-4 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={tempoMedioData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="gradienteBarra" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A279C" />
                  <stop offset="95%" stopColor="#166DED" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="#888"
                fontSize={10}
                className="xs:text-xs sm:text-sm"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888"
                fontSize={10}
                className="xs:text-xs sm:text-sm"
                tickLine={false}
                axisLine={false}
                tickFormatter={formatTimeFromMinutes}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  fontSize: "12px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                formatter={(value) => formatTimeFromMinutes(value)}
              />
              <Bar
                dataKey="Tempo Médio (min)"
                fill="url(#gradienteBarra)"
                radius={[6, 6, 6, 6]}
                className="xs:radius-[8,8,8,8] sm:radius-[10,10,10,10]"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
