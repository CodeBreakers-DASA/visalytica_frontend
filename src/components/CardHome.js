import Link from "next/link";
import Image from 'next/image';
function CardHome({ nome, imagem, alt, href = "#" }) {
  return (
  <Link href={href} className="flex flex-1 justify-center">
      {/* O container interno ocupa toda a altura do Link */}
      <div className="flex h-full w-full cursor-pointer flex-col items-center justify-between gap-4 rounded-[42px] border-2 border-cinza p-8 transition-transform duration-300 ease-in-out hover:scale-[1.02]">
        
        {/* 2. O container da imagem agora é flexível (flex-1) em vez de ter altura fixa */}
        <div className="relative flex-1 w-full">
          <Image
            src={imagem} // Use a prop 'imagem' que você está passando
            alt={alt}     // Use a prop 'alt'
            fill={true}
            style={{
              objectFit: "cover",
              borderRadius: "22px",
            }}
          />
        </div>
        
        <div className="flex justify-center items-center">
          <h2 className="text-4xl uppercase text-azul font-black text-center 850:text-5xl lg:text-[36px]">
            {nome}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default CardHome;
