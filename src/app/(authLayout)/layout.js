import "../globals.css";
import logoVisalytica from "../../assets/logoVisalyticaGrad.svg";
import logoDasa from "../../assets/logoDasa.svg";
import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <main className="flex h-screen">
      <div className="h-screen w-full relative overflow-hidden hidden lg:flex">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/authvideo.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>
      <div className="flex flex-col justify-center items-center w-full px-3 xs:px-4 sm:px-6 md:px-8">
        <div className="mt-auto flex flex-col items-center">
          <Image
            src={logoVisalytica}
            alt="logo visalytica"
            className="w-48 h-18 xs:w-52 xs:h-19 sm:w-56 sm:h-20 md:w-60 md:h-22 lg:w-64 lg:h-24"
          />
          <div className="mt-8 xs:mt-10 sm:mt-12 md:mt-14 p-[20px] xs:p-[25px] sm:p-[30px] border border-azul rounded-[8px] xs:rounded-[9px] sm:rounded-[10px] max-w-80 xs:max-w-84 sm:max-w-88 md:max-w-92 lg:max-w-96 mx-4 shadow-[3px_3px_0_1px_#166DED] xs:shadow-[3.5px_3.5px_0_1px_#166DED] sm:shadow-[4px_4px_0_1px_#166DED]">
            {children}
          </div>
        </div>
        <div className="my-auto">
          <a href="https://www.dasa.com.br" target="_blank" rel="noreferrer">
          <Image src={logoDasa} alt="logo dasa" className="w-auto h-6 xs:h-7 sm:h-8 md:h-9 lg:h-auto" />
          </a>
        </div>
      </div>
    </main>
  );
}
