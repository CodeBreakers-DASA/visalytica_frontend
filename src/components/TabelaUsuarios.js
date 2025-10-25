"use client";

import toast from "react-hot-toast";
import Button from "./Button";
import { api } from "@/services/api";
import { Trash } from "lucide-react";

function TabelaUsuarios({ colunas = [], linhas = [], onUpdate }) {
  const handleAceita = async (id) => {
    try {
      const { data } = await api.delete(`/admin/medicos/${id}`);
      console.log(data);
      console.log(id);
      onUpdate();
      toast.success("Requisição aprovada");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-white dark:bg-noturno_medio p-10 pb-5 rounded-[10px] h-full">
      {linhas.length > 0 ? (
        <>
          <div className="flex justify-around items-center text-center dark:text-white dark:bg-noturno_medio_claro bg-cinza_medio rounded-t-[10px] text-cinza_texto font-medium p-5">
            {colunas.map((coluna) => (
              <h3 key={coluna} className="w-full">
                {coluna}
              </h3>
            ))}
          </div>
          <div className="flex flex-col gap-5 justify-between p-5 text-cinza_texto">
            {linhas.map((linha, index) => (
              <div
                key={index}
                className="flex justify-around text-center items-center dark:text-white"
              >
                <h3 className="w-full">{linha.nome}</h3>
                <h3 className="w-full">
                  {linha.dataNascimento}
                </h3>
                <h3 className="w-full">{linha.cpf}</h3>
                <h3 className="w-full">{linha.crm}</h3>
                <h3 className="w-full">
                  {linha.username} 
                </h3>
                <div className="w-full flex justify-center gap-3">
                  <Button
                    onClick={() => handleAceita(linha.id)}
                    classes="h-10 w-10 bg-[#FA3E3E]"
                  >
                    <Trash color="white"/>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl text-cinza_texto dark:text-white">Nenhuma solicitação encontrada</h2>
      )}
    </div>
  );
}

export default TabelaUsuarios;
