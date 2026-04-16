import { email } from "zod";
import { Iuser } from "../../interface/user.interface.js";
import { LoginDTO, SignupDTO } from "./auth.dto.js";
import { ApplicationException } from "../../middleware/application.exception.js";
class AuthService
{
    constructor ()
    {

    }
    login(data :LoginDTO) : LoginDTO {

    // console.log(DataTransfer,'from class');
    throw new ApplicationException('method invalid',400, { cause:"404" })
    return data
    }
    signup(data:SignupDTO): SignupDTO
    {
        return data
        // const user = {name,email,password}   
    }
    



}
export default  new AuthService