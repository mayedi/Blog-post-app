import { Sequelize } from "sequelize-typescript"
import { Blogpost } from '../model/Blogpost';

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: ':memory:',
});
sequelize.addModels([Blogpost]);

describe('Blogpost model', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it('should create a new blogpost instance', async () => {
    const blogpost = await Blogpost.create({
      title: 'Test blogpost',
      body: 'This is a test blogpost body.',
      timestamp: '2023-04-15 10:00:00',
    });
    expect(blogpost.title).toEqual('Test blogpost');
    expect(blogpost.body).toEqual('This is a test blogpost body.');
    expect(blogpost.timestamp).toEqual('2023-04-15 10:00:00');
  });
});