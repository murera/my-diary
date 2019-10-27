import joi from 'joi';

const schema = {
  entry: joi.object().keys({
    title: joi.string().min(5).max(50).trim()
      .required(),
    description: joi.string().min(10).trim().required(),
  }),
  user: joi.object().keys({
    firstName: joi.string().min(2).trim().regex(/^\S[A-Za-z]{1,}$/)
      .required(),
    lastName: joi.string().min(2).trim().regex(/^\S[A-Za-z]{1,}$/)
      .required(),
    email: joi.string().email().trim().required(),
    password: joi.string().required(),
  }),
};
export default schema;
