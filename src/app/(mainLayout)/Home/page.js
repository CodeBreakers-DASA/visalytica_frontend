// Arquivo: src/app/(mainLayout)/Home/page.js

import Link from "next/link";
import CardHome from "../../../components/CardHome";
import MeuDashboardFuncional from "../../../components/MeuDashboardFuncional";

function HomeInicial() {
  return (
    <div className="flex min-h-[calc(100vh-110px)] xs:min-h-[calc(100vh-115px)] sm:min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-135px)] lg:min-h-[calc(100vh-145px)] xl:min-h-[calc(100vh-151px)] w-full gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 py-2 xs:py-3 sm:py-4 md:py-5 lg:py-6 flex-col lg:flex-row">
      
      {/* Dashboard - Mobile: ordem 2, Desktop: ordem 1 */}
      <div className="flex flex-1 lg:flex-[2.2] xl:flex-[2.5] flex-col rounded-lg xs:rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[42px] border-2 border-cinza p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 order-2 lg:order-1 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
        <h1 className="mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-azul tracking-wide">
          DASHBOARD
        </h1>
        
        {/* Container do Dashboard com altura otimizada para visualização das barras */}
        <div className="flex-1 justify-center items-center flex min-h-[200px] xs:min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] xl:min-h-[420px] w-full overflow-hidden">
          <div className="w-full h-full max-w-full">
            <MeuDashboardFuncional />
          </div>
        </div>
      </div>

      {/* Cards - Mobile: ordem 1, Desktop: ordem 2 */}
      <div className="flex flex-1 lg:flex-[0.9] xl:flex-[0.8] flex-col gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 order-1 lg:order-2">
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
