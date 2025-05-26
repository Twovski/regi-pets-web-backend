import { Router } from "express";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { AreaController } from "#root/controllers/AreaController";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { AreaBusquedaSchema } from "#libs/interfaces/Area/AreaDTO";

const router = Router();
const controller = new AreaController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();

router.use(authMid.CheckValidateSession);

router.post('/buscar', middleware.Validacion(AreaBusquedaSchema), controller.BuscarArea);
router.get('/lista', controller.ListaArea);

export default router;