import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { userRouter } from "./Users/user.router";
import { selfRouter } from "./Self/self.router";
import { loginRouter } from "./Login/login.router";
import { barangRouter } from "./Barang/barang.router";
import { perusahaanRouter } from "./Perusahaan/perusahaan.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/self", selfRouter);
app.use("/api/login", loginRouter);
app.use("/api/barang", barangRouter);
app.use("/api/perusahaan", perusahaanRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});