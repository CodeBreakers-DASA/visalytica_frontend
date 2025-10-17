"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputRadio from "@/components/InputRadio";
import { api } from "@/services/api";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function Criar_usuario() {
  const [selected, setSelected] = useState([true, false]); // Médico = [true,false], Admin = [false,true]
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
  });

  const handleSelected = (id) => {
    id === 0 ? setSelected([true, false]) : setSelected([false, true]);
  };

  const handleInputChange = useCallback(
    (field) => (e) => {
      let value = e.target.value;

      if (field === "cpf") {
        // Remove tudo que não for número
        value = value.replace(/\D/g, "");

        // Limita a 11 números
        if (value.length > 11) value = value.slice(0, 11);

        // Aplica a formatação automaticamente
        if (value.length > 9) {
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
          value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
        } else if (value.length > 3) {
          value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
        }
      }

      setInputs((prev) => ({
        ...prev,
        [field]: value,
      }));

      setInputsError((prev) => ({
        ...prev,
        [field]: false,
      }));
    },
    []
  );



  const handleRegistrar = async () => {
    // Reset dos erros
    setInputsError({
      nome: false,
      username: false,
      cpf: false,
      crm: false,
      senha: false,
      confirmaSenha: false,
    });

    // ---- Validações ----
    if (!inputs.nome.trim()) {
      toast.error("O usuário precisa ter um nome");
      setInputsError((prev) => ({ ...prev, nome: true }));
      return;
    }

    if (!inputs.username.trim()) {
      toast.error("O usuário precisa de um username");
      setInputsError((prev) => ({ ...prev, username: true }));
      return;
    }

    if (inputs.cpf.length !== 14) {
      toast.error("CPF inválido");
      setInputsError((prev) => ({ ...prev, cpf: true }));
      return;
    }

    if (selected[0] && !inputs.crm.trim()) {
      toast.error("CRM inválido");
      setInputsError((prev) => ({ ...prev, crm: true }));
      return;
    }

    if (inputs.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      setInputsError((prev) => ({ ...prev, senha: true }));
      return;
    }

    if (inputs.senha !== inputs.confirmaSenha) {
      toast.error("As senhas não são iguais");
      setInputsError((prev) => ({ ...prev, confirmaSenha: true }));
      return;
    }

    try {
      // Exemplo de envio (descomente se já tiver rota)
      const cpfLimpo = inputs.cpf.replace(/\D/g, "");
      await api.post("/auth/registrar", {
        nome: inputs.nome,
        username: inputs.username,
        senha: inputs.senha,
        cpf: cpfLimpo,
        crm: selected[0] ? inputs.crm : "",
        role: selected[0] ? "medico" : "admin",
      });
      toast.success("Usuário registrado com sucesso!");
      
      console.log("Usuário válido:", inputs);
    } catch (error) {
      toast.error("Erro ao registrar usuário");
      console.log(error);
      
    }
  };

  return (
    <div className="max-h-[70vh] min-h-[60vh] bg-white rounded-[10px] px-6 py-10 flex flex-col justify-between">
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
            className="font-medium text-cinza_texto"
            label="Nome"
            onChange={handleInputChange("nome")}
            placeHolder="Digite o nome"
            hasError={inputError.nome}
          />
          <Input
            className="font-medium text-cinza_texto"
            label="CPF"
            value={inputs.cpf}               // ← campo controlado
            onChange={handleInputChange("cpf")}
            placeHolder="000.000.000-00"
            hasError={inputError.cpf}
          />
          <Input
            className="font-medium text-cinza_texto"
            label="Senha"
            type="password"
            onChange={handleInputChange("senha")}
            placeHolder="**********"
            hasError={inputError.senha}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <Input
            className="font-medium text-cinza_texto"
            label="Username"
            onChange={handleInputChange("username")}
            placeHolder="Digite o username"
            hasError={inputError.username}
          />
          <Input
            className={`font-medium text-cinza_texto ${selected[1] && "opacity-50"}`}
            label="CRM"
            disabled={selected[1]}
            onChange={handleInputChange("crm")}
            placeHolder="00000SP"
            hasError={inputError.crm}
          />
          <Input
            className="font-medium text-cinza_texto"
            label="Repetir senha"
            type="password"
            onChange={handleInputChange("confirmaSenha")}
            placeHolder="**********"
            hasError={inputError.confirmaSenha}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleRegistrar}
          classes="text-white px-4 py-3 bg-gradient-to-r from-azul to-roxo_gradient hover:opacity-90 w-1/4 rounded-xl transition-all duration-200"
        >
          Registrar
        </Button>
      </div>
    </div>
  );
}
