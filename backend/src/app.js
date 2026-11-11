import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501081",
  });
});

app.use("/events", eventRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hatalı JSON gönderimi dahil Express hatalarını JSON'a dönüştür.
app.use((err, _req, res, _next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }
  console.error(err);
  return res.status(500).json({ error: { message: "Internal server error" } });
});

export default app;
