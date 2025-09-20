import ServerFrame from "./ServerFrame"

export default function ImagemTempoReal({ label, selectedDevice }) {
    console.log(selectedDevice);
    
    return (
        <div className={`bg-gray-900 flex flex-col items-center justify-between w-auto h-full relative rounded-2xl p-3`}>
            <p className="text-white">{label}</p>
            {selectedDevice && <ServerFrame camera={selectedDevice} /> }
        </div>
    )
}