import { email } from "zod";
import { Iuser } from "../../interface/user.interface.js";
import { LoginDTO, SignupDTO } from "./auth.dto.js";
class AuthService
{
    constructor ()
    {

    }
    login(data :LoginDTO) : LoginDTO {

    console.log(DataTransfer,'from class');
    return data
    }
    signup(data:SignupDTO): Promise<Iuser>
    {
        const user = {name,email,password}   
    }
    



}
export default  new AuthService