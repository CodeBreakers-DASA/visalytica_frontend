import Link from "next/link";
import CardHome from "../../../components/CardHome";

function HomeInicial() {
  return (
    <div>
      <CardHome
        href={"/Analise"}
        invertido
        nome="Fazer análise"
        alt=""
        imagem="./analise.png"
      />
      <CardHome
        href={"/ConsultarPacientes"}
        nome="Consultar pacientes"
        alt=""
        imagem="./consultar.png"
      />
    </div>
  );
}

export default HomeInicial;
