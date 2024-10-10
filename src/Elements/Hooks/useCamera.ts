import { useState, useEffect } from "react";

export default function useCamera() {
  const [stream, setStream] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  let camerSource = localStorage.getItem("cameraSource");

  const getCameraList = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");

      setAvailableCameras(cameras);
      if (camerSource) {
        setCameraSource(camerSource);
      } else setCameraSource(cameras[0]?.deviceId || null); // Default to first camera
    } catch (error) {
      console.error("Error getting camera list:", error);
    }
  };
  const getAccess = async (deviceId) => {
    try {
      const constraints = { video: { deviceId } };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const setCameraSource = (deviceId) => {
    localStorage.setItem("cameraSource", deviceId);
    stopSteam();
    getAccess(deviceId);
  };
  const stopSteam = () => stream?.getTracks().forEach((track) => track.stop());

  useEffect(() => {
    getCameraList();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
    };
  }, []);

  const takePhoto = async (getPhoto) => {
    if (stream) {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        setTimeout(() => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const photo = canvas.toDataURL("image/png").split(",")[1];
          video.remove();
          getPhoto(photo);
        }, 10); // Delay for 100 milliseconds (adjust as needed)
      };
    }
  };

  return {
    stream,
    takePhoto,
    start: getAccess,
    stopSteam,
    availableCameras,
    setCameraSource,
    camerSource,
  };
}
