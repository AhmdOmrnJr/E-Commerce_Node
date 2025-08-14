import joi from "joi";

export const generalFields = {
  userName: joi.string().required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    .required(),
  cpassword: joi.string().valid(joi.ref("password")).required(),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
};

export const validation = (schema) => {
  return (req, res, next) => {
    for (const key of ["body", "params", "query"]) {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult?.error) {
          return res.json({
            message: "Validation Err",
            validationErr: validationResult.error.details,
          });
        }
      }
    }
    return next();
  };
};

// export const validation = (schema) => {
//     return (req, res, next) => {

//         const requestData = { ...req.body, ...req.params, ...req.query }
//         if (req.file || req.files) { requestData.file = req.file || req.files }

//         const validationResult = schema.validate(requestData, { abortEarly: false })
//         if (validationResult?.error) {
//             return res.json({ message: "Validation Err", validationErr: validationResult.error.details })
//         }
//         return next()
//     }
// }
