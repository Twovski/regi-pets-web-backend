import { Router } from "express";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { MedicoController } from "#root/controllers/MedicoController";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { MedicoBusquedaSchema, MedicoSchema } from "#libs/interfaces/Medicos/MedicoDTO";

const router = Router();
const controller = new MedicoController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();

router.use(authMid.CheckValidateSession);

router.put('/actualizar/:id', middleware.IDValidacion, middleware.Validacion(MedicoBusquedaSchema), controller.ActualizarMedico);
router.delete('/borrar/:id', middleware.IDValidacion, controller.BorrarMedico);
router.post('/buscar', middleware.Validacion(MedicoBusquedaSchema), controller.BuscarMedico);
router.post('/crear', middleware.Validacion(MedicoSchema), controller.CrearMedico);
router.get('/lista', controller.ListaMedico);
router.get('/obtener/:id', middleware.IDValidacion, controller.ObtenerMedico);

export default router;