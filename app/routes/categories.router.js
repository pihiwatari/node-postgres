const express = require('express');
const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCategorySchema,
  createCategorySchema,
} = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.status(200).json(categories);
});

router.get(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.findOne(categoryId);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json({
        message: 'Successfully created',
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:categoryId',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const body = req.body;
      const updatedCategory = await service.update(categoryId, body);
      res.status(200).json({
        message: 'Successfully updated',
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await service.delete(categoryId);
    res.status(200).json({
      message: 'Category deleted',
      data: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
