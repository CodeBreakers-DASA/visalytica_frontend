// Arquivo: src/app/(mainLayout)/Home/page.js

import Link from "next/link";
import CardHome from "../../../components/CardHome";
import DashboardLoader from "../../../components/DashboardLoader";

function HomeInicial() {
  return (
    <div className="flex h-[calc(100dvh-125px)] w-full gap-8 px-6 mb-6 md:mb-0 md:px-16 flex-col lg:flex-row">
      
      <div className="flex flex-[2] flex-col rounded-[42px] border-2 border-cinza p-8 md:px-16">
        <h1 className="mb-2 text-center text-3xl font-bold text-azul">
          DASHBOARD
        </h1>
        <div className="flex-1">
          <DashboardLoader />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <CardHome
          href={"/Analise"}
          invertido
          nome="Fazer análise"
          alt="Ícone representando a análise de dados"
          imagem="/analise.png"
        />
        <CardHome
          href={"/ConsultarPacientes"}
          nome="Consultar pacientes"
          alt="Ícone representando a consulta de pacientes"
          imagem="/consultar.png"
        />
      </div>
    </div>
  );
}

export default HomeInicial;
