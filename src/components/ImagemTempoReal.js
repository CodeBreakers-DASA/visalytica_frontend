import ServerFrame from "./ServerFrame"

export default function ImagemTempoReal({ label, selectedDevice, refVideo, frameCaptura, medidas, status = false }) {
    
    return (
        <div className={`bg-gray-900 flex flex-col items-center justify-between w-auto h-full relative rounded-2xl px-5 pb-3`}>
            <div className="w-full flex justify-between items-center my-3">
                <p className="text-white">{label}</p>
                    <p style={{backgroundColor: status ? "#439F57" : "#CFCFCF", color: status && "#fff"}} className={`px-5 rounded-md`}>
                        {status ? "Capturado" : "Não capturado"}
                    </p>
            </div>
            {selectedDevice && <ServerFrame camera={selectedDevice} refVideo={refVideo} frameCaptura={frameCaptura} medidas={medidas}/> }
        </div>
    )
}