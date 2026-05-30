import { BadRequestException } from "../common/exceptions/application.exceptions.js";
export const Validation = (schema) => {
    return ((req, res, next) => {
        let ValidationError = [];
        // console.log(ValidationError);
        for (const key of Object.keys(schema)) {
            if (!schema[key]) {
                continue;
            }
            const value = schema[key].safeParse(req[key]);
            // console.log(value);
            if (!value.success) {
                ValidationError.push({ key, issue: value.error.issues });
            }
        }
        if (ValidationError.length > 0) {
            // console.log(ValidationError);
            throw new BadRequestException("validaiton error", ValidationError);
        }
        next();
    });
};
