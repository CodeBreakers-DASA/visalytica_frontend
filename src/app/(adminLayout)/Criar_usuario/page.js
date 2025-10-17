"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputRadio from "@/components/InputRadio";
import { api } from "@/services/api";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function Criar_usuario() {
  const [selected, setSelected] = useState([true, false]);
  const [inputs, setInputs] = useState({
    nome: "",
    username: "",
    cpf: "",
    crm: "",
    senha: "",
    confirmaSenha: "",
  });

  const [inputError, setInputsError] = useState({
    nome: false,
    username: false,
    cpf: false,
    crm: false,
    senha: false,
    confirmaSenha: false,
  })

  const handleSelected = (id) => {
    id == 0 ? setSelected([true, false]) : setSelected([false, true]);
  };

  const handleInputChange = useCallback(
    (field) => async (e) => {
      let value = e.target.value;

      // validação específica para cpf - apenas números
      if (field === "cpf") {
        value = value.replace(/\D/g, "");
        value = value.substring(0, 11);
        if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
        if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
        if (value.length > 11)
          value = value.slice(0, 11) + "-" + value.slice(11);
      }

      setInputs((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleRegistrar = () => {
    if (inputs.cpf.length != 14 ){
        toast.error('CPF inválido')
        setInputsError((prev) => ({
            ...prev,
            cpf: true
        }))      
    } if (!inputs.nome.trim()){
        toast.error('O usuário precisa ter um nome')
        setInputsError((prev) => ({
            ...prev,
            nome: true
        })) 
    } if (!inputs.username.trim()){
        toast.error('O usuário precisa de um username') 
        setInputsError((prev) => ({
            ...prev,
            username: true
        })) 
    } if (!inputs.crm.trim() && selected[0]){
        toast.error('CRM inválido')
        setInputsError((prev) => ({
            ...prev,
            crm: true
        })) 
    } if (inputs.confirmaSenha === inputs.senha){
        toast.error('Senhas não são iguais') 
        setInputsError((prev) => ({
            ...prev,
            confirmaSenha: true
        })) 
    }
    
    return;
  }

  return (
    <div className="h-[70vh] w-1/2 bg-white rounded-[10px] px-6 py-10 flex flex-col justify-between">
      <div className="w-full flex justify-center gap-5">
        <InputRadio
          selected={selected[0]}
          text={"Médico"}
          handle={() => handleSelected(0)}
        />
        <InputRadio
          selected={selected[1]}
          text={"Admin"}
          handle={() => handleSelected(1)}
        />
      </div>
      <div className="flex py-6 gap-6 flex-1">
        <div className="flex flex-1 flex-col justify-between">
          <Input
            className={"font-medium text-cinza_texto"}
            label={"Nome"}
            key={"Nome"}
            onChange={handleInputChange("nome")}
            placeHolder={"Digite o nome"}
            hasError={inputError.nome}
          />
          <Input
            className={"font-medium text-cinza_texto"}
            label={"CPF"}
            key={"cpf"}
            onChange={handleInputChange("cpf")}
            placeHolder={"000.000.000-00"}
            hasError={inputError.cpf}
          />
          <Input
            className={"font-medium text-cinza_texto"}
            label={"Senha"}
            key={"senha"}
            onChange={handleInputChange("senha")}
            placeHolder={"**********"}
            hasError={inputError.senha}
          />
        </div>
        <div className="flex flex-1  flex-col justify-between">
          <Input
            className={"font-medium text-cinza_texto"}
            label={"Username"}
            key={"username"}
            onChange={handleInputChange("username")}
            placeHolder={"Digite o username"}
            hasError={inputError.username}
          />
          <Input
            className={`font-medium text-cinza_texto ${selected[1] && "opacity-50"}`}
            label={"CRM"}
            key={"crm"}
            disabled={selected[1]}
            onChange={handleInputChange("crm")}
            placeHolder={"00000SP"}
            hasError={inputError.crm}
          />
          <Input
            className={"font-medium text-cinza_texto"}
            label={"Repetir senha"}
            key={"repetir_senha"}
            onChange={handleInputChange("repetir_senha")}
            placeHolder={"**********"}
            hasError={inputError.confirmaSenha}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleRegistrar} classes={"text-white px-4 py-3 px-6 bg-gradient-to-r from-azul to-roxo_gradient hover:opacity-90 w-1/4 rounded-xl transition-all duration-200"} >
            Registrar
        </Button>
      </div>
    </div>
  );
}
