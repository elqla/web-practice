import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

function WebcamTest() {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
    }
  }, [webcamRef]);

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" mirrored={true} screenshotQuality={1} />
      <button onClick={capture}>Capture</button>
    </div>
  );
}

export default WebcamTest;
