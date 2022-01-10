const faker = require('faker');
const boom = require('@hapi/boom');

// Modularizando los servicios mantenemos un codigo mas legible, mantenible y
// en caso de algun cambio, estos no afecten el funcionamiento de otros componentes.

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  // Generamos la lista inicial de productos para ejecutarse una vez
  // cada que se instancie la clase

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        categoryId: faker.random.alphaNumeric(5),
        categoryName: faker.commerce.department(),
      });
    }
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    const category = await this.categories.find(
      (category) => category.categoryId === id
    );
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async create(data) {
    const newCategory = {
      categoryId: faker.random.alphaNumeric(5),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id, changes) {
    const index = await this.categories.findIndex(
      (category) => category.categoryId === id
    );
    if (index === -1) {
      throw boom.notFound('Category not found');
    }

    // Obtenemos el producto original del array y con spread
    // copiamos los atributos y agregamos o sustituimos los cambios
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return await this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(
      (category) => category.categoryId === id
    );
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    const deletedCategory = await this.categories[index];
    this.categories.splice(index, 1);
    return deletedCategory;
  }
}

module.exports = CategoriesService;
