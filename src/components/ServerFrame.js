"use client";

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function VideoReceiver() {
  // Envia webCam para servidor

  const videoRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {

    socketRef.current = io("http://localhost:5000");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Erro câmera:", err));

    const sendFrames = setInterval(() => {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      console.log(canvas.width, canvas.height);
      
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpg");
      socketRef.current.emit("frame", dataUrl);
    }, 50); // 10 FPS

    return () => {
      clearInterval(sendFrames);
      socketRef.current.disconnect();
    };
  }, []);

  // Pega webCam processado do servidor

  const [frame, setFrame] = useState("");

  useEffect(() => {
    socket.on("server_frame", (data) => {
      setFrame(data.frame);
    });
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline className="hidden"/>
      {
        frame ? <img src={frame} alt="frame" className="h-[32vh] mx-auto"/> 
        : <h3 className="text-white">Imagem não encontrada :(</h3>
      }
    </div>
  );
}
