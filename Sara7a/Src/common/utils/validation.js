import { BadRequestException } from "./response/error.response.js";

export const Validation = (Schema) =>
    {
        return (req, res , next )=>
            {
                let {value , error} =Schema.validate(req.body, {abortEarly : false})
                if (error) {
                    throw BadRequestException({message : "validation error",extra :error})
                }
                next()
            }
    }