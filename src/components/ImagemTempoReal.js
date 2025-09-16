'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function ImagemTempoReal({ label, widht, height, imagem }) {

    const [devices, setDevices] = useState([]);
    const [activeDeviceId, setActiveDeviceId] = useState(undefined);
    const webcamRef = useRef(null);

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

    // Função para capturar uma foto (opcional, como no exemplo anterior)
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc); // Faça algo com a imagem, como exibi-la
    }, [webcamRef]);

    // Define as constraints para o componente Webcam
    const videoConstraints = {
        width: 1280,
        height: 720,
        // Se um deviceId estiver selecionado, usa-o.
        // Se não, o react-webcam escolherá a câmera padrão.
        deviceId: activeDeviceId ? { exact: activeDeviceId } : undefined,
    };


    return (
        <div className={`${!imagem && 'bg-gray-900'} w-full h-full relative rounded-2xl`}>
            <h2>Seletor de Câmera</h2>
            <div style={{ marginBottom: '10px' }}>
                {devices.length > 0 ? (
                    <select
                        onChange={(e) => setActiveDeviceId(e.target.value)}
                        value={activeDeviceId}
                        style={{ padding: '8px', fontSize: '16px' }}
                    >
                        <option value="">Selecione uma Câmera</option>
                        {devices.map((device, key) => (
                            <option key={key} value={device.deviceId}>
                                {device.label || `Câmera ${key + 1}`}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>Nenhuma câmera encontrada ou permissão negada.</p>
                )}
            </div>

            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
            />

            <p className="mt-3 ml-5 text-white">{label}</p>
        </div>
    )
}