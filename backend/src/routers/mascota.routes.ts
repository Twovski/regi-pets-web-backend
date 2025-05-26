import { Router } from "express";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { MascotaController } from "#root/controllers/MascotaController";
import { RoleMiddleware } from "#root/middlewares/RoleMiddleware";
import { PermisosRecepcionista } from "#libs/constants/Permisos";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { MascotaBusquedaSchema, MascotaSchema } from "#libs/interfaces/Mascotas/MascotaDTO";

const router = Router();
const controller = new MascotaController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();
const permisos = new RoleMiddleware();

router.use(authMid.CheckValidateSession);
router.use(permisos.ValidarPermisos(PermisosRecepcionista));

router.put('/actualizar/:id', middleware.IDValidacion, middleware.Validacion(MascotaBusquedaSchema), controller.ActualizarMascota);
router.delete('/borrar/:id', middleware.IDValidacion, controller.BorrarMascota);
router.post('/buscar', middleware.Validacion(MascotaBusquedaSchema), controller.BuscarMascota);
router.post('/crear', middleware.Validacion(MascotaSchema), controller.CrearMascota);
router.get('/lista', controller.ListaMascota);
router.get('/obtener/:id', middleware.IDValidacion, controller.ObtenerMascota);

export default router;