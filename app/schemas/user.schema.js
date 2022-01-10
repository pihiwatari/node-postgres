const Joi = require('joi');

/*
  NOTA IMPORTANTE:
  El parametro id debe nombrarse exactamente igual a como viene
  declarado en la ruta dinamica del router, de lo contrario no
  se podra comparar los datos y arrojará un error.
*/

const userId = Joi.string().uuid();
const firstName = Joi.string();
const lastName = Joi.string();
const address = Joi.string();

const getUserSchema = Joi.object({
  userId: userId.required(),
});

const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  address: address.required(),
});

const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  address: address,
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
