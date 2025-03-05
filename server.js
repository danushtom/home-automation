const mqtt = require("mqtt");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mqttClient = mqtt.connect("mqtt://localhost");

mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT Broker");
});

app.post("/control/:device", (req, res) => {
  const { device } = req.params;
  const { state } = req.body;

  console.log(`📡 Received API request: ${device} -> ${state}`);

  mqttClient.publish(`home/${device}`, state, (err) => {
    if (err) {
      console.error("❌ MQTT Publish Error:", err);
      return res.status(500).json({ error: "MQTT Publish Failed" });
    }
    console.log(`✅ Published MQTT Message: home/${device} -> ${state}`);
    res.json({ success: true, message: `Turned ${state} ${device}` });
  });
});

app.listen(5000, () => console.log("🚀 API running on port 5000"));
