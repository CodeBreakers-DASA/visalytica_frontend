import "../globals.css";
import logoVisalytica from "../../assets/logoVisalyticaGrad.svg";
import logoDasa from "../../assets/logoDasa.svg";
import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      {/* Video section - hidden on mobile, visible on lg+ */}
      <div className="hidden lg:block lg:h-screen lg:w-full relative overflow-hidden">
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
      
      {/* Content section */}
      <div className="flex flex-col justify-center items-center w-full min-h-screen lg:h-screen p-4 xs:p-6 sm:p-8 lg:p-0">
        <div className="flex flex-col items-center justify-center w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-none h-full">
          {/* Logo */}
          <Image
            src={logoVisalytica}
            alt="logo visalytica"
            className="w-40 h-16 xs:w-48 xs:h-18 sm:w-64 sm:h-24 mb-[45px] xs:mb-[52px] sm:mb-[58px] md:mb-[60px] lg:mb-[63px]"
          />
          
          {/* Login box */}
          <div className="p-5 xs:p-[25px] sm:p-[30px] border border-azul rounded-[10px] shadow-[4px_4px_0_1px_#166DED] w-full xs:w-[320px] sm:w-[383px] h-auto xs:h-[310px] sm:h-[339px]">
            {children}
          </div>
          
          {/* Spacer for better centering */}
          <div className="flex-1 lg:hidden"></div>
        </div>
        
        {/* DASA Logo - hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block mt-auto mb-8">
          <a href="https://www.dasa.com.br" target="_blank" rel="noreferrer">
            <Image
              src={logoDasa}
              alt="logo dasa"
              className="w-auto h-6"
            />
          </a>
        </div>
      </div>
    </main>
  );
}
