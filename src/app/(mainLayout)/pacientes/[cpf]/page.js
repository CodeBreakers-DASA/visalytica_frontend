"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../../../services/api";
import PrivateRoute from "../../../../components/PrivateRoute";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import CardExame from "../../../../components/CardExame";
import { Frown } from "lucide-react";

const fetchPacienteDetails = async ({ queryKey }) => {
  const [_key, cpf] = queryKey;
  if (!cpf) return null;
  const { data } = await api.get(`/pacientes/${cpf}`);
  // console.log(data);
  return data;
};

export default function PerfilPaciente() {
  const params = useParams();
  const pacienteCpf = params.cpf;
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pacienteDetails", pacienteCpf],
    queryFn: fetchPacienteDetails,
    enabled: !!pacienteCpf,
  });

  const paciente = data?.paciente;
  console.log(paciente);
  
  const examesPaciente = data?.exames?.lista || [];

  const examesFiltrados = useMemo(() => {
    if (!termoPesquisa.trim()) {
      return examesPaciente;
    }
    const termo = termoPesquisa.toLowerCase().trim();
    return examesPaciente.filter(
      (exame) =>
        exame.medico.nome.toLowerCase().includes(termo) ||
        exame.nome_amostra.toLowerCase().includes(termo) ||
        exame.possivel_diagnostico.toLowerCase().includes(termo) ||
        exame.id.includes(termo)
    );
  }, [examesPaciente, termoPesquisa]);

  const formatarCPF = (cpf) => {
    if (!cpf) return "";
    const cpfLimpo = cpf.replace(/\D/g, "");
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatarDataNascimento = (dataString) => {
    if (!dataString) return "";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };
  if (isLoading) {
    return (
      <div className="text-center p-12">Carregando dados do paciente...</div>
    );
  }

  if (!paciente) {
    return (
      <div className="h-[80vh] mx-12 flex items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <Frown className="size-10 text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Paciente não encontrado
          </h2>
          <Link
            href="/ConsultarPacientes"
            className="text-azul hover:underline"
          >
            Voltar para lista de pacientes
          </Link>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-12 text-red-500">
        Erro ao buscar dados: {error.message}
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="h-[80vh] mx-12 gap-6">
        <div className="w-full flex justify-start mb-6">
          <Link
            className="flex text-azul items-center gap-2"
            href={"/ConsultarPacientes"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 20C4.47581 20 0 15.5242 0 10C0 4.47581 4.47581 0 10 0C15.5242 0 20 4.47581 20 10C20 15.5242 15.5242 20 10 20ZM14.6774 8.22581H10V5.36694C10 4.93548 9.47581 4.71774 9.17339 5.02419L4.56452 9.65726C4.375 9.84677 4.375 10.1492 4.56452 10.3387L9.17339 14.9718C9.47984 15.2782 10 15.0605 10 14.629V11.7742H14.6774C14.9435 11.7742 15.1613 11.5565 15.1613 11.2903V8.70968C15.1613 8.44355 14.9435 8.22581 14.6774 8.22581Z"
                fill="#166DED"
              />
            </svg>
            <h3 className="text-lg">Voltar</h3>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-6">DADOS PACIENTE</h1>
          <div>
            <h2 className="text-2xl font-semibold text-azul mb-4">
              {paciente.nome}
            </h2>
            <div className="space-y-2">
              <div>
                <span className="text-azul font-bold text-base">ID: </span>
                <span className="text-black text-base">{paciente.id}</span>
              </div>
              <div>
                <span className="text-azul font-bold text-base">CPF: </span>
                <span className="text-black text-base">
                  {formatarCPF(paciente.cpf)}
                </span>
              </div>
              <div>
                <span className="text-azul font-bold text-base">
                  Data de nascimento:{" "}
                </span>
                <span className="text-black text-base">
                  {formatarDataNascimento(paciente.dataNascimento)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-black">EXAMES</h1>

            <div className="flex gap-5 w-1/2 items-center">
              <Input
                type="text"
                placeHolder="Pesquise por ID, Dr(a), peça ou diagnóstico"
                value={termoPesquisa}
                onChange={handlePesquisaChange}
                className="h-[60px]"
              />
              <Button
                classes={
                  "bg-gradient-to-b from-azul to-azul_escuro min-w-[60px] h-[60px] rounded-2xl"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M24.6582 21.6162L19.79 16.748C19.5703 16.5283 19.2725 16.4062 18.96 16.4062H18.1641C19.5117 14.6826 20.3125 12.5146 20.3125 10.1562C20.3125 4.5459 15.7666 0 10.1562 0C4.5459 0 0 4.5459 0 10.1562C0 15.7666 4.5459 20.3125 10.1562 20.3125C12.5146 20.3125 14.6826 19.5117 16.4062 18.1641V18.96C16.4062 19.2725 16.5283 19.5703 16.748 19.79L21.6162 24.6582C22.0752 25.1172 22.8174 25.1172 23.2715 24.6582L24.6533 23.2764C25.1123 22.8174 25.1123 22.0752 24.6582 21.6162ZM10.1562 16.4062C6.7041 16.4062 3.90625 13.6133 3.90625 10.1562C3.90625 6.7041 6.69922 3.90625 10.1562 3.90625C13.6084 3.90625 16.4062 6.69922 16.4062 10.1562C16.4062 13.6084 13.6133 16.4062 10.1562 16.4062Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 justify-items-center mb-4">
            {examesFiltrados.map((exame) => (
              <CardExame
                key={exame.id}
                exame={exame}
                paciente={paciente}
              />
            ))}
          </div>

          {examesFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {termoPesquisa
                  ? "Nenhum exame encontrado com os critérios de busca."
                  : "Este paciente ainda não possui exames cadastrados."}
              </p>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
