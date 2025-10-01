"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../services/api";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

const loginRequest = async (credentials) => {
  const { data } = await api.post("/auth/entrar", credentials);
  return data;
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: async (data) => {
      toast.success("Login realizado com sucesso!");
      await auth.login(data.access_token);

      router.push("/Home");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Usuário ou senha inválidos.";
      toast.error(errorMessage);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    mutation.mutate({ username, senha: password });
  };

  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex w-full justify-center">
          <h1 className="text-2xl w-fit font-bold ...">Login</h1>
        </div>
        <Input
          label={"Usuário"}
          placeHolder={"Digite seu username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          hasError={mutation.isError}
          hasSuccess={mutation.isSuccess}
        />
        <Input
          label={"Senha"}
          placeHolder={"*********"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={mutation.isError}
          hasSuccess={mutation.isSuccess}
        />
        <a
          className={`text-xs font-medium ${
            mutation.isError
              ? "text-vermelho"
              : mutation.isSuccess
              ? "text-green-600"
              : "text-azul"
          }`}
        >
          Esqueceu a senha ou não tem login? Contate o admin.
        </a>

        <div className="w-full flex justify-center ">
          <Button
            classes={
              "bg-gradient-to-r from-azul to-azul_escuro w-fit py-2.5 px-16 !mt-2.5"
            }
            onClick={handleLogin}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
