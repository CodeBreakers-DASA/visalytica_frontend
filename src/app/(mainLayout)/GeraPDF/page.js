'use client'

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import toast from 'react-hot-toast';
import Button from "../../../components/Button";
import CardInputs from "../../../components/CardInputs";
import Input from "../../../components/Input";
import RelatorioMedicoPDF from "../../../components/pdf/RelatorioMedicoPDF";

function GeraPDF() {
    const searchParams = useSearchParams();
    const [dadosAnalise, setDadosAnalise] = useState({
        cpf: '',
        nomePaciente: '',
        dataNascimento: '',
        nomePeca: '',
        dimensoes: '',
        diagnostico: '',
        observacoes: ''
    });

    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const configuracaoRelatorio = {
        clinica: 'Visalytica Medical Center',
        endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP',
        telefone: '(11) 1234-5678',
        email: 'contato@visalytica.com.br',
        medico: 'Dr. João Silva',
        crm: 'CRM-SP 123456',
        especialidade: 'Patologista'
    };

    useEffect(() => {
        setDadosAnalise({
            cpf: searchParams.get('cpf') || '',
            nomePaciente: searchParams.get('nomePaciente') || '',
            dataNascimento: searchParams.get('dataNascimento') || '',
            nomePeca: searchParams.get('nomePeca') || '',
            dimensoes: searchParams.get('dimensoes') || '',
            diagnostico: searchParams.get('diagnostico') || '',
            observacoes: searchParams.get('observacoes') || ''
        });
    }, [searchParams]);

    useEffect(() => {
        const gerarPDFPreview = async () => {
            if (dadosAnalise.nomePaciente) {
                try {
                    setLoading(true);
                    const blob = await pdf(<RelatorioMedicoPDF dados={dadosAnalise} configuracao={configuracaoRelatorio} />).toBlob();
                    const url = URL.createObjectURL(blob);
                    setPdfUrl(url);
                } catch (error) {
                    console.error('Erro ao gerar PDF:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        gerarPDFPreview();
    }, [dadosAnalise]);

    const handleDiagnosticoChange = (e) => {
        setDadosAnalise(prev => ({ ...prev, diagnostico: e.target.value }));
    };

    const handleObservacoesChange = (e) => {
        setDadosAnalise(prev => ({ ...prev, observacoes: e.target.value }));
    };

    const handleSalvar = () => {
        toast.success('Análise salva com sucesso!');
        
        setTimeout(() => {
            window.location.href = '/Home';
        }, 1500);
    };

    return ( 
        <div className="flex flex-col xl:flex-row min-h-screen bg-gray-50 p-2 md:p-4 lg:p-6 xl:p-8 gap-4 md:gap-6">
            <div className="flex flex-col w-full xl:flex-1 h-[400px] md:h-[500px] lg:h-[600px] xl:h-[80vh]">
                {/* Preview do PDF */}
                <div className="bg-[#252525] rounded-lg flex items-center justify-center h-full">
                    {loading ? (
                        <div className="text-white text-center p-4">
                            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-sm md:text-base">Gerando PDF...</p>
                        </div>
                    ) : pdfUrl ? (
                        <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[85%] md:h-[90%] lg:h-[93%] flex items-center justify-center overflow-hidden relative">
                            <div className="w-full h-full overflow-hidden relative">
                                <iframe 
                                    src={pdfUrl + '#view=FitH&toolbar=0&navpanes=0&scrollbar=0&page=1&zoom=FitH'}
                                    className="w-[97%] h-full rounded-lg bg-white absolute right-[-20px] border-0"
                                    title="Preview do PDF"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-white text-center p-4">
                            <p className="text-base md:text-lg">Preview do PDF</p>
                            <p className="text-xs md:text-sm opacity-70 mt-2">Visalytica ©</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col w-full xl:w-1/2 xl:max-w-lg h-[400px] md:h-[500px] lg:h-[600px] xl:h-[80vh] gap-4 md:gap-5 justify-between">
                <CardInputs>
                    <Input
                        label={'Nome do Paciente*'}
                        value={dadosAnalise.nomePaciente}
                        placeHolder={'Nome do paciente...'}
                        disabled
                        classes="text-xs sm:text-sm md:text-base"
                    />
                    <Input
                        label={'CPF*'}
                        value={dadosAnalise.cpf}
                        placeHolder={'000.000.000-00'}
                        disabled
                        classes="text-xs sm:text-sm md:text-base"
                    />
                    <Input
                        label={'Data de Nascimento*'}
                        value={dadosAnalise.dataNascimento}
                        placeHolder={'dd/mm/aaaa'}
                        disabled
                        classes="text-xs sm:text-sm md:text-base"
                    />
                    <Input
                        label={'Nome da peça*'}
                        value={dadosAnalise.nomePeca}
                        placeHolder={'Pulmão'}
                        disabled
                        classes="text-xs sm:text-sm md:text-base"
                    />
                    <Input
                        label={'Comprimento x Largura x Altura*'}
                        value={dadosAnalise.dimensoes}
                        placeHolder={'3,5 x 2,0 x 1,2 cm'}
                        disabled
                        classes="text-xs sm:text-sm md:text-base"
                    />
                    <Input
                        label={'Possível diagnóstico*'}
                        value={dadosAnalise.diagnostico}
                        onChange={handleDiagnosticoChange}
                        placeHolder={'Digite o possível diagnóstico...'}
                        classes="text-xs sm:text-sm md:text-base"
                    />
                    
                    <div className="flex flex-col gap-2 md:gap-3">
                        <label className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
                            Observações*
                        </label>
                        <textarea
                            value={dadosAnalise.observacoes}
                            onChange={handleObservacoesChange}
                            placeholder="Carcinoma de pulmão"
                            className="w-full p-2 sm:p-3 bg-cinza_medio border border-cinza rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[50px] sm:min-h-[55px] md:min-h-[60px] lg:min-h-[65px] placeholder-cinza_escuro text-xs sm:text-sm md:text-base"
                        />
                    </div>
                </CardInputs>
                
                {/* Container dos botões responsivo */}
                <div className="mt-auto space-y-3 md:space-y-4">
                    {/* Linha superior: Cancelar e Salvar */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <div className="flex-1">
                            <Link href='/Analise'>
                                <Button classes={'w-full h-10 sm:h-12 md:h-14 lg:h-16 bg-cinza_escuro flex items-center justify-center rounded-xl transition-all duration-200'}>
                                    <span className="text-white font-medium text-xs sm:text-sm md:text-base lg:text-lg">Cancelar</span>
                                </Button>
                            </Link>
                        </div>
                        
                        {/* Botão Salvar - mantém o mesmo JSX */}
                        <div className="flex-1">
                            <Button 
                                classes={'w-full h-10 sm:h-12 md:h-14 lg:h-16 bg-gradient-to-r from-azul to-azul_escuro hover:from-azul_escuro hover:to-azul flex items-center justify-center rounded-xl transition-all duration-200'}
                                onClick={handleSalvar}
                            >
                                <span className="text-white font-medium text-xs sm:text-sm md:text-base lg:text-lg">Salvar</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeraPDF;
