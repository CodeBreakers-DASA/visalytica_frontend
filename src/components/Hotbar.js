import Image from "next/image";

import LogoVisalytica from '../../public/LogoVisalytica.png'
import LogoDasa from '../../public/LogoDasa.svg'
import IconePessoa from '../../public/IconePessoa.svg'

export default function Hotbar({ nome = 'Fulano' }) {
    return ( 
        <div className="flex justify-between mx-12 mt-8">
            <div className="flex justify-between items-center gap-8">
                <Image src={LogoVisalytica} alt="Logo da Visalytica"/>
                <div className="w-0.5 h-full bg-[#166DED]"></div>
                <Image src={LogoDasa} alt="Logo da Dasa"/>
            </div>
            <div className="flex items-center gap-3.5">
                <Image src={IconePessoa} alt="Icone de uma pessoa"/>
                <h3 className="text-[#166DED] text-lg font-semibold">Olá, {nome}</h3>
            </div>
        </div>
     );
}
