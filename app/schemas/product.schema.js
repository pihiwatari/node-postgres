const Joi = require('joi');

// Las variables del schema deben nombrarse exactamente igual que el parametro que
// recibe nuestro endpoint, de lo contrario nunca lo va a validar.

const productId = Joi.string().uuid();
const name = Joi.string().min(3);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const category = Joi.string().min(3).max(20);
const isBlocked = Joi.boolean();

// Buena practica: siempre enviar los schemas como objetos,
// aunque tengan un solo campo

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  category: category.required(),
  isBlocked: isBlocked, // Valor opcional
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  category: category,
  isBlocked: isBlocked,
});

const getProductSchema = Joi.object({
  productId: productId.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
