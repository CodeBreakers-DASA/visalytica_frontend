import ImagemTempoReal from '../../../components/ImagemTempoReal'
import Button from '../../../components/Button'

export default function Analise(){
    return (
        <div className='flex h-[80vh] mx-16 gap-12'>
            <div className='flex flex-col gap-10 h-full w-full'>
                <ImagemTempoReal 
                    widht={'600'}
                    height={'600'}
                    label={'Altura'}
                    imagem={''}
                />
                <ImagemTempoReal 
                    widht={'600'}
                    height={'600'}
                    label={'Comprimento e Largura'}
                    imagem={''}
                />
            </div>
            <div className='flex flex-col gap-6 w-1/2'>
                <div className='h-full w-full bg-gray-500 rounded-2xl p-6'>
                    
                </div>
                <div className='flex justify-between gap-4 text-white text-xl font-medium'>
                    <Button classes={'bg-[#9b9b9b]'}>
                        Cancelar
                    </Button>
                    <Button classes={'bg-[#166DED]'}>
                        👍
                    </Button>
                    <Button classes={'bg-gradient-to-r from-[#166DED] to-[#2A279C] w-full py-4 px-6'}>
                        Continuar
                    </Button>
                </div>
            </div>
        </div>
    )
}