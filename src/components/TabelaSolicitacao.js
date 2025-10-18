import Button from "./Button";

function TabelaSolicitacao({ colunas = [], linhas = []}) {
    return (
        <div className="bg-white dark:bg-noturno_medio p-10 pb-5 rounded-[10px] h-full">
            <div className="flex justify-around items-center text-center bg-cinza_medio rounded-t-[10px] text-cinza_texto font-medium p-5">
                {
                    colunas.map(coluna => <h3 key={coluna} className="w-full">{coluna}</h3>)
                }
            </div>
            <div className="flex flex-col justify-between p-5 text-cinza_texto">
                {
                    linhas.map(linha => (
                        <div className="flex justify-around text-center items-center">
                            <h3 className="w-full">{linha.paciente}</h3>
                            <h3 className="w-full">{linha.cpf}</h3>
                            <h3 className="w-full">{linha.data_solicitacao}</h3>
                            <h3 className="w-full">{linha.solicitante}</h3>
                            <h3 className="w-full text-azul underline font-semibold">{linha.justificativa} Justif.</h3>
                            <div className="w-full flex justify-center gap-3">
                                <Button classes="h-10 w-10 bg-[#2ACA44] hover:scale-1" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                                        <path d="M7.47218 17.6465L0.322169 9.80163C-0.10739 9.33032 -0.10739 8.56616 0.322169 8.0948L1.87777 6.38798C2.30733 5.91663 3.00385 5.91663 3.43341 6.38798L8.25 11.6726L18.5666 0.353478C18.9961 -0.117826 19.6927 -0.117826 20.1222 0.353478L21.6778 2.0603C22.1074 2.5316 22.1074 3.29577 21.6778 3.76712L9.02782 17.6465C8.59822 18.1178 7.90174 18.1178 7.47218 17.6465Z" fill="white" />
                                    </svg>
                                </Button>
                                <Button classes="h-10 w-10 bg-[#FA3E3E]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M11.8516 8.59375L16.7378 3.70752C17.3374 3.10791 17.3374 2.13574 16.7378 1.53564L15.6519 0.449707C15.0522 -0.149902 14.0801 -0.149902 13.48 0.449707L8.59375 5.33594L3.70752 0.449707C3.10791 -0.149902 2.13574 -0.149902 1.53564 0.449707L0.449707 1.53564C-0.149902 2.13525 -0.149902 3.10742 0.449707 3.70752L5.33594 8.59375L0.449707 13.48C-0.149902 14.0796 -0.149902 15.0518 0.449707 15.6519L1.53564 16.7378C2.13525 17.3374 3.10791 17.3374 3.70752 16.7378L8.59375 11.8516L13.48 16.7378C14.0796 17.3374 15.0522 17.3374 15.6519 16.7378L16.7378 15.6519C17.3374 15.0522 17.3374 14.0801 16.7378 13.48L11.8516 8.59375Z" fill="white" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default TabelaSolicitacao;