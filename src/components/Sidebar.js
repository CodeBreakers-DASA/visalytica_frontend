"use client";

import Image from "next/image";
import LogoVisalytica from "../assets/logoVisalyticaAzulClaro.svg";
import LogoDasa from "../../public/LogoDasa.svg";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useState } from 'react'; // Importar useState
import { Menu, X } from 'lucide-react'; // Importar ícones

// PASSO 3: Extrair o conteúdo do Sidebar
function SidebarContent({ user, pathName, handleLogout, closeMobileMenu, isMobile = false }) {
    const isPacientesActive = pathName === '/ConsultarPacientes' || pathName.startsWith('/pacientes/');
    
    // Função para fechar o menu ao clicar em um link (opcional)
    const handleLinkClick = () => {
        if (closeMobileMenu) {
            closeMobileMenu();
        }
    };

    return (
        <>
            {/* Top Section: Logos */}
            
            <div className="w-full">
{!isMobile && (
            <div className="flex flex-col items-center gap-3 mb-16">
                <Link href={"/Home"} onClick={handleLinkClick}>
                    <Image
                        src={LogoVisalytica}
                        alt="Logo da Visalytica"
                        className="w-full px-10"
                        priority // Add priority for LCP
                    />
                </Link>
                <div className="w-20 h-0.5 bg-cinza dark:bg-noturno_borda"></div>
                <a href="https://www.dasa.com.br" target="_blank" rel="noreferrer">
                    <Image src={LogoDasa} alt="Logo da Dasa" className="h-5" />
                </a>
            </div>
            )}

            {/* Middle Section: Links */}
            <div className="flex flex-col w-full"> {/* Adicionado w-full */}
                {user.role == "medico" ? (
                    <>
                        <Link href={`/Home`} onClick={handleLinkClick}>
                            <div
                                className="flex gap-4 px-6 py-4 w-full font-semibold hover:bg-gray-100 dark:hover:bg-noturno_claro transition-colors duration-150" // Melhorar hover
                                style={
                                  pathName == `/Home`
                                  ? { backgroundImage: `linear-gradient(to right, #166DED, #716FEA)` }
                                  : {}
                                }
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill={pathName == `/Home` ? "white" : `#9B9B9B`} />
                                </svg>
                                <h2 style={pathName == `/Home` ? { color: `white` } : { color: `#9b9b9b` }}>
                                    Dashboard
                                </h2>
                            </div>
                        </Link>
                         {/* ... (Restante dos links para médico, adicionar onClick={handleLinkClick} em cada Link) ... */}
                        <Link href={`/Analise`} onClick={handleLinkClick}>
                             <div
                                className="flex gap-4 px-6 py-4 font-semibold hover:bg-gray-100 dark:hover:bg-noturno_claro transition-colors duration-150"
                                style={
                                  pathName == `/Analise` || pathName == "/GeraPDF"
                                  ? { backgroundImage: `linear-gradient(to right, #166DED, #716FEA)` }
                                  : {}
                                }
                                >
                                {/* SVG Analise */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M5 21V19H10V17C8.61667 17 7.4375 16.5125 6.4625 15.5375C5.4875 14.5625 5 13.3833 5 12C5 10.9833 5.27917 10.0583 5.8375 9.225C6.39583 8.39167 7.15 7.78333 8.1 7.4C8.23333 6.83333 8.52917 6.375 8.9875 6.025C9.44583 5.675 9.96667 5.5 10.55 5.5L10 3.95L10.95 3.6L10.6 2.7L12.5 2L12.8 2.95L13.75 2.6L16.5 10.1L15.55 10.45L15.9 11.4L14 12.1L13.7 11.15L12.75 11.5L12.15 9.85C11.9 10.0833 11.6125 10.2583 11.2875 10.375C10.9625 10.4917 10.6333 10.5333 10.3 10.5C9.93333 10.4667 9.59167 10.3542 9.275 10.1625C8.95833 9.97083 8.68333 9.73333 8.45 9.45C8 9.71667 7.64583 10.075 7.3875 10.525C7.12917 10.975 7 11.4667 7 12C7 12.8333 7.29167 13.5417 7.875 14.125C8.45833 14.7083 9.16667 15 10 15H18V17H13V19H19V21H5ZM13.65 9.55L14.55 9.2L12.85 4.5L11.9 4.85L13.65 9.55ZM10.5 9C10.7833 9 11.0208 8.90417 11.2125 8.7125C11.4042 8.52083 11.5 8.28333 11.5 8C11.5 7.71667 11.4042 7.47917 11.2125 7.2875C11.0208 7.09583 10.7833 7 10.5 7C10.2167 7 9.97917 7.09583 9.7875 7.2875C9.59583 7.47917 9.5 7.71667 9.5 8C9.5 8.28333 9.59583 8.52083 9.7875 8.7125C9.97917 8.90417 10.2167 9 10.5 9Z" fill={ pathName == `/Analise` || pathName == "/GeraPDF" ? "white" : `#9B9B9B` } /> </svg>
                                <h2 style={pathName == `/Analise` || pathName == "/GeraPDF" ? { color: `white` } : { color: `#9b9b9b` }}>
                                    Fazer análise
                                </h2>
                             </div>
                         </Link>
                         <Link href={`/ConsultarPacientes`} onClick={handleLinkClick}>
                             <div
                                className="flex gap-4 px-6 py-4 font-semibold hover:bg-gray-100 dark:hover:bg-noturno_claro transition-colors duration-150"
                                style={
                                  isPacientesActive
                                  ? { backgroundImage: `linear-gradient(to right, #166DED, #716FEA)` }
                                  : {}
                                }
                                >
                                {/* SVG Pacientes */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M0 18V16.425C0 15.7083 0.366667 15.125 1.1 14.675C1.83333 14.225 2.8 14 4 14C4.21667 14 4.425 14.0042 4.625 14.0125C4.825 14.0208 5.01667 14.0417 5.2 14.075C4.96667 14.425 4.79167 14.7917 4.675 15.175C4.55833 15.5583 4.5 15.9583 4.5 16.375V18H0ZM6 18V16.375C6 15.8417 6.14583 15.3542 6.4375 14.9125C6.72917 14.4708 7.14167 14.0833 7.675 13.75C8.20833 13.4167 8.84583 13.1667 9.5875 13C10.3292 12.8333 11.1333 12.75 12 12.75C12.8833 12.75 13.6958 12.8333 14.4375 13C15.1792 13.1667 15.8167 13.4167 16.35 13.75C16.8833 14.0833 17.2917 14.4708 17.575 14.9125C17.8583 15.3542 18 15.8417 18 16.375V18H6ZM19.5 18V16.375C19.5 15.9417 19.4458 15.5333 19.3375 15.15C19.2292 14.7667 19.0667 14.4083 18.85 14.075C19.0333 14.0417 19.2208 14.0208 19.4125 14.0125C19.6042 14.0042 19.8 14 20 14C21.2 14 22.1667 14.2208 22.9 14.6625C23.6333 15.1042 24 15.6917 24 16.425V18H19.5ZM8.125 16H15.9C15.7333 15.6667 15.2708 15.375 14.5125 15.125C13.7542 14.875 12.9167 14.75 12 14.75C11.0833 14.75 10.2458 14.875 9.4875 15.125C8.72917 15.375 8.275 15.6667 8.125 16ZM4 13C3.45 13 2.97917 12.8042 2.5875 12.4125C2.19583 12.0208 2 11.55 2 11C2 10.4333 2.19583 9.95833 2.5875 9.575C2.97917 9.19167 3.45 9 4 9C4.56667 9 5.04167 9.19167 5.425 9.575C5.80833 9.95833 6 10.4333 6 11C6 11.55 5.80833 12.0208 5.425 12.4125C5.04167 12.8042 4.56667 13 4 13ZM20 13C19.45 13 18.9792 12.8042 18.5875 12.4125C18.1958 12.0208 18 11.55 18 11C18 10.4333 18.1958 9.95833 18.5875 9.575C18.9792 9.19167 19.45 9 20 9C20.5667 9 21.0417 9.19167 21.425 9.575C21.8083 9.95833 22 10.4333 22 11C22 11.55 21.8083 12.0208 21.425 12.4125C21.0417 12.8042 20.5667 13 20 13ZM12 12C11.1667 12 10.4583 11.7083 9.875 11.125C9.29167 10.5417 9 9.83333 9 9C9 8.15 9.29167 7.4375 9.875 6.8625C10.4583 6.2875 11.1667 6 12 6C12.85 6 13.5625 6.2875 14.1375 6.8625C14.7125 7.4375 15 8.15 15 9C15 9.83333 14.7125 10.5417 14.1375 11.125C13.5625 11.7083 12.85 12 12 12ZM12 10C12.2833 10 12.5208 9.90417 12.7125 9.7125C12.9042 9.52083 13 9.28333 13 9C13 8.71667 12.9042 8.47917 12.7125 8.2875C12.5208 8.09583 12.2833 8 12 8C11.7167 8 11.4792 8.09583 11.2875 8.2875C11.0958 8.47917 11 8.71667 11 9C11 9.28333 11.0958 9.52083 11.2875 9.7125C11.4792 9.90417 11.7167 10 12 10Z" fill={ isPacientesActive ? "white" : `#9B9B9B` } /> </svg>
                                <h2 style={ isPacientesActive ? { color: `white` } : { color: `#9b9b9b` }}>
                                    Consultar pacientes
                                </h2>
                             </div>
                         </Link>
                    </>
                    
                ) : (
                  <>
                        {/* ... (Links para admin, adicionar onClick={handleLinkClick} em cada Link) ... */}
                         <Link href={`/Criar_usuario`} onClick={handleLinkClick}>
                             <div
                                className="flex gap-4 px-6 py-4 font-semibold hover:bg-gray-100 dark:hover:bg-noturno_claro transition-colors duration-150"
                                style={ pathName == `/Criar_usuario` ? { backgroundImage: `linear-gradient(to right, #166DED, #716FEA)` } : {} }
                            >
                                {/* SVG Criar Usuário */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 20" fill="none"> <path d="M24.375 8.125H21.875V5.625C21.875 5.28125 21.5938 5 21.25 5H20C19.6562 5 19.375 5.28125 19.375 5.625V8.125H16.875C16.5312 8.125 16.25 8.40625 16.25 8.75V10C16.25 10.3438 16.5312 10.625 16.875 10.625H19.375V13.125C19.375 13.4688 19.6562 13.75 20 13.75H21.25C21.5938 13.75 21.875 13.4688 21.875 13.125V10.625H24.375C24.7188 10.625 25 10.3438 25 10V8.75C25 8.40625 24.7188 8.125 24.375 8.125ZM8.75 10C11.5117 10 13.75 7.76172 13.75 5C13.75 2.23828 11.5117 0 8.75 0C5.98828 0 3.75 2.23828 3.75 5C3.75 7.76172 5.98828 10 8.75 10ZM12.25 11.25H11.5977C10.7305 11.6484 9.76562 11.875 8.75 11.875C7.73438 11.875 6.77344 11.6484 5.90234 11.25H5.25C2.35156 11.25 0 13.6016 0 16.5V18.125C0 19.1602 0.839844 20 1.875 20H15.625C16.6602 20 17.5 19.1602 17.5 18.125V16.5C17.5 13.6016 15.1484 11.25 12.25 11.25Z" fill={pathName == `/Criar_usuario` ? "white" : `#9B9B9B`} /> </svg>
                                <h2 style={pathName == `/Criar_usuario` ? { color: `white` } : { color: `#9b9b9b` }}>
                                    Criar usuário
                                </h2>
                             </div>
                         </Link>
                         <Link href={`/Excluir_amostras`} onClick={handleLinkClick}>
                             <div
                                className="flex gap-4 px-6 py-4 font-semibold hover:bg-gray-100 dark:hover:bg-noturno_claro transition-colors duration-150"
                                style={ pathName == `/Excluir_amostras` ? { backgroundImage: `linear-gradient(to right, #166DED, #716FEA)` } : {} }
                            >
                                {/* SVG Excluir Amostras */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M5 21V19H10V17C8.61667 17 7.4375 16.5125 6.4625 15.5375C5.4875 14.5625 5 13.3833 5 12C5 10.9833 5.27917 10.0583 5.8375 9.225C6.39583 8.39167 7.15 7.78333 8.1 7.4C8.23333 6.83333 8.52917 6.375 8.9875 6.025C9.44583 5.675 9.96667 5.5 10.55 5.5L10 3.95L10.95 3.6L10.6 2.7L12.5 2L12.8 2.95L13.75 2.6L16.5 10.1L15.55 10.45L15.9 11.4L14 12.1L13.7 11.15L12.75 11.5L12.15 9.85C11.9 10.0833 11.6125 10.2583 11.2875 10.375C10.9625 10.4917 10.6333 10.5333 10.3 10.5C9.93333 10.4667 9.59167 10.3542 9.275 10.1625C8.95833 9.97083 8.68333 9.73333 8.45 9.45C8 9.71667 7.64583 10.075 7.3875 10.525C7.12917 10.975 7 11.4667 7 12C7 12.8333 7.29167 13.5417 7.875 14.125C8.45833 14.7083 9.16667 15 10 15H18V17H13V19H19V21H5ZM13.65 9.55L14.55 9.2L12.85 4.5L11.9 4.85L13.65 9.55ZM10.5 9C10.7833 9 11.0208 8.90417 11.2125 8.7125C11.4042 8.52083 11.5 8.28333 11.5 8C11.5 7.71667 11.4042 7.47917 11.2125 7.2875C11.0208 7.09583 10.7833 7 10.5 7C10.2167 7 9.97917 7.09583 9.7875 7.2875C9.59583 7.47917 9.5 7.71667 9.5 8C9.5 8.28333 9.59583 8.52083 9.7875 8.7125C9.97917 8.90417 10.2167 9 10.5 9Z" fill={ pathName == `/Excluir_amostras` ? "white" : `#9B9B9B` } /> </svg>
                                <h2 style={ pathName == `/Excluir_amostras` ? { color: `white` } : { color: `#9b9b9b` }}>
                                    Excluir amostras
                                </h2>
                             </div>
                         </Link>
                         <Link href={`/Excluir_pacientes`} onClick={handleLinkClick}>
                             <div
                                className="flex gap-4 px-6 py-4 font-semibold hover:bg-gray-100 dark:hover:bg-noturno_claro transition-colors duration-150"
                                style={ pathName == `/Excluir_pacientes` ? { backgroundImage: `linear-gradient(to right, #166DED, #716FEA)` } : {} }
                            >
                                {/* SVG Excluir Pacientes */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M0 18V16.425C0 15.7083 0.366667 15.125 1.1 14.675C1.83333 14.225 2.8 14 4 14C4.21667 14 4.425 14.0042 4.625 14.0125C4.825 14.0208 5.01667 14.0417 5.2 14.075C4.96667 14.425 4.79167 14.7917 4.675 15.175C4.55833 15.5583 4.5 15.9583 4.5 16.375V18H0ZM6 18V16.375C6 15.8417 6.14583 15.3542 6.4375 14.9125C6.72917 14.4708 7.14167 14.0833 7.675 13.75C8.20833 13.4167 8.84583 13.1667 9.5875 13C10.3292 12.8333 11.1333 12.75 12 12.75C12.8833 12.75 13.6958 12.8333 14.4375 13C15.1792 13.1667 15.8167 13.4167 16.35 13.75C16.8833 14.0833 17.2917 14.4708 17.575 14.9125C17.8583 15.3542 18 15.8417 18 16.375V18H6ZM19.5 18V16.375C19.5 15.9417 19.4458 15.5333 19.3375 15.15C19.2292 14.7667 19.0667 14.4083 18.85 14.075C19.0333 14.0417 19.2208 14.0208 19.4125 14.0125C19.6042 14.0042 19.8 14 20 14C21.2 14 22.1667 14.2208 22.9 14.6625C23.6333 15.1042 24 15.6917 24 16.425V18H19.5ZM8.125 16H15.9C15.7333 15.6667 15.2708 15.375 14.5125 15.125C13.7542 14.875 12.9167 14.75 12 14.75C11.0833 14.75 10.2458 14.875 9.4875 15.125C8.72917 15.375 8.275 15.6667 8.125 16ZM4 13C3.45 13 2.97917 12.8042 2.5875 12.4125C2.19583 12.0208 2 11.55 2 11C2 10.4333 2.19583 9.95833 2.5875 9.575C2.97917 9.19167 3.45 9 4 9C4.56667 9 5.04167 9.19167 5.425 9.575C5.80833 9.95833 6 10.4333 6 11C6 11.55 5.80833 12.0208 5.425 12.4125C5.04167 12.8042 4.56667 13 4 13ZM20 13C19.45 13 18.9792 12.8042 18.5875 12.4125C18.1958 12.0208 18 11.55 18 11C18 10.4333 18.1958 9.95833 18.5875 9.575C18.9792 9.19167 19.45 9 20 9C20.5667 9 21.0417 9.19167 21.425 9.575C21.8083 9.95833 22 10.4333 22 11C22 11.55 21.8083 12.0208 21.425 12.4125C21.0417 12.8042 20.5667 13 20 13ZM12 12C11.1667 12 10.4583 11.7083 9.875 11.125C9.29167 10.5417 9 9.83333 9 9C9 8.15 9.29167 7.4375 9.875 6.8625C10.4583 6.2875 11.1667 6 12 6C12.85 6 13.5625 6.2875 14.1375 6.8625C14.7125 7.4375 15 8.15 15 9C15 9.83333 14.7125 10.5417 14.1375 11.125C13.5625 11.7083 12.85 12 12 12ZM12 10C12.2833 10 12.5208 9.90417 12.7125 9.7125C12.9042 9.52083 13 9.28333 13 9C13 8.71667 12.9042 8.47917 12.7125 8.2875C12.5208 8.09583 12.2833 8 12 8C11.7167 8 11.4792 8.09583 11.2875 8.2875C11.0958 8.47917 11 8.71667 11 9C11 9.28333 11.0958 9.52083 11.2875 9.7125C11.4792 9.90417 11.7167 10 12 10Z" fill={ pathName == `/Excluir_pacientes` ? "white" : `#9B9B9B` } /> </svg>
                                <h2 style={ pathName == `/Excluir_pacientes` ? { color: `white` } : { color: `#9b9b9b` }}>
                                    Excluir pacientes
                                </h2>
                             </div>
                         </Link>
                         <Link href={`/Excluir_medicos`} onClick={handleLinkClick}>
                             <div
                                className="flex gap-4 px-6 py-4 font-semibold hover:bg-gray-100 dark:hover:bg-noturno_claro transition-colors duration-150"
                                style={ pathName == `/Excluir_medicos` ? { backgroundImage: `linear-gradient(to right, #166DED, #716FEA)` } : {} }
                            >
                                {/* SVG Excluir Médicos */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19 21" fill="none"> <path d="M9.5 10.5C12.4984 10.5 14.9286 8.1498 14.9286 5.25C14.9286 2.3502 12.4984 0 9.5 0C6.50156 0 4.07143 2.3502 4.07143 5.25C4.07143 8.1498 6.50156 10.5 9.5 10.5ZM4.41071 17.3906C4.41071 17.9361 4.86451 18.375 5.42857 18.375C5.99263 18.375 6.44643 17.9361 6.44643 17.3906C6.44643 16.8451 5.99263 16.4062 5.42857 16.4062C4.86451 16.4062 4.41071 16.8451 4.41071 17.3906ZM13.5714 11.8371V13.8469C15.1194 14.1504 16.2857 15.4793 16.2857 17.0625V18.7729C16.2857 19.0846 16.0567 19.3553 15.7386 19.4168L14.373 19.6793C14.1906 19.7162 14.0125 19.6014 13.9743 19.4209L13.8429 18.777C13.8047 18.6006 13.9234 18.4242 14.11 18.3914L14.9286 18.2314V17.0625C14.9286 14.4867 10.8571 14.3924 10.8571 17.1404V18.2355L11.6757 18.3955C11.858 18.4324 11.9768 18.6047 11.9429 18.7811L11.8114 19.425C11.7732 19.6014 11.5951 19.7162 11.4127 19.6834L10.0895 19.5111C9.75446 19.466 9.50424 19.1912 9.50424 18.859V17.0625C9.50424 15.4793 10.6705 14.1545 12.2185 13.8469V11.993C12.1252 12.0217 12.0319 12.0381 11.9386 12.0709C11.1752 12.3293 10.3567 12.4729 9.50424 12.4729C8.65179 12.4729 7.83326 12.3293 7.06987 12.0709C6.75603 11.9643 6.43795 11.8986 6.11138 11.8576V15.2045C7.09107 15.4875 7.80781 16.357 7.80781 17.3947C7.80781 18.6621 6.7433 19.6916 5.43281 19.6916C4.12232 19.6916 3.05781 18.6621 3.05781 17.3947C3.05781 16.357 3.77455 15.4875 4.75424 15.2045V11.9068C2.05692 12.3457 0 14.5934 0 17.325V19.1625C0 20.1756 0.852455 21 1.9 21H17.1C18.1475 21 19 20.1756 19 19.1625V17.325C19 14.3719 16.5911 11.9807 13.5714 11.8371Z" fill={ pathName == `/Excluir_medicos` ? "white" : `#9B9B9B` } /> </svg>
                                <h2 style={ pathName == `/Excluir_medicos` ? { color: `white` } : { color: `#9b9b9b` }}>
                                    Excluir médicos
                                </h2>
                             </div>
                         </Link>
                         

                    </>
                )}
                </div>
            </div>

            {/* Bottom Section: User Info & Logout */}
            <div className="relative">
                <div className="flex flex-col items-center gap-3"> {/* Removido cursor-pointer */}
                    <ThemeSwitcher />
                    <div className="w-20 mt-2 h-[1px] bg-cinza dark:bg-noturno_borda"></div>
                    {/* SVG Profile Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 22 25" fill="none"> <path d="M10.9375 12.5C14.3896 12.5 17.1875 9.70215 17.1875 6.25C17.1875 2.79785 14.3896 0 10.9375 0C7.48535 0 4.6875 2.79785 4.6875 6.25C4.6875 9.70215 7.48535 12.5 10.9375 12.5ZM5.07812 20.7031C5.07812 21.3525 5.60059 21.875 6.25 21.875C6.89941 21.875 7.42188 21.3525 7.42188 20.7031C7.42188 20.0537 6.89941 19.5312 6.25 19.5312C5.60059 19.5312 5.07812 20.0537 5.07812 20.7031ZM15.625 14.0918V16.4844C17.4072 16.8457 18.75 18.4277 18.75 20.3125V22.3486C18.75 22.7197 18.4863 23.042 18.1201 23.1152L16.5479 23.4277C16.3379 23.4717 16.1328 23.335 16.0889 23.1201L15.9375 22.3535C15.8936 22.1436 16.0303 21.9336 16.2451 21.8945L17.1875 21.7041V20.3125C17.1875 17.2461 12.5 17.1338 12.5 20.4053V21.709L13.4424 21.8994C13.6523 21.9434 13.7891 22.1484 13.75 22.3584L13.5986 23.125C13.5547 23.335 13.3496 23.4717 13.1396 23.4326L11.6162 23.2275C11.2305 23.1738 10.9424 22.8467 10.9424 22.4512V20.3125C10.9424 18.4277 12.2852 16.8506 14.0674 16.4844V14.2773C13.96 14.3115 13.8525 14.3311 13.7451 14.3701C12.8662 14.6777 11.9238 14.8486 10.9424 14.8486C9.96094 14.8486 9.01855 14.6777 8.13965 14.3701C7.77832 14.2432 7.41211 14.165 7.03613 14.1162V18.1006C8.16406 18.4375 8.98926 19.4727 8.98926 20.708C8.98926 22.2168 7.76367 23.4424 6.25488 23.4424C4.74609 23.4424 3.52051 22.2168 3.52051 20.708C3.52051 19.4727 4.3457 18.4375 5.47363 18.1006V14.1748C2.36816 14.6973 0 17.373 0 20.625V22.8125C0 24.0186 0.981445 25 2.1875 25H19.6875C20.8936 25 21.875 24.0186 21.875 22.8125V20.625C21.875 17.1094 19.1016 14.2627 15.625 14.0918Z" fill="#166DED" /> </svg>
                    <h3 className="text-cinza_escuro dark:text-cinza_claro font-bold tracking-wider"> {/* Melhor contraste dark */}
                        Olá,
                        <span className="ml-1">{user.nome.split(" ")[0]}</span>
                    </h3>
                    <p className="text-roxo dark:text-azul underline cursor-pointer" onClick={handleLogout}>Sair</p>
                </div>
            </div>
        </>
    );
}


export default function Sidebar() {
    const router = useRouter();
    const auth = useAuth();
    const pathName = usePathname();
    // PASSO 1: Estado para controlar o menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        auth.logout();
        setIsMobileMenuOpen(false); // Fecha o menu ao deslogar
        router.push("/login");
    };

    // Funções para abrir/fechar o menu
    const openMobileMenu = () => setIsMobileMenuOpen(true);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    if (!auth.user) {
        // Idealmente, o layout principal cuidaria disso, mas mantendo a lógica original
        return null; 
    }

    const user = auth.user;

    return (
        <>
            {/* --- Sidebar Desktop --- */}
            <div className="fixed top-0 left-0 z-30 flex flex-col h-screen w-[270px] max-lg:hidden items-center justify-between py-10 bg-white dark:bg-noturno_medio shadow-sm border-r border-cinza dark:border-noturno_borda">
                <SidebarContent 
                    user={user} 
                    pathName={pathName} 
                    handleLogout={handleLogout} 
                    // Não precisa fechar no desktop
                />
            </div>

            {/* --- Header Mobile --- */}
            <div className="lg:hidden h-[76px] fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white dark:bg-noturno_medio border-b border-cinza dark:border-noturno_borda">
                 {/* Logo Menor no Mobile */}
                <button 
                    onClick={openMobileMenu} 
                    className="text-azul"
                    aria-label="Abrir menu"
                >
                    <Menu size={28} />
                </button>
                <div className="flex items-center gap-4">

                 <Link href={"/Home"}>
                    <Image
                        src={LogoVisalytica}
                        alt="Logo Visalytica"
                        className="h-8 w-auto" // Ajustar tamanho
                        priority
                        />
                 </Link>
                 <div className="border-l border-cinza w-1 h-8"></div>
                                 <a href="https://www.dasa.com.br" target="_blank" rel="noreferrer">
                    <Image src={LogoDasa} alt="Logo da Dasa" className="h-5 w-fit" />
                </a>
                        </div>
            </div>

            {/* --- Mobile Drawer Menu --- */}
            {/* Overlay */}
            <div 
                className={`lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeMobileMenu}
                aria-hidden={!isMobileMenuOpen}
            />
            {/* Drawer */}
            <div 
                className={`lg:hidden  fixed top-0 left-0 z-50 flex flex-col h-full w-80 bg-white dark:bg-noturno_medio border-r border-cinza dark:border-noturno_borda transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
             >
                {/* Drawer Header com Botão Fechar */}
                <div className="flex justify-between items-center p-4 pt-6">
                                      <Image
                        src={LogoVisalytica}
                        alt="Logo Visalytica"
                        className="h-6 w-auto"
                        priority
                    />
                    <button 
                        onClick={closeMobileMenu} 
                        className="text-azul"
                        aria-label="Fechar menu"
                     >
                        <X size={24} />
                    </button>
                </div>

                {/* Conteúdo do Sidebar dentro do Drawer */}
                <div className="flex flex-col flex-grow items-center justify-between py-6 gap-8 overflow-y-auto"> {/* Adicionado padding e overflow */}
                     <SidebarContent 
                         user={user} 
                         pathName={pathName} 
                         handleLogout={handleLogout} 
                         closeMobileMenu={closeMobileMenu}
                         isMobile={true}
                     />
                 </div>
            </div>
        </>
    );
}