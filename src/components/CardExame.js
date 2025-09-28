'use client'

import { Pencil, Trash2, Upload } from "lucide-react";

export default function CardExame({ exame, pacienteId }) {
  
  const handleUpload = () => {
    console.log(`Upload do exame ${exame.id} do paciente ${pacienteId}`);
    // Implementar lógica de upload
  };

  const handleEdit = () => {
    console.log(`Editar exame ${exame.id} do paciente ${pacienteId}`);
    // Implementar lógica de edição
  };

  const handleDelete = () => {
    console.log(`Deletar exame ${exame.id} do paciente ${pacienteId}`);
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
          <span className="text-black">{formatarData(exame.data_criacao)}</span>
        </div>
        
        <div>
          <span className="text-black font-bold">Data atualização: </span>
          <span className="text-black">{formatarData(exame.data_atualizacao)}</span>
        </div>
        
        <div>
          <span className="text-black font-bold">Dr(a): </span>
          <span className="text-black">{exame.medico.nome}</span>
        </div>
        
        <div>
          <span className="text-black font-bold">Peça: </span>
          <span className="text-black">{exame.nome_amostra}</span>
        </div>
        
        <div>
          <span className="text-black font-bold">Possível diagnóstico: </span>
          <span className="text-black">{exame.possivel_diagnostico}</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 pb-4 pt-2">
        <button
          onClick={handleUpload}
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

        <button
          onClick={handleDelete}
          className="w-[39px] h-[39px] bg-vermelho text-white rounded-[10px] hover:bg-red-700 transition-colors flex items-center justify-center"
          aria-label="Deletar Exame"
          title="Deletar"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
