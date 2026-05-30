import { env }from "../../../../Config/index.js";

export const ErrorResponse = ({status = 400, message = "Something went wrong", extra = undefined}) =>
    {
        throw new Error(message , {cause : {status , extra}})
    }
export const UnauthorizedException = ({message = "Unauthorized Exception", extra = undefined} = {}) =>
    {
        return ErrorResponse({status : 401 , message , extra})
    }    

export const BadRequestException = ({message = "Bad Request Exception", extra = undefined} = {}) =>
    {
        return ErrorResponse({status : 400 , message , extra})
    }


export const NotFoundException = ({message = "Not Found Exception", extra = undefined} = {}) =>
    {
        return ErrorResponse({status : 404 , message , extra})
    }
    
export const conflictException = ({message = "Conflict Exception", extra = undefined} = {}) =>
    {
        return ErrorResponse({status : 409 , message , extra})
    }


export const globalErrorResponse = (error ,req , res , next)=>
    {
        const status = error.status ? error.status : error.cause   ? error.cause.status : 500
        const mood = env.mood == "dev"
        const defaultMessage = "Something went wrong"
        const displayErrorMessage = error.message || defaultMessage
        const extra = error.extra || {}
        res.status(status).json({
            status,
            stack : mood ? error.stack : null,
            errorMessage : mood ? displayErrorMessage : defaultMessage,
            extra : error.cause.extra
        })
    }