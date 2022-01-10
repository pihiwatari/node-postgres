const faker = require('faker');
const boom = require('@hapi/boom');

// Modularizando los servicios mantenemos un codigo mas legible, mantenible y
// en caso de algun cambio, estos no afecten el funcionamiento de otros componentes.

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  // Generamos la lista inicial de productos para ejecutarse una vez
  // cada que se instancie la clase

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        category: faker.commerce.department(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  // Simulacion de asincronia.
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async findOne(id) {
    const product = await this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Forbidden');
    }
    return product;
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      isBlocked: false,
      // Con esto copiamos los valores de data, asi como su estructura
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    // Obtenemos el producto original del array y con spread
    // copiamos los atributos y agregamos o sustituimos los cambios
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return await this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    // Crea una copia del producto a borrar para retornarla e indicar
    // cual fue el elemento que se elimino

    const product = this.products[index];
    this.products.splice(index, 1);
    return product;
  }
}

module.exports = ProductsService;
