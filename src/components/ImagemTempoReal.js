export default function ImagemTempoReal({ label, widht, height, imagem}){
    return(
        <div className={`${!imagem && 'bg-gray-900' } w-full h-1/2 relative rounded-2xl`}>
            <p className="mt-3 ml-5 text-white">{label}</p>   
            {/* <img className="w-1/3 h-1/3" src={`https://fastly.picsum.photos/id/127/600/600.jpg?hmac=km47e-dKPYG-1vheoEz3WlbUrtSrYoeJ7Aft7UYbm_M`} alt="" /> */}
        </div>
    )
}