export class ApplicationExceptions extends Error {
    status;
    constructor(message, status, cause) {
        super(message, { cause });
        this.status = status;
        this.name = this.constructor.name;
    }
}
export class BadRequestException extends ApplicationExceptions {
    constructor(message, cause) {
        super(message, 400, { cause });
    }
}
export class ConflictException extends ApplicationExceptions {
    constructor(message, cause) {
        super(message, 409, { cause });
    }
}
export class NotFoundException extends ApplicationExceptions {
    constructor(message, cause) {
        super(message, 404, { cause });
    }
}
