import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/control"; // Update this when deploying

function App() {
  const [status, setStatus] = useState({ light: "OFF", fan: "OFF", ac: "OFF" });

  const toggleDevice = async (device) => {
    const newState = status[device] === "ON" ? "OFF" : "ON";
    try {
      await axios.post(`${API_URL}/${device}`, { state: newState });
      setStatus({ ...status, [device]: newState });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🏡 Smart Home Control</h1>
      {["light", "fan", "ac"].map((device) => (
        <div key={device} style={{ margin: "20px" }}>
          <h2>{device.toUpperCase()}</h2>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: status[device] === "ON" ? "green" : "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => toggleDevice(device)}
          >
            {status[device] === "ON" ? "Turn OFF" : "Turn ON"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
