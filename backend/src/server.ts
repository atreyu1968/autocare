import "dotenv/config";
import { app } from "./app.js";

const port = Number(process.env.BACKEND_PORT ?? 4000);

app.listen(port, "0.0.0.0", () => {
  console.log(`[AutoCare API] escuchando en 0.0.0.0:${port}`);
});
