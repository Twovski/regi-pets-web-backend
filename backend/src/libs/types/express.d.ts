import { SessionDTO } from '#libs/interfaces/Auth/SessionDTO';
import 'express';


declare module 'express' {
  interface Request {
    session?: SessionDTO;
  }
}