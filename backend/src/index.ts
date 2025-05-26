import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { PORT, ADDRESS } from "#config/express";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import clientRouter from "./routers/clients.routes";
import veterinariaRouter from "./routers/veterinaria.routes";
import medicoRouter from "./routers/medico.routes";
import loginRouter from "./routers/auth.routes";
import roleRouter from "./routers/role.routes";
import especieRouter from "./routers/especie.routes";
import mascotaRouter from "./routers/mascota.routes";
import expedienteRouter from "./routers/expediente.routes";
import consultaRouter from "./routers/consulta.routes";
import areaRouter from "./routers/area.routes";
import estudioRouter from "./routers/estudio.routes";
import tratamientoRouter from "./routers/tratamiento.routes";


dotenv.config();

const app = express();
const middleware = new AuthMiddleware();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(middleware.GetSession);

app.use('/api/role', roleRouter);
app.use('/api/especie', especieRouter);
app.use('/api/area', areaRouter);
app.use('/api/estudio', estudioRouter);
app.use('/api/tratamiento', tratamientoRouter);

app.use('/api', loginRouter);
app.use('/api/cliente', clientRouter);
app.use('/api/veterinaria', veterinariaRouter);
app.use('/api/medico', medicoRouter);
app.use('/api/mascota', mascotaRouter);
app.use('/api/expediente', expedienteRouter);
app.use('/api/consulta', consultaRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://${ADDRESS}:${PORT}/`)
})