const boom = require('@hapi/boom');
const faker = require('faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 50;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        userId: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.direction(),
        registerDate: faker.date.past(5),
        orders: [], // Usar el servicio de ordenes para poblar este campo
      });
    }
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user = await this.users.find((user) => user.userId === id);
    if (!user) {
      throw new boom.notFound(`This user doesn't exist`);
    }
    return user;
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
      registerDate: new Date(),
      orders: [],
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id, changes) {
    const index = await this.users.findIndex((user) => user.userId === id);
    if (index === -1) {
      throw new boom.badRequest('User not found, try again');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return await this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((user) => user.userId === id);
    if (index === -1) {
      throw new boom.badRequest('User not found, try again');
    }
    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}

module.exports = UsersService;
