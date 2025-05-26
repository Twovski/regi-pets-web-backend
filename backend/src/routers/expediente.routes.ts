import { Router } from "express";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { ExpedienteController } from "#root/controllers/ExpedienteController";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { ExpedienteBusquedaSchema } from "#libs/interfaces/Expedientes/ExpedienteDTO";

const router = Router();
const controller = new ExpedienteController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();

router.use(authMid.CheckValidateSession);

router.put('/actualizar/:id', middleware.IDValidacion, middleware.Validacion(ExpedienteBusquedaSchema), controller.ActualizarExpediente);
router.post('/buscar', middleware.Validacion(ExpedienteBusquedaSchema), controller.BuscarExpediente);
router.get('/obtener/:id', middleware.IDValidacion, controller.ObtenerExpediente);

export default router;