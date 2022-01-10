const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  errorHandler,
  errorLogger,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
const whitelist = ['http://localhotst:5500', 'http://localhost:8080'];

const options = {
  origin: (origin, callback) => {
    //Agregamos !origin en caso de que el request provenga del mismo origen
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
};

app.use(cors(options));

// Middleware para recibir objetos json

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola server from express');
});

// Definicion del routing

routerApi(app);

// Error middlewares se utilizan despues de declarar el routing
// Se ejecutan segun la secuencia en la que se declaran

app.use(errorLogger); // Utiliza next(), entonces ejecuta al siguiente middleware
app.use(boomErrorHandler); // Utiliza next(), entonces ejecuta al siguiente middleware
app.use(errorHandler); // No tiene next(), se ejecuta y no llama al siguiente middleware.

app.listen(PORT);
