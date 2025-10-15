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

const data = new Date();

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
    <div className="h-screen w-full flex flex-col justify-between py-6">
      <div className="flex flex-col flex-1 gap-5 rounded-lg">
        <div className="flex-[0.5] flex gap-16 bg-white rounded-lg py-10 px-12">
          <MenuDashboardFuncional
            title={
              <p>
                Análises feitas por{" "}
                <span className="text-azul font-semibold">
                  {user?.nome || "usuário"}
                </span>
              </p>
            }
            data={analiseData}
            dataKey="value"
          />
          <div className="bg-cinza_medio h-full w-0.5"></div>
          <div className="w-1/2">
            <h2 className="text-center text-cinza_escuro">quantidade<br/>realizada em<br/><span className="text-azul font-semibold text-3xl uppercase">{data.toLocaleString('pt-BR', { month: 'long' })}:</span></h2>
            <p>{analiseData[analiseData.length - 1].value}</p>
          </div>
        </div>

        <div className="flex-[0.5] bg-white rounded-lg py-10 px-12">
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
