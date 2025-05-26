import { ChangePasswordSchema } from "#libs/interfaces/Auth/ChangePasswordDTO";
import { LoginSchema } from "#libs/interfaces/Auth/LoginDTO";
import { AuthController } from "#root/controllers/AuthController";
import { AuthMiddleware } from "#root/middlewares/AuthMiddleware";
import { GlobalMiddleware } from "#root/middlewares/GlobalMiddleware";
import { Router } from "express";

const router = Router();
const controller = new AuthController();
const middleware = new AuthMiddleware();
const global_middleware = new GlobalMiddleware();

router.post('/login', global_middleware.Validacion(LoginSchema), controller.Login);
router.post('/logout', middleware.CheckValidateSession, controller.Logout);
router.get('/sesion', middleware.CheckValidateSession, controller.Session);
router.put('/change-password', middleware.CheckValidateSession, global_middleware.Validacion(ChangePasswordSchema), controller.ChangePassword)

export default router;