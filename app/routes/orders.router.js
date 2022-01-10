const express = require('express');
const OrdersService = require('../services/orders.service');

const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
