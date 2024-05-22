import { ZodType } from 'zod';
import ResponseError from '../error/responseError.js';

export class Validation {
  static validate<T>(scheme: ZodType, data: T): T {
    return scheme.parse(data);
  }
}

// const validate = (schema, request) => {
//   const result = schema.validate(request, {
//     abortEarly: false,
//     allowUnknown: false,
//   });

//   if (result.error) {
//     throw new ResponseError(400, result.error.message);
//   } else {
//     return result.value;
//   }
// };

// export default validate;
