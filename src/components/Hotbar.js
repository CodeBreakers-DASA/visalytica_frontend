"use client";

import Image from "next/image";

import LogoVisalytica from "../../public/LogoVisalytica.png";
import LogoDasa from "../../public/LogoDasa.svg";
import IconePessoa from "../../public/IconePessoa.svg";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hotbar({ nome = "Lorenzo" }) {
  const [onHover, setOnHover] = useState(false);
  const router = useRouter();

  return (
    <div className="flex justify-between mx-12 my-8">
      <div className="flex justify-between items-center gap-8">
        <Link href={"/Home"}>
          <Image src={LogoVisalytica} alt="Logo da Visalytica" />
        </Link>
        <div className="w-0.5 h-full bg-azul"></div>
        <Image src={LogoDasa} alt="Logo da Dasa" />
      </div>
      <div
        className="flex items-center gap-3.5 cursor-pointer"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <Image src={IconePessoa} alt="Icone de uma pessoa" />
        <h3 className="text-azul text-lg font-semibold">Olá, {nome}</h3>
        {onHover ? (
          <div onClick={() => {router.push('./login')}} className="absolute flex items-center justify-around h-10 w-[150px] top-16 rounded-2xl border border-cinza_escuro bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
            >
              <path
                d="M21.6955 9.25201L14.3618 16.6883C13.707 17.3522 12.5721 16.8875 12.5721 15.9358V11.6865H6.63525C6.05467 11.6865 5.58758 11.2129 5.58758 10.6242V6.37488C5.58758 5.78618 6.05467 5.31256 6.63525 5.31256H12.5721V1.06326C12.5721 0.116027 13.7027 -0.353166 14.3618 0.310786L21.6955 7.74705C22.1015 8.16313 22.1015 8.83593 21.6955 9.25201ZM8.38137 16.467V14.6964C8.38137 14.4043 8.14564 14.1653 7.85753 14.1653H4.19068C3.41803 14.1653 2.79379 13.5323 2.79379 12.7488V4.25024C2.79379 3.46677 3.41803 2.8338 4.19068 2.8338H7.85753C8.14564 2.8338 8.38137 2.59478 8.38137 2.30264V0.532103C8.38137 0.239964 8.14564 0.000941421 7.85753 0.000941421H4.19068C1.87708 0.000941421 0 1.90427 0 4.25024V12.7488C0 15.0948 1.87708 16.9981 4.19068 16.9981H7.85753C8.14564 16.9981 8.38137 16.7591 8.38137 16.467Z"
                fill="#166DED"
              />
            </svg>
            <p className="text-azul font-semibold">Sair</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
