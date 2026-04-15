
export const SuccessResponse = ({res, message = "done",status=200 ,data = undefined} = {}) =>
    {
        res.status(status).json({status , message , data})
    }