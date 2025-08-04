import Link from 'next/link';
import CardHome from '../../../components/CardHome'

function HomeInicial() {
    return ( 
        <div>
            <CardHome nome='Consultar pacientes' alt=''/>
            <Link href={'/Analise'}>
                <CardHome invertido nome='Fazer análise' alt=''/>
            </Link>
        </div>
     );
}

export default HomeInicial;