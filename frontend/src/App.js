import axios from "axios";
import React, { useState } from "react";
import "./styles.css";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    // Convert FileList to array and set to state
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Ensure exactly 4 files are selected
    if (selectedFiles.length !== 4) {
      alert("Please upload exactly 4 videos.");
      return;
    }

    const formData = new FormData();
    // Append all selected files to FormData
    selectedFiles.forEach((file) => formData.append("videos", file));

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="App2">
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
          <h1 style={{ color: "white" }}>AI Based Traffic Management</h1>
        </div>

        <div className="main-container">
          <div className="left">
            <div style={{ display: "flex", columnGap: "48px" }}>
              <section id="hero" className="hero">
                <h2>Enhance Traffic Efficiency using AI</h2>
                <p>
                  Improve your city's traffic flow using our intelligent adaptive system. Our
                  technology adjusts traffic light timings in real-time to minimize congestion and
                  ensure smoother vehicle movement.
                </p>
              </section>
              <section id="hero" className="hero">
                <h2>Adaptive Signal Control for Better Flow</h2>
                <p>
                  Our intelligent system dynamically adjusts green light durations based on live
                  traffic conditions, ensuring vehicles move efficiently with minimal stops.
                </p>
              </section>
            </div>
            <div style={{ display: "flex", columnGap: "48px" }}>
              <section id="hero2" className="hero2">
                <h2>Faster Commutes, Cleaner Cities</h2>
                <p>
                  By reducing idle time at signals, our system minimizes fuel consumption and carbon
                  emissions — contributing to a greener environment.
                </p>
              </section>
              <section id="hero2" className="hero2">
                <h2>Unlock the Power of AI for Safer Roads</h2>
                <p>
                  Ensure emergency vehicles receive priority passage, improving response times and
                  saving lives when it matters most.
                </p>
              </section>
            </div>
            <section id="upload" className="upload">
              <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "80px" }}>
                {/* <input type="file" multiple accept="video/*" onChange={handleFileChange} /> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    columnGap: "12%",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <label
                      htmlFor="video-upload"
                      style={{
                        display: "inline-block",
                        background: "linear-gradient(135deg, #dff6ff 0%, #ffffff 100%)",
                        color: "black",
                        padding: "10px 24px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Upload Videos
                      <input
                        id="video-upload"
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  {selectedFiles.length > 0 ? (
                    <button type="submit">Analyze Traffic Flow</button>
                  ) : (
                    <></>
                  )}
                </div>
              </form>
            </section>
          </div>

          <section id="result" className="result">
            {!loading && !result && (
              <p className="placeholder">
                Your traffic optimization insights will appear here... <br />
              </p>
            )}
            {loading && <p className="loader">Processing videos, it may take a few minutes...</p>}
            {result && !result.error && (
              <>
                <h2 style={{ color: "black" }}>✅ Optimization Results</h2>
                <p>
                  Your traffic light timings have been optimized. Here are the recommended green
                  times for each direction:
                </p>
                <ul>
                  <li>
                    🚦 lane 1: <span id="north-time">{result.north}</span> seconds
                  </li>
                  <li>
                    🚦 lane 2: <span id="south-time">{result.south}</span> seconds
                  </li>
                  <li>
                    🚦 lane 3: <span id="west-time">{result.west}</span> seconds
                  </li>
                  <li>
                    🚦 lane 4: <span id="east-time">{result.east}</span> seconds
                  </li>
                </ul>
              </>
            )}
          </section>
          {result && result.error && (
            <div>
              <h2>Error:</h2>
              <p>{result.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
