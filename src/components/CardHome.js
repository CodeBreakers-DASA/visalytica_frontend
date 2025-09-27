function CardHome({ nome, imagem, alt, invertido = false }) {
  return (
    <div
      style={{ flexDirection: !invertido ? "row-reverse" : "" }}
      className="h-[calc(40vh-32px)] min-h-60 mx-28 mt-12 p-8 flex justify-between items-center shadow-[0_0_7px_2px] shadow-black/25 rounded-[42px] gap-4"
    >
      <div className="w-1/2 h-full rounded-3xl my-auto">
        <img
          src={imagem}
          className="h-full rounded-[30px] w-full object-cover"
        ></img>
      </div>
      <div className=" w-1/2 flex justify-center items-center">
        <h2 className="text-4xl 850:text-5xl lg:text-6xl uppercase text-azul font-black text-center flex flex-col gap-2 items-center">
          {" "}
          {nome.split(" ").map((palavra, index) => (
            <span key={index}>{palavra}</span>
          ))}
        </h2>
      </div>
    </div>
  );
}

export default CardHome;
