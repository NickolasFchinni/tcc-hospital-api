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
  origin: 'http://localhost:3000', // ou o domínio do seu frontend
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permitir credenciais (por exemplo, cookies)
}));

const corsOptions = {
  origin: '*', // ou 'http://localhost:3000' para um único domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permitir credenciais (por exemplo, cookies)
};

app.use(express.json());

app.use("/auth",cors(corsOptions), authRoutes);
app.use("/aviso",cors(corsOptions), avisoRoutes);
app.use("/aviso2",cors(corsOptions), avisoRoutes2);
app.use("/patient",cors(corsOptions), userRoutes);
app.use("/sala",cors(corsOptions), salaRoutes);
app.use("/centro",cors(corsOptions), roomRoutes);
app.use("/worker",cors(corsOptions), workerRoutes);
app.use("/procedimento",cors(corsOptions), procedimentoRoutes);
app.use("/material",cors(corsOptions), materialRoutes);
app.use("/especialidade",cors(corsOptions), especialidadeRoutes);
app.use("/user",cors(corsOptions), usersRoutes);

app.listen(process.env.PORT || 8800);
