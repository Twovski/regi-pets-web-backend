import { Router } from "express";
import { VeterinariaController } from "#root/controllers/VeterinariaController";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { VeterinariaBusquedaSchema, VeterinariaSchema } from "#libs/interfaces/Veterinaria/VeterinariaDTO";

const router = Router();
const controller = new VeterinariaController();
const authMid = new AuthMiddleware();
const middleware = new GlobalMiddleware();

router.use(authMid.CheckValidateSession);

router.put('/actualizar/:id', middleware.IDValidacion, middleware.Validacion(VeterinariaBusquedaSchema), controller.ActualizarVeterinaria);
router.delete('/borrar/:id', middleware.IDValidacion, controller.BorrarVeterinaria);
router.post('/buscar', middleware.Validacion(VeterinariaBusquedaSchema), controller.BuscarVeterinaria);
router.post('/crear', middleware.Validacion(VeterinariaSchema), controller.CrearVeterinaria);
router.get('/lista', controller.ListaVeterinaria);
router.get('/obtener', middleware.IDValidacion, controller.ObtenerMascota);

export default router;