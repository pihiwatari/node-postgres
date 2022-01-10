const getConnection = require('../libs/postgres');

class ordersService {
  constructor() {}

  async find() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM public.tasks');
    return rta.rows;
  }
}

module.exports = ordersService;
