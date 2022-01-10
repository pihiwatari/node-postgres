const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const ordersRouter = require('./orders.router');

function routerApi(app) {
  const router = express.Router();

  // Indicamos una ruta general para nuestro router y gestionamos las
  // versiones de nuestra API

  app.use('/api/v1', router);
  router.get('/', (req, res) => res.send('<h1>Saludos desde api/v1</h1>'));

  // Despues le indicamos al router que use el resto de los endpoints

  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;
