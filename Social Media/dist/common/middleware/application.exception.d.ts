export interface GError {
    Status: number;
    message: string;
    cause?: unknown;
}
export declare class ApplicationException extends Error implements GError {
    Status: number;
    constructor(message: string, Status: number, cause?: unknown);
}
export declare class BadRequestException extends ApplicationException {
    constructor(message: string, cause?: unknown);
}
//# sourceMappingURL=application.exception.d.ts.map