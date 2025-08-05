import ImagemTempoReal from '../../../components/ImagemTempoReal'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import CardInputs from '../../../components/CardInputs'
import Link from 'next/link'

export default function Analise() {
    return (
        <div className='flex h-[80vh] mx-16 gap-6'>
            <div className='flex flex-col gap-6 h-full w-full'>
                <ImagemTempoReal
                    label={'Altura'}
                    imagem={''}
                />
                <ImagemTempoReal
                    label={'Comprimento e Largura'}
                    imagem={''}
                />
            </div>
            <div className='flex flex-col gap-6 w-1/2'>
                <CardInputs className='h-full w-full flex flex-col justify-between bg-[#FFFBFB] rounded-2xl p-6 border border-[#CFCFCF]'>
                    <Input
                        label={'CPF*'}
                        placeHolder={'000.000.000-0'}
                    />
                    <Input
                        label={'Nome do paciente*'}
                        placeHolder={'Nome e sobrenome'}
                    />
                    <Input
                        label={'Data de nascimento*'}
                        placeHolder={'00/00/0000'}
                        type='date'
                    />
                    <Input
                        label={'Nome da peça*'}
                        placeHolder={'Pulmão'}
                    />
                    <Input
                        label={'Comprimento x Largura x Altura*'}
                        placeHolder={'3,5 x 2,0 x 1,2 cm'}
                    />
                    <Input
                        label={'Possível diagnóstico*'}
                        placeHolder={'Carcinoma de pulmão'}
                    />
                </CardInputs>
                <div className='flex justify-between gap-2'>
                    <Link href='/Home'>
                        <Button classes={'bg-[#9b9b9b]'}>
                            Cancelar
                        </Button>
                    </Link>
                    <Button classes={'bg-[#166DED]'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M0 9.375H9.375V0H0V9.375ZM3.125 3.125H6.25V6.25H3.125V3.125ZM12.5 0V9.375H21.875V0H12.5ZM18.75 6.25H15.625V3.125H18.75V6.25ZM0 21.875H9.375V12.5H0V21.875ZM3.125 15.625H6.25V18.75H3.125V15.625ZM20.3125 12.5H21.875V18.75H17.1875V17.1875H15.625V21.875H12.5V12.5H17.1875V14.0625H20.3125V12.5ZM20.3125 20.3125H21.875V21.875H20.3125V20.3125ZM17.1875 20.3125H18.75V21.875H17.1875V20.3125Z" fill="white" />
                        </svg>
                    </Button>
                        <Link href='/GeraPDF'> 
                            <Button classes={'bg-gradient-to-r from-[#166DED] to-[#2A279C] w-full py-4 px-6'}>
                                Continuar
                            </Button>
                        </Link>
                </div>
            </div>
        </div>
    )
}