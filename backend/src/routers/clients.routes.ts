import { Router } from "express";
import { ClienteController } from "#root/controllers/ClienteController";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { RoleMiddleware } from "#root/middlewares/RoleMiddleware";
import { PermisosRecepcionista } from "#libs/constants/Permisos";
import { ClienteBusquedaSchema, ClienteSchema } from "#libs/interfaces/Clientes/ClienteDTO";

const router = Router();
const controller = new ClienteController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();
const permisos = new RoleMiddleware();

router.use(authMid.CheckValidateSession);
router.use(permisos.ValidarPermisos(PermisosRecepcionista));

router.put('/actualizar/:id', middleware.IDValidacion, middleware.Validacion(ClienteBusquedaSchema), controller.ActualizarCliente);
router.delete('/borrar/:id', middleware.IDValidacion, controller.BorrarCliente);
router.post('/buscar', middleware.Validacion(ClienteBusquedaSchema), controller.BuscarCliente);
router.post('/crear', middleware.Validacion(ClienteSchema), controller.CrearCliente);
router.get('/lista', controller.ListaCliente);
router.get('/obtener/:id', middleware.IDValidacion, controller.ObtenerCliente);

export default router;