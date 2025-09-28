"use client";

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function VideoReceiver({ camera, refVideo, frameCaptura, medidas}) {
  // Envia webCam para servidor

  const videoRef = refVideo;
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    
    navigator.mediaDevices
      .getUserMedia({ video: camera.id ? { deviceId: { exact: camera.id } } : true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Erro câmera:", err));

    const sendFrames = setInterval(() => {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpg");
      
      socketRef.current.emit("frame", { cameraId: camera.id, data: dataUrl });
    }, 200); // 10 FPS

    return () => {
      clearInterval(sendFrames);
      socketRef.current.disconnect();
    };
  }, []);

  // Pega webCam processado do servidor
  const [frame, setFrame] = useState("");

  useEffect(() => {
    socket.on("server_frame_yolo", (data) => {      
      if (data.cameraId == camera.id) {
        setFrame(data.frame)
        frameCaptura(data.frame)

        if(camera.posicao == `cima`){
          if(data?.medidas[0][0]) {
            data.medidas[0][0] < medidas.comprimento_cm ? medidas.comprimento_cm = data?.medidas[0][0] : ``          
          } 
          if(data?.medidas[0][1]) {
            data.medidas[0][1] < medidas.largura_cm ? medidas.largura_cm = data?.medidas[0][1] : ``  
          } 
        } else {
          if(data?.medidas[0][0]) {
            data.medidas[0][0] < medidas.altura_cm ? medidas.altura_cm = data?.medidas[0][0] : `` 
          } 
        }
            
        // console.log(data.medidas);
          
      }
    });
  }, []);


  return (
    <div>
      <video ref={videoRef} autoPlay playsInline className="hidden" />
      {
        frame ? <img src={frame} alt="frame" className="h-[32vh] mx-auto"/>
          : <h3 className="text-white">Imagem não encontrada</h3>
      }
    </div>
  );
}
