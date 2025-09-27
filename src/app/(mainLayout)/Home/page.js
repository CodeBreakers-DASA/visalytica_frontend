import Link from 'next/link';
import CardHome from '../../../components/CardHome'

function HomeInicial() {
    return ( 
        <div className='h-full'>
            <Link href={'/Analise'}>
                <CardHome invertido nome='Fazer análise' alt='' imagem="./analise.png"/>
            </Link>
            <Link href={'/ConsultarPacientes'}>
                <CardHome nome='Consultar pacientes' alt='' imagem="./consultar.png"/>
            </Link>
        </div>
     );
}

export default HomeInicial;