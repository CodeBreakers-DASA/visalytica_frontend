// Arquivo: src/app/(mainLayout)/Home/page.js

import Link from "next/link";
import CardHome from "../../../components/CardHome";
import MeuDashboardFuncional from "../../../components/MeuDashboardFuncional";

function HomeInicial() {
  return (
    <div className="flex min-h-[calc(100vh-150px)] w-full gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 flex-col lg:flex-row">
      
      {/* Dashboard - Mobile: ordem 2, Desktop: ordem 1 */}
      <div className="flex flex-1 lg:flex-[2] flex-col rounded-2xl sm:rounded-3xl lg:rounded-[42px] border-2 border-cinza p-4 sm:p-6 lg:p-8 xl:px-16 order-2 lg:order-1">
        <h1 className="mb-4 sm:mb-6 text-center text-xl sm:text-2xl lg:text-3xl font-bold text-azul">
          DASHBOARD
        </h1>
        
        {/* Container do Dashboard com altura mínima responsiva */}
        <div className="flex-1 justify-center items-center flex min-h-[250px] xs:min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px] w-full overflow-hidden">
          <div className="w-full h-full max-w-full">
            <MeuDashboardFuncional />
          </div>
        </div>
      </div>

      {/* Cards - Mobile: ordem 1, Desktop: ordem 2 */}
      <div className="flex flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 order-1 lg:order-2">
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
