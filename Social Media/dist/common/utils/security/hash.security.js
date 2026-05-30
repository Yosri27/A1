import { env } from "../../../config/env.service.js";
import bcrypt from "bcrypt";
export class SecurityService {
    generateHash = async ({ plaintext, salt = env.salt }) => {
        return await bcrypt.hash(plaintext, Number(salt));
    };
    compareHash = async ({ plaintext, cyphertext }) => {
        return await bcrypt.compare(plaintext, cyphertext);
    };
}
