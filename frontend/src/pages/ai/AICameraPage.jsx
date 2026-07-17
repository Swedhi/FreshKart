import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function AICameraPage() {

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  // Capture from webcam
  const capture = async () => {

    if (!cameraReady) {
      alert("Camera is still loading...");
      return;
    }

    const screenshot = webcamRef.current?.getScreenshot();

    if (!screenshot) {
      alert("Unable to capture image.");
      return;
    }

    setImage(screenshot);
    setAnswer("");
    setError("");

    const res = await fetch(screenshot);
    const blob = await res.blob();

    const capturedFile = new File(
      [blob],
      "capture.jpg",
      {
        type: "image/jpeg",
      }
    );

    setFile(capturedFile);
  };

  // Upload Image
  const uploadImage = (e) => {

    const selected = e.target.files[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("Please upload an image.");
      return;
    }

    setImage(URL.createObjectURL(selected));
    setFile(selected);

    setAnswer("");
    setError("");
  };

  // Analyze Image
  const analyze = async () => {

    if (!file) {
      alert("Please upload or capture an image.");
      return;
    }

    setLoading(true);
    setAnswer("");
    setError("");

    try {

      const formData = new FormData();

      formData.append("image", file);

      const response = await axios.post(

        "http://localhost:8080/api/ai/analyze-image",

        formData

      );

      setAnswer(response.data.response);

    } catch (err) {

      console.error(err);

      if (err.response) {

        setError(

          err.response.data.message ||

          "Analysis failed."

        );

      } else {

        setError("Cannot connect to backend.");

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-5xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold text-center text-green-700">
        AI Freshness Scanner
      </h1>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Capture or upload an image to analyze freshness.
      </p>

      {!image ? (

        <div className="bg-white shadow-xl rounded-3xl p-8">

          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            onUserMedia={() => setCameraReady(true)}
            onUserMediaError={(err) => {
              console.log(err);
              alert("Camera permission denied.");
            }}
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user"
            }}
            className="w-full rounded-2xl"
          />

          <div className="flex justify-center gap-5 mt-8">

            <button
              disabled={!cameraReady}
              onClick={capture}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-7 py-3 rounded-xl"
            >
              📷 Capture Photo
            </button>

            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl"
            >
              🖼 Upload Image
            </button>

          </div>

          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={uploadImage}
          />

        </div>

      ) : (

        <div className="bg-white shadow-xl rounded-3xl p-8">

          <img
            src={image}
            alt="Preview"
            className="w-72 h-72 object-contain mx-auto rounded-xl border"
          />

          {file && (

            <p className="text-center mt-4 text-gray-500">
              {file.name}
            </p>

          )}

          <div className="flex justify-center gap-5 mt-8">

            <button
              onClick={() => {

                setImage(null);
                setFile(null);
                setAnswer("");
                setError("");

              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-7 py-3 rounded-xl"
            >
              🔄 Retake
            </button>

            <button
              disabled={loading}
              onClick={analyze}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-7 py-3 rounded-xl"
            >
              {loading ? "Analyzing..." : "🤖 Analyze"}
            </button>

          </div>

        </div>

      )}

      {loading && (

        <div className="text-center mt-10">

          <div className="animate-spin h-12 w-12 rounded-full border-4 border-green-600 border-t-transparent mx-auto"></div>

          <p className="mt-4 text-gray-600">
            AI is analyzing your image...
          </p>

        </div>

      )}

      {error && (

        <div className="mt-8 bg-red-50 border border-red-300 rounded-2xl p-5">

          <h2 className="text-red-700 font-bold mb-2">
            Analysis Failed
          </h2>

          <p className="text-red-600">
            {error}
          </p>

        </div>

      )}

      {answer && (

        <div className="mt-8 bg-green-50 border border-green-300 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-green-700 mb-4">
            AI Analysis
          </h2>

          <div className="whitespace-pre-wrap leading-8">
            {answer}
          </div>

        </div>

      )}

    </div>

  );

}