import { BadRequestException } from "./application.exception.js";
export const Validation = (schema) => {
    return ((req, res, next) => {
        let ValidationError = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key]) {
                continue;
            }
            const value = schema[key].safeParse(req[key]);
            if (!value.success) {
                ValidationError.push({ key, issue: value.error.issues });
            }
        }
        if (ValidationError.length > 0) {
            throw new BadRequestException("validaiton error", ValidationError);
        }
        next();
    });
};
