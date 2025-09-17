'use client'

import { Upload, Edit, Trash2 } from 'lucide-react';

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

  return (
    <div className="bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow w-full max-w-[413px] h-[284px] flex flex-col">
      {/* Header do Card com ID */}
      <div className="bg-gradient-to-r from-azul to-azul_escuro text-white text-center py-2.5 px-4 rounded-t-2xl">
        <h3 className="font-semibold text-base">ID exame: {exame.id}</h3>
      </div>

      {/* Informações do Exame */}
      <div className="flex-1 px-6 pt-4 pb-0 space-y-2 text-base">
        <div>
          <span className="text-black font-bold">Data realização: </span>
          <span className="text-black">{exame.dataRealizacao}</span>
        </div>
        
        <div>
          <span className="text-black font-bold">Data atualização: </span>
          <span className="text-black">{exame.dataAtualizacao}</span>
        </div>
        
        <div>
          <span className="text-black font-bold">Dr(a): </span>
          <span className="text-black">{exame.drResponsavel}</span>
        </div>
        
        <div>
          <span className="text-black font-bold">Peça: </span>
          <span className="text-black">{exame.peca}</span>
        </div>
        
        <div>
          <span className="text-black font-bold">Possível diagnóstico: </span>
          <span className="text-black">{exame.possivelDiagnostico}</span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-center items-center gap-4 pb-4 pt-0">
        {/* Botão Upload - Azul */}
        <button
          onClick={handleUpload}
          className="w-[39px] h-[39px] bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors flex items-center justify-center shadow-md"
          aria-label="Upload do Exame"
          title="Upload"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M24.6582 21.6162L19.79 16.748C19.5703 16.5283 19.2725 16.4062 18.96 16.4062H18.1641C19.5117 14.6826 20.3125 12.5146 20.3125 10.1562C20.3125 4.5459 15.7666 0 10.1562 0C4.5459 0 0 4.5459 0 10.1562C0 15.7666 4.5459 20.3125 10.1562 20.3125C12.5146 20.3125 14.6826 19.5117 16.4062 18.1641V18.96C16.4062 19.2725 16.5283 19.5703 16.748 19.79L21.6162 24.6582C22.0752 25.1172 22.8174 25.1172 23.2715 24.6582L24.6533 23.2764C25.1123 22.8174 25.1123 22.0752 24.6582 21.6162ZM10.1562 16.4062C6.7041 16.4062 3.90625 13.6133 3.90625 10.1562C3.90625 6.7041 6.69922 3.90625 10.1562 3.90625C13.6084 3.90625 16.4062 6.69922 16.4062 10.1562C16.4062 13.6084 13.6133 16.4062 10.1562 16.4062Z"
              fill="white"
            />
          </svg>
        </button>

        {/* Botão Editar - Amarelo */}
        <button
          onClick={handleEdit}
          className="w-[39px] h-[39px] bg-yellow-400 text-white rounded-2xl hover:bg-yellow-500 transition-colors flex items-center justify-center shadow-md"
          aria-label="Editar Exame"
          title="Editar"
        >
          <Edit size={18} />
        </button>

        {/* Botão Deletar - Vermelho */}
        <button
          onClick={handleDelete}
          className="w-[39px] h-[39px] bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors flex items-center justify-center shadow-md"
          aria-label="Deletar Exame"
          title="Deletar"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
