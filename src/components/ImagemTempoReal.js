'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import ServerFrame from "./ServerFrame"

export default function ImagemTempoReal({ imagem, label }) {

    const [devices, setDevices] = useState([]);
    const [activeDeviceId, setActiveDeviceId] = useState(undefined);
    

    // Função para lidar com a obtenção dos dispositivos de mídia
    const handleDevices = useCallback(
        (mediaDevices) =>
            setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
        [setDevices]
    );

    // Efeito para obter os dispositivos quando o componente é montado
    useEffect(() => {
        // A permissão da câmera deve ser concedida para que enumerateDevices retorne os detalhes
        // Primeiro, pedimos permissão para garantir que temos a lista completa
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            // Importante: parar a stream imediatamente após obter a permissão
            // para que a câmera não fique ligada desnecessariamente.
            stream.getTracks().forEach(track => track.stop());

            // Agora, liste os dispositivos
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        }).catch(error => {
            console.error("Erro ao obter permissão ou listar dispositivos:", error);
        });
    }, [handleDevices]);

  

    // Define as constraints para o componente Webcam
    const videoConstraints = {
        width: 1280,
        height: 720,
        // Se um deviceId estiver selecionado, usa-o.
        // Se não, o react-webcam escolherá a câmera padrão.
        deviceId: activeDeviceId ? { exact: activeDeviceId } : undefined,
    };


    return (
        <div className={`${!imagem && 'bg-gray-900'} flex flex-col items-center justify-between w-auto h-full relative rounded-2xl p-3`}>
            <p className="text-white">{label}</p>
            {/* <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{ width: '600px', height: '100%' }}
                className="rounded-2xl mx-auto"
            /> */}
            <ServerFrame/>
        </div>
    )
}