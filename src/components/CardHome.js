function CardHome({ nome, imagem, alt, invertido = false}) {
    return ( 
        <div style={{flexDirection: !invertido ? 'row-reverse' : ''}} className="h-[35vh] mx-14 mt-12 p-8 flex justify-evenly items-center shadow-[0_0_7px_2px] shadow-black/25 rounded-3xl">
            <div className="w-2/5 h-full rounded-3xl my-auto">
                <img src={imagem} className="h-full rounded-3xl mx-auto"></img>
            </div>
            <h2 className="text-6xl uppercase text-azul font-black w-1/3 text-center">{nome}</h2>
        </div>
     );
}

export default CardHome;