export default function ImagemTempoReal({ label, widht, height, imagem}){
    return(
        <div className={`${!imagem && 'bg-gray-900' } w-full h-1/2 relative rounded-2xl`}>
            <p className="mt-3 ml-5 text-white">{label}</p>   
        </div>
    )
}