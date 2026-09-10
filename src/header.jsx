import React, { useState } from "react";
import "../src/css/header.css";

function Header() {
  const [result, setResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendImage = async (file) => {
    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError("");
    setResult(null);
    setSelectedImage(file);

    // Image preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://potatoe-disease-fastapi-url.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to analyze the image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    sendImage(file);
  };

  return (
    <div className="app">
      <header className="hero">
        {/* Navbar / Heading */}
        <div className="navbar">
          <div className="logo">
            🌱 PotatoCare AI
          </div>

          <span className="ai-badge">
            AI Powered
          </span>
        </div>

        {/* Main Content */}
        <div className="hero-content">

          <div className="hero-text">
            <p className="small-title">
              SMART AGRICULTURE
            </p>

            <h1>
              Potato Health
              <span> Detector</span>
            </h1>

            <p className="description">
              Upload a picture of a potato leaf and let our
              AI model detect whether it is healthy or affected
              by Early Blight or Late Blight.
            </p>
          </div>

          {/* Upload Card */}
          <div className="upload-card">

            <div className="upload-icon">
              📷
            </div>

            <h2>
              Analyze Your Potato Leaf
            </h2>

            <p>
              Upload a clear image of the leaf
            </p>

            <label className="upload-button">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </label>

            <p className="file-info">
              JPG, JPEG or PNG
            </p>

            {/* Preview */}
            {preview && (
              <div className="preview-container">
                <img
                  src={preview}
                  alt="Selected potato leaf"
                  className="preview-image"
                />
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Analyzing image...</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="error">
                ⚠️ {error}
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="result-card">

                <div className="result-header">
                  <span>🔬 AI Analysis Result</span>
                </div>

                <div className="result-content">

                  <div className="result-item">
                    <span className="result-label">
                      Disease Status
                    </span>

                    <strong className="result-value">
                      {result.class}
                    </strong>
                  </div>

                  <div className="result-item">
                    <span className="result-label">
                      Confidence
                    </span>

                    <strong className="confidence">
                      {result.confidence}%
                    </strong>
                  </div>

                  <div className="confidence-bar">
                    <div
                      className="confidence-progress"
                      style={{
                        width: `${result.confidence}%`,
                      }}
                    ></div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="footer-text">
          Powered by CNN + FastAPI
        </div>
        <div className = "owner">
            Developed by - Vinayak Shrivastava
        </div>

      </header>
    </div>
  );
}

export default Header;
