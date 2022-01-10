const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // bracket notation = obj[prop] => req.params, req.body, req.query
    const { error } = schema.validate(data, { abortEarly: false }); // El error viene incluido dentro de la respuesta de Joi
    if (error) {
      next(boom.badRequest(error)); // Indicamos especificamente un error tipo boom => boomErrorHandler
    }
    next(); // next(): para la ejecucion de cadena de middlewares
  };
}

module.exports = validatorHandler;
