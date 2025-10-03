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

export default function MeuDashboardFuncional() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const [analiseData, setAnaliseData] = useState([]);
  const [comparativoData, setComparativoData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && user) {
      const fetchData = async () => {
        try {
          const [analiseResponse, comparativoResponse] = await Promise.all([
            api.get("/medicos/stats/monthly-count"),
            api.get("/medicos/stats/global-monthly-count"),
          ]);

          const formattedAnalise = analiseResponse.data
            .map((item) => ({
              month: getMonthName(item.month),
              value: item.count,
            }))
            .reverse();

          const formattedComparativo = comparativoResponse.data
            .map((item) => ({
              month: getMonthName(item.month),
              manual: item.manual,
              visalytica: item.visalytica,
            }))
            .reverse();

          setAnaliseData(formattedAnalise);
          setComparativoData(formattedComparativo);
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
      <div className="flex justify-center items-center w-full h-full min-h-[200px] xs:min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] xl:min-h-[420px]">
        <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 border-2 xs:border-[2.5px] sm:border-3 md:border-[3.5px] lg:border-4 border-azul border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full mx-auto gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-5">
      
      {/* Primeiro Card - Análises do Usuário */}
      <Card className="flex flex-1 flex-col min-h-[140px] xs:min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[220px] xl:min-h-[240px] shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl">
        <CardHeader className="pb-1 xs:pb-1.5 sm:pb-2 md:pb-2.5 lg:pb-3 p-1.5 xs:p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5">
          <CardDescription className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-tight text-gray-600">
            Análises feita por{" "}
            <span className="font-bold text-azul">
              {user?.nome || "usuário"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-1 xs:p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analiseData} margin={{ top: 10, right: 15, left: 10, bottom: 10 }} className="text-xs">
              <XAxis
                dataKey="month"
                stroke="#888"
                fontSize={7}
                className="xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 7 }}
              />
              <YAxis
                stroke="#888"
                fontSize={7}
                className="xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 7 }}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  fontSize: '8px',
                  padding: '3px 5px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  backgroundColor: 'white'
                }}
                className="xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm"
                animationDuration={150}
              />
              <Bar 
                dataKey="value" 
                fill="#79ABF5" 
                radius={[1, 1, 1, 1]} 
                className="xs:radius-[2,2,2,2] sm:radius-[3,3,3,3] md:radius-[4,4,4,4] lg:radius-[5,5,5,5] xl:radius-[6,6,6,6]"
                animationDuration={600}
                animationBegin={0}
                maxBarSize={window.innerWidth < 640 ? 15 : window.innerWidth < 768 ? 20 : 25}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Divisor ultra-responsivo */}
      <div className="flex justify-center my-0.5 xs:my-1 sm:my-1.5 md:my-2">
        <span className="border-b border-gray-300 w-1/2 xs:w-2/3 sm:w-3/4 md:w-4/5 lg:w-3/4 xl:w-2/3" />
      </div>

      {/* Segundo Card - Comparativo */}
      <Card className="flex flex-1 flex-col min-h-[140px] xs:min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[220px] xl:min-h-[240px] shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl">
        <CardHeader className="pb-1 xs:pb-1.5 sm:pb-2 md:pb-2.5 lg:pb-3 p-1.5 xs:p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5">
          <CardDescription className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-tight text-gray-600">
            Comparativo: <span className="font-bold text-azul">Visalytica</span>{" "}
            x medições manuais
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-1 xs:p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativoData} margin={{ top: 10, right: 15, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="gradienteBarra" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A279C" />
                  <stop offset="95%" stopColor="#166DED" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="#888"
                fontSize={7}
                className="xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 7 }}
              />
              <YAxis
                stroke="#888"
                fontSize={7}
                className="xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 7 }}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  fontSize: '8px',
                  padding: '3px 5px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  backgroundColor: 'white'
                }}
                className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm"
                animationDuration={150}
              />
              <Legend 
                iconType="circle" 
                wrapperStyle={{ 
                  fontSize: '8px',
                  paddingTop: '2px'
                }}
                className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm"
              />
              <Bar 
                dataKey="manual" 
                fill="#959CA6" 
                radius={[1, 1, 1, 1]} 
                className="xs:radius-[2,2,2,2] sm:radius-[3,3,3,3] md:radius-[4,4,4,4] lg:radius-[5,5,5,5]"
                animationDuration={600}
                animationBegin={0}
                maxBarSize={window.innerWidth < 640 ? 12 : window.innerWidth < 768 ? 16 : 20}
              />
              <Bar
                dataKey="visalytica"
                fill="url(#gradienteBarra)"
                radius={[1, 1, 1, 1]}
                className="xs:radius-[2,2,2,2] sm:radius-[3,3,3,3] md:radius-[4,4,4,4] lg:radius-[5,5,5,5]"
                animationDuration={600}
                animationBegin={100}
                maxBarSize={window.innerWidth < 640 ? 12 : window.innerWidth < 768 ? 16 : 20}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
