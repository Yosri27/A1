export class ApplicationException extends Error {
    Status;
    constructor(message, Status, cause) {
        super(message, { cause });
        this.Status = Status;
        this.name = this.constructor.name;
    }
}
export class BadRequestException extends ApplicationException {
    constructor(message, cause) {
        super(message, 400, { cause });
    }
}
