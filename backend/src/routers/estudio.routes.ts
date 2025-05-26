import { Router } from "express";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { EstudioController } from "#root/controllers/EstudioController";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { EstudioBusquedaSchema } from "#libs/interfaces/Estudios/EstudioDTO";

const router = Router();
const controller = new EstudioController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();

router.use(authMid.CheckValidateSession);

router.post('/buscar', middleware.Validacion(EstudioBusquedaSchema), controller.BuscarEstudio);
router.get('/lista', controller.ListaEstudio);

export default router;