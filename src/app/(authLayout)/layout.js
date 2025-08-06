import "../globals.css"; // Você pode importar os mesmos estilos globais
import authImage from '../../assets/authImage.png'
import logo from '../../assets/logoGradiente.svg'
import logoDasa from '../../assets/logoDasa.svg'
import Image from 'next/image'
export default function RootLayout({ children }) {
  return (
    <main className="flex">
      <div className="h-screen w-full relative">
        <Image
          src={authImage}
          alt="uma mulher em um fundo azul olhando em um microscópio"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full p-[90px] pt-56">
        <Image
          src={logo}
          alt="logo visalytica"
        />
        <div className="mt-14 p-[30px] border border-azul rounded-[10px] shadow-[4px_4px_0_1px_#166DED]">
          {children}
        </div>
        <div className="mt-auto">
          <Image
            src={logoDasa}
            alt="logo dasa"
          />
        </div>
      </div>
    </main>
  );
}