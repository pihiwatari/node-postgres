const Joi = require('joi');

const categoryId = Joi.string().alphanum();
const categoryName = Joi.string().max(20);

const getCategorySchema = Joi.object({
  categoryId: categoryId.required(),
});

const createCategorySchema = Joi.object({
  categoryName: categoryName.required(),
});

const updateCategorySchema = Joi.object({
  categoryName: categoryName.required(),
});

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
};
