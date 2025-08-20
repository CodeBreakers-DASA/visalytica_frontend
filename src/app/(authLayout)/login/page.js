
"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const inter = Inter({ subsets: ['latin'] });

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError(true);
      setErrorMessage("");
      setSuccess(false);
    } else {
      setError(false);
      
      const isValidUser = username === "CRM123456";
      const isValidPassword = password === "123456";
      
      if (!isValidUser) {
        setErrorMessage("Usuário não cadastrado!");
        setSuccess(false);
      } else if (!isValidPassword) {
        setErrorMessage("Usuário ou senha não coincidem!");
        setSuccess(false);
      } else {
        setErrorMessage("");
        setSuccess(true);
        
        toast.success('Login realizado com sucesso!');
        
        setTimeout(() => {
          router.push("/Home");
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex w-full justify-center">
          <h1 className="text-2xl w-fit font-bold bg-gradient-to-r from-azul to-azul_escuro to-80% bg-clip-text text-transparent">
            Login
          </h1>
        </div>
        <Input
          label={"Usuário"}
          placeHolder={"Digite seu username"}
          value={username}
          onChange={e => setUsername(e.target.value)}
          hasError={error && !username}
          hasSuccess={success}
        />
        <Input
          label={"Senha"}
          placeHolder={"*********"}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          hasError={error && !password}
          hasSuccess={success}
        />
        <a
          className={`text-xs font-medium ${
            error ? 'text-vermelho' : 
            success ? 'text-green-600' : 
            'text-azul'
          }`}
        >
          Esqueceu a senha ou não tem login?
        </a>
        {errorMessage && (
          <p className={`text-vermelho font-medium text-[15px] leading-none ${inter.className}`}>
            {errorMessage}
          </p>
        )}
        <div className="w-full flex justify-center ">
          <Button
            classes={
              "bg-gradient-to-r from-azul to-azul_escuro w-fit py-2.5 px-16 !mt-2.5"
            }
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
