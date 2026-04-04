import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock Risk Assessment API
  app.post("/api/risk-assessment", (req, res) => {
    const { workType, location, weeklyIncome } = req.body;
    
    // Simple mock logic for premium calculation
    let basePremium = 50;
    if (workType === "delivery") basePremium += 30;
    if (workType === "driver") basePremium += 50;
    
    const riskFactor = Math.random() * 0.5 + 0.8; // 0.8 to 1.3
    const premium = Math.round(basePremium * riskFactor);
    
    res.json({
      premium,
      riskLevel: premium > 100 ? "High" : premium > 75 ? "Medium" : "Low",
      coverageAmount: weeklyIncome * 0.8,
      currency: "INR"
    });
  });

  // Mock Disruption Alerts
  app.get("/api/disruption-alerts", (req, res) => {
    const alerts = [
      { id: 1, type: "Weather", severity: "High", message: "Heavy rainfall expected in Mumbai. Order drop >30% likely.", active: true },
      { id: 2, type: "AQI", severity: "Medium", message: "AQI > 300 in Delhi. Outdoor work restricted in specific zones.", active: true },
      { id: 3, type: "Event", severity: "Low", message: "Local strike in Bangalore. Minor route disruptions.", active: false }
    ];
    res.json(alerts);
  });

  // Mock Payouts API
  app.post("/api/payouts", (req, res) => {
    const { userId, amount, reason } = req.body;
    res.json({
      status: "Success",
      transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      amount,
      timestamp: new Date().toISOString(),
      message: `Instant payout of ₹${amount} processed for ${reason}.`
    });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
