"use client";

import { useEffect, useState } from "react"; // NOVO
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
    return <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  }
  return (
    <div className="flex flex-col h-full w-full mx-auto">
      <Card className="flex flex-1 flex-col">
        <CardHeader>
          <CardDescription className="text-base">
            Análises feita por{" "}
            <span className="font-bold text-azul">
              {user?.nome || "usuário"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analiseData}>
              <XAxis
                dataKey="month"
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#79ABF5" radius={[10, 10, 10, 10]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <span className="border-b border-cinza w-4/5 self-center" />

      <Card className="flex flex-1 flex-col">
        <CardHeader>
          <CardDescription className="text-base">
            Comparativo: <span className="font-bold text-azul">Visalytica</span>{" "}
            x medições manuais
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativoData}>
              <defs>
                <linearGradient id="gradienteBarra" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A279C" />
                  <stop offset="95%" stopColor="#166DED" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Legend iconType="circle" />
              <Bar dataKey="manual" fill="#959CA6" radius={[10, 10, 10, 10]} />
              <Bar
                dataKey="visalytica"
                fill="url(#gradienteBarra)"
                radius={[10, 10, 10, 10]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
