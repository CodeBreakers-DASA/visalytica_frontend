import Link from 'next/link';
import CardHome from '../../../components/CardHome'

function HomeInicial() {
    return ( 
        <div>
            <Link href={'/ConsultarPacientes'}>
                <CardHome nome='Consultar pacientes' alt=''/>
            </Link>
            <Link href={'/Analise'}>
                <CardHome invertido nome='Fazer análise' alt=''/>
            </Link>
        </div>
     );
}

export default HomeInicial;