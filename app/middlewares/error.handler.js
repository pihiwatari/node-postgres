// Los error-first middlewares necesitan 4 parametros y siempre
// se envia primero el err y al final el next, para indicarle a
// express que estas funciones son middlewares.

function errorLogger(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

// Obtenido de la libreria Boom

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { errorLogger, errorHandler, boomErrorHandler };
