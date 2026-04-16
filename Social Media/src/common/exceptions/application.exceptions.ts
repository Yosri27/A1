

interface AError{
    status: number,
    message : string,
    cause?: unknown
}

export class ApplicationExceptions extends Error implements AError {

    constructor(message : string , public status: number,cause?:unknown)
    {
        super(message,{ cause })
        this.name = this.constructor.name
    }

}

export class BadRequestException extends ApplicationExceptions
{
    constructor(message : string , cause?:unknown)
    {
        super(message,400,{ cause })
    }
}

export class ConflictExceptione extends ApplicationExceptions 
{
    constructor(message: string , cause?:unknown)
    {
        super(message,409,{ cause })
    }
}

export class NotFoundException extends ApplicationExceptions 
{
    constructor(message: string , cause?:unknown)
    {
        super(message,404,{ cause })
    }
}