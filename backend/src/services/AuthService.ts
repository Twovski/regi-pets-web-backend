import { LoginDTO } from "#libs/interfaces/Auth/LoginDTO";
import { ChangePasswordDTO } from "#libs/interfaces/Auth/ChangePasswordDTO";
import { SessionDTO } from "#libs/interfaces/Auth/SessionDTO";
import { AES_256 } from "#libs/utils/AES-256";
import { AuthRepo } from "#root/repository/AuthRepo";

export class AuthService{
    private repository: AuthRepo;
    
    constructor() {
        this.repository = new AuthRepo();
    }

    async login(login: LoginDTO): Promise<SessionDTO>{
        const { Correo, Clave } = login;
        const user = await this.repository.getUser(Correo);
        //console.log(user);
        if(!user) 
            throw new Error('El correo ingresado no está registrado');
        
        const contra = AES_256.desencriptar(user.Clave);
        //console.log(contra);
        if(Clave !== contra)
            throw new Error('La contraseña ingresada es incorrecta.');
        
        const { medico } = user;
        return {
            MedID: medico.MedID,
            Name: medico.Nombre,
            Correo: user.Correo,
            Rol: medico.rol.Nombre,
            VetID: medico.VetID
        };
    }

    async changePassword(change: ChangePasswordDTO){
        const login = await this.repository.getLogin(change.Correo);
        const llave = AES_256.desencriptar(login.Clave)

        if(change.ViejaClave !== llave)
            throw new Error('La contraseña actual es incorrecta.');
        if(change.Clave !== change.Confirmar)
            throw new Error('La nueva contraseña y la confirmación no coinciden.');

        await this.repository.changePassword({
            Correo: login.Correo,
            Clave: AES_256.encriptar(change.Clave)
        });
    }
}