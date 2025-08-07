'use client'

import { FileText, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';


export default function AcoesTabela({ pacienteId }) {

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Botão de Visualizar/Exames (como link) */}
      <Link
        href={`/pacientes/${pacienteId}/exames`}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        aria-label="Visualizar Exames"
      >
        <FileText size={18} />
      </Link>

      {/* Botão de Editar */}
      <button
        className="p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors"
        aria-label="Editar Paciente"
      >
        <Pencil size={18} />
      </button>

      {/* Botão de Deletar */}
      <button
        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        aria-label="Deletar Paciente"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}