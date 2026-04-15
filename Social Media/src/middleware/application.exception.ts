


export   interface GError 
{
    Status: number,
    message: string,
    cause?:  unknown
}

export class ApplicationException extends Error implements GError 
{
    constructor(message:string,public Status:number ,cause?:unknown)
    {
        super (message,{cause})
        this.name = this.constructor.name
    }
    
}

export class BadRequestException extends ApplicationException 
{

    constructor(message:string , cause?:unknown)
    {
        super(message,400,{cause})
    }
}

