'use client'

import { Pencil, Trash2, Upload } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import DownloadPDF from "./pdf/DownloadPDF"; // seu componente PDF
import { useRouter } from "next/navigation";
import Popup from "./Popup";

export default function CardExame({ exame, paciente }) {
  const router = useRouter();

  // Download do PDF
  const handleDownload = async () => {
    console.log(exame);

    try {
      const blob = await pdf(
        <DownloadPDF dados={{ ...exame, paciente }} configuracao={{}} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analise-${exame.nomeAmostra}-${paciente.nome}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    }
  };

  const handleEdit = async () => {
    router.push(
      `/GeraPDF?${new URLSearchParams({
        cpf: paciente.cpf,
        nomePaciente: paciente.nome,
        dataNascimento: paciente.dataNascimento,
        nomePeca: exame.nomeAmostra,
        comprimento: exame.comprimento,
        largura: exame.largura,
        altura: exame.altura,
        diagnostico: exame.possivelDiagnostico,
        observacoes: exame.observacoes,
        modo: "edit",
        id: exame.id,
      }).toString()}`
    );
  };

  const handleDelete = () => {
    console.log(`Deletar exame ${exame.id} do paciente ${paciente.nome}`);
    // Implementar lógica de exclusão
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';

    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow w-full min-h-[284px] flex flex-col">
      <div className="bg-gradient-to-r from-azul to-azul_escuro text-white text-center py-2.5 px-4 rounded-t-2xl">
        <h3 className="font-semibold text-base">Nº exame: {exame.numeroExame}</h3>
      </div>

      <div className="flex-1 px-6 pt-4 pb-0 space-y-2 text-base">
        <div>
          <span className="text-black font-bold">Data realização: </span>
          <span className="text-black">{formatarData(exame.dataCriacao)}</span>
        </div>

        <div>
          <span className="text-black font-bold">Data atualização: </span>
          <span className="text-black">{formatarData(exame.dataAtualizacao)}</span>
        </div>

        <div>
          <span className="text-black font-bold">Dr(a): </span>
          <span className="text-black">{exame.medico.nome}</span>
        </div>

        <div>
          <span className="text-black font-bold">Peça: </span>
          <span className="text-black">{exame.nomeAmostra}</span>
        </div>

        <div>
          <span className="text-black font-bold">Possível diagnóstico: </span>
          <span className="text-black">{exame.possivelDiagnostico}</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 pb-4 pt-2">
        <button
          onClick={handleDownload}
          className="w-[39px] h-[39px] bg-azul text-white rounded-[10px] hover:bg-blue-700 transition-colors flex items-center justify-center"
          aria-label="Upload do Exame"
          title="Upload"
        >
          <Upload size={18} />
        </button>

        <button
          onClick={handleEdit}
          className="w-[39px] h-[39px] bg-[#F4DB1D] text-white rounded-[10px] hover:bg-yellow-400 transition-colors flex items-center justify-center"
          aria-label="Editar Exame"
          title="Editar"
        >
          <Pencil size={18} />
        </button>

        <Popup
          classTrigger={"w-[39px] h-[39px] bg-vermelho text-white rounded-[10px] hover:bg-red-700 transition-colors flex items-center justify-center"}
          paciente={paciente}
          type="delete"
          key={exame.id}
          triggerText={<Trash2 size={18} />}
          title={`Você deseja solicitar a exclusão permanentemente do ${paciente.nome}`}
        />
      </div>
    </div>
  );
}
