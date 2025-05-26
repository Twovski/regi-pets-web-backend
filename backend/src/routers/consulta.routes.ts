import { Router } from "express";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { RoleMiddleware } from "#root/middlewares/RoleMiddleware";
import { ConsultaController } from "#root/controllers/ConsultaController";
import { ConsultaBusquedaSchema, ConsultaSchema } from "#libs/interfaces/Consultas/ConsultaDTO";
import { ConsultaMedicoSchema } from "#libs/interfaces/Consultas/ConsultaMedicoDTO";
import { ConsultaActulizarSchema } from "#libs/interfaces/Consultas/ConsultaActualizarDTO";

const router = Router();
const controller = new ConsultaController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();
const permisos = new RoleMiddleware();

router.use(authMid.CheckValidateSession);

router.put('/actualizar/:id', middleware.IDValidacion, middleware.Validacion(ConsultaActulizarSchema), controller.ActualizarConsulta);
router.put('/actualizar-medico/:id', middleware.IDValidacion, middleware.Validacion(ConsultaMedicoSchema), controller.ActualizarMedicoConsulta);
router.post('/buscar', middleware.Validacion(ConsultaBusquedaSchema), controller.BuscarConsulta);
router.post('/crear', middleware.Validacion(ConsultaSchema), controller.CrearConsulta);
router.get('/lista', controller.ListaConsulta);
router.get('/obtener/:id', middleware.IDValidacion, controller.ObtenerConsulta);

export default router;