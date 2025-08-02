function CardHome({ nome, imagem, alt, invertido = false}) {
    return ( 
        <div style={{flexDirection: !invertido ? 'row-reverse' : ''}} className="h-[35vh] mx-14 mt-12 p-8 flex justify-evenly items-center shadow-[0_0_7px_2px] shadow-black/25 rounded-4xl">
            <div className="bg-gray-400 min-w-1/3 h-full rounded-4xl">
                
            </div>
            <h2 className="text-5xl uppercase text-[#166DED] font-black max-w-1/3 text-center">{nome}</h2>
        </div>
     );
}

export default CardHome;