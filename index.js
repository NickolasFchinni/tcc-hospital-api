import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/patient.js";
import roomRoutes from "./routes/room.js";
import salaRoutes from "./routes/sala.js";
import workerRoutes from "./routes/worker.js";
import procedimentoRoutes from "./routes/procedimento.js";
import materialRoutes from "./routes/mat_compativel.js";
import especialidadeRoutes from "./routes/especialidade.js";
import usersRoutes from "./routes/users.js";
import avisoRoutes from "./routes/aviso.js";
import avisoRoutes2 from "./routes/cAviso.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: 'http://localhost:3000/home', // ou o domínio do seu frontend
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permitir credenciais (por exemplo, cookies)
}));


app.use(express.json());

app.use("/auth", authRoutes);
app.use("/aviso", avisoRoutes);
app.use("/aviso2", avisoRoutes2);
app.use("/patient", userRoutes);
app.use("/sala", salaRoutes);
app.use("/centro", roomRoutes);
app.use("/worker", workerRoutes);
app.use("/procedimento", procedimentoRoutes);
app.use("/material", materialRoutes);
app.use("/especialidade", especialidadeRoutes);
app.use("/user", usersRoutes);

app.listen(process.env.PORT || 8800);
