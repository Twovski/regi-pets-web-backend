import { Router } from "express";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { RoleController } from "#root/controllers/RoleController";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { RoleBusquedaSchema } from "#libs/interfaces/Roles/RoleDTO";

const router = Router();
const controller = new RoleController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();

router.use(authMid.CheckValidateSession);

router.post('/buscar', middleware.Validacion(RoleBusquedaSchema), controller.BuscarRole);
router.get('/lista', controller.ListaRole);

export default router;