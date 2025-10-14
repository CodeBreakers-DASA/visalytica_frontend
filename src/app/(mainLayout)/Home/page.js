"use client";

import { useEffect, useState } from "react";
import MenuDashboardFuncional from "../../../components/MeuDashboardFuncional";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";

const getMonthName = (monthNumber) => {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  return months[monthNumber - 1];
};

const formatTimeFromMinutes = (decimalMinutes) => {
  if (typeof decimalMinutes !== "number" || decimalMinutes < 0) return "0:00";
  const totalSeconds = Math.round(decimalMinutes * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

function HomeInicial() {

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

          setAnaliseData(
            analiseResponse.data.map((item) => ({
              month: getMonthName(item.month),
              value: item.count,
            }))
          );

          setTempoMedioData(
            tempoMedioResponse.data.map((item) => ({
              month: getMonthName(item.mes),
              "Tempo Médio (min)": parseFloat(item.mediaTempoMinutos.toFixed(2)),
            }))
          );
        } catch (err) {
          console.error("Erro ao buscar dados:", err);
        } finally {
          setIsDataLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthLoading, user]);

  if (isAuthLoading || isDataLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-azul border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-110px)] xs:min-h-[calc(100vh-115px)] sm:min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-135px)] lg:min-h-[calc(100vh-145px)] xl:min-h-[calc(100vh-151px)] w-full gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 py-2 xs:py-3 sm:py-4 md:py-5 lg:py-6 flex-col lg:flex-row">

      <div className="flex flex-1 lg:flex-[2.2] xl:flex-[2.5] flex-col rounded-2xl xs:rounded-3xl sm:rounded-3xl md:rounded-[42px] border-2 border-cinza p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 order-2 lg:order-1 bg-white">
        <h1 className="mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-azul tracking-wide">
          DASHBOARD
        </h1>

        <div className="flex flex-col h-full w-full mx-auto gap-4">
      <MenuDashboardFuncional
        title={`Análises feitas por ${user?.nome || "usuário"}`}
        data={analiseData}
        dataKey="value"
      />

      <span className="border-b border-cinza w-3/4 xs:w-4/5 self-center my-2" />

      <MenuDashboardFuncional
        title="Tempo Médio de Análise por Mês"
        data={tempoMedioData}
        dataKey="Tempo Médio (min)"
        gradient
        formatter={formatTimeFromMinutes}
      />
    </div>

      </div>
    </div>
  );
}

export default HomeInicial;
