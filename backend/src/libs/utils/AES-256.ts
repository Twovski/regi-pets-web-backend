import crypto from "crypto-js";

export class AES_256 {
    static encriptar(clave: string){
        const key = crypto.AES.encrypt(clave, process.env.AES_KEY);
        return key.toString();
    }

    static desencriptar(clave: string){
        const key = crypto.AES.decrypt(clave, process.env.AES_KEY);
        return key.toString(crypto.enc.Utf8);
    }
}