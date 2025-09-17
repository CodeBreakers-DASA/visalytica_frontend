import Link from "next/link";
import AcoesTabela from './AcoesTabela'


export default function TabelaPacientes({ pacientes }) {
  const headers = ['Nome', 'CPF', 'Última atualização', 'Data criação', 'Exames', 'Ações'];

  return (
    <div className="bg-white shadow-md rounded-xl border border-cinza overflow-hidden" >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead className="text-sm font-semibold border-b">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="bg-cinza_medio px-6 py-4 text-sm border-r">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id} className="border-cinza bg-white border-b hover:bg-cinza_escuro/30">
                <td className="px-6 py-4 border-r font-medium">{paciente.nome}</td>
                <td className="px-6 py-4 border-r">{paciente.cpf}</td>
                <td className="px-6 py-4 border-r">{paciente.ultimaAtualizacao}</td>
                <td className="px-6 py-4 border-r">{paciente.dataCriacao}</td>
                <td className="px-6 py-4 border-r">
                  <Link
                    href={`/pacientes/${paciente.id}/exames`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {paciente.examesCount} exame{paciente.examesCount > 1 ? 's' : ''}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <AcoesTabela pacienteId={paciente.id} />
                </td>
              </tr>
            ))}
             {pacientes.length === 0 && (
                <tr>
                    <td colSpan={headers.length} className="text-center py-8 text-gray-500">
                        Nenhum paciente encontrado.
                    </td>
                </tr>
             )}
          </tbody>
        </table>
      </div>
    </div>
  );
}