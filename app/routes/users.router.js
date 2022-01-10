const express = require('express');
const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require('../schemas/user.schema');

const service = new UsersService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await service.findOne(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json({
        message: 'Successfully created user',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;
      const updatedUser = await service.update(userId, body);
      res.status(200).json({
        message: 'Successfully updated',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const deletedUser = await service.delete(userId);
      res.status(201).json({
        message: 'Successfully deleted',
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
