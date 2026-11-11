import express from "express";
import cors from "cors";

const app = express();

// Express JSON body'leri okuyabilsin; frontend geliştirme sunucusu erişebilsin.
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501081",
  });
});

// Tanımlanmamış adresler bile JSON dönsün.
app.use((_req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;
