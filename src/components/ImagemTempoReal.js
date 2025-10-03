import ServerFrame from "./ServerFrame";

export default function ImagemTempoReal({ label, selectedDevice, refVideo, frameCaptura, medidas, status = false, qr }) {
    
    return (
        <div className={`bg-gray-900 flex flex-col items-center justify-between w-auto h-full relative rounded-xl xs:rounded-2xl px-3 xs:px-4 sm:px-5 pb-2 xs:pb-3 min-h-56 md:min-h-72`}>
            <div className="w-full flex justify-between items-center my-2 xs:my-3">
                <p className="text-white text-xs xs:text-sm sm:text-base">{label}</p>
                <p style={{backgroundColor: status ? "#439F57" : "#CFCFCF", color: status && "#fff"}} className={`px-3 xs:px-4 sm:px-5 py-1 xs:py-1.5 rounded-md text-xs xs:text-sm`}>
                    {status ? "Capturado" : "Não capturado"}
                </p>
            </div>
            {selectedDevice && <ServerFrame camera={selectedDevice} refVideo={refVideo} frameCaptura={frameCaptura} medidas={medidas} qr={qr}/> }
        </div>
    )
}