import Link from "next/link";
import Button from "../../../components/Button";
import CardInputs from "../../../components/CardInputs";
import ImagemTempoReal from "../../../components/ImagemTempoReal";
import Input from "../../../components/Input";

function GeraPDF() {
    return ( 
        <div className="flex h-[80vh] mx-16 gap-6">
            <div className="flex flex-col h-full w-full ">
                <ImagemTempoReal label={'PDF'}/>
            </div>
            <div className="flex flex-col w-1/2 gap-5">
                <CardInputs>
                    <Input
                        label={'Nome do Paciente*'}
                        placeHolder={'Nome do paciente...'}
                        disabled
                    />
                    <Input
                        label={'Nome da peça*'}
                        placeHolder={'Pulmão'}
                        disabled
                    />
                    <Input
                        label={'Comprimento x Largura x Altura*'}
                        placeHolder={'3,5 x 2,0 x 1,2 cm'}
                        type='date'
                        disabled
                    />
                    <Input
                        label={'Possível diagnóstico*'}
                        placeHolder={'Carcinoma de pulmão'}
                        disabled
                    />
                    <Input
                        label={'Observações*'}
                        placeHolder={'Análise feita em 05/08/2025'}
                        disabled
                    />
                </CardInputs>
                <div className="flex gap-5 ">
                    <Link href='/Analise'>
                        <Button classes={'bg-[#9b9b9b] w-full'}>Cancelar</Button>
                    </Link>
                    <Button classes={'w-full bg-gradient-to-r from-[#166DED] to-[#2A279C]'}>Salvar</Button>
                </div>
                <Button classes={'bg-gradient-to-r from-[#166DED] to-[#2A279C] w-full py-4 px-6'}>Imprimir</Button>
            </div>
        </div>
     );
}

export default GeraPDF;