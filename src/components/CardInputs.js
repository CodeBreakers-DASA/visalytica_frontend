function CardInputs({ children }) {
    return ( 
        <div className='h-full w-full flex flex-col justify-between bg-cinza_claro rounded-2xl p-6 border border-cinza'>
            {children}
        </div>
     );
}

export default CardInputs ;