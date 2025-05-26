import { Router } from "express";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { TratamientoController } from "#root/controllers/TratamientoController";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { TratamientoBusquedaSchema } from "#libs/interfaces/Tratamientos/TratamientoDTO";

const router = Router();
const controller = new TratamientoController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();

router.use(authMid.CheckValidateSession);

router.post('/buscar', middleware.Validacion(TratamientoBusquedaSchema), controller.BuscarTratamiento);
router.get('/lista', controller.ListaTratamiento);

export default router;