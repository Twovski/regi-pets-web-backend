import { Router } from "express";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { EspecieController } from "#root/controllers/EspecieController";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { EspecieBusquedaSchema } from "#libs/interfaces/Especies/EspecieDTO";

const router = Router();
const controller = new EspecieController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();

router.use(authMid.CheckValidateSession);

router.post('/buscar', middleware.Validacion(EspecieBusquedaSchema), controller.BuscarEspecie);
router.get('/lista', controller.ListaEspecie);

export default router;