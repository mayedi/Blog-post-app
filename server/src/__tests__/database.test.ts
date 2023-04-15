import { Sequelize } from 'sequelize-typescript';
import Database from '../config/database';

describe('Database', () => {
  let database: Database;
  let sequelize: Sequelize;

  beforeAll(async () => {
    database = new Database();
    sequelize = database.sequelize as Sequelize;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should connect to PostgreSQL database', async () => {
    expect(sequelize).toBeDefined();
    await sequelize.authenticate();
    expect(sequelize.options.dialect).toBe('postgres');
  });

  it('should have Blogpost model added', () => {
    const models = sequelize.models;
    const blogpostModel = models.Blogpost;
    expect(blogpostModel).toBeDefined();
    expect(blogpostModel.name).toBe('Blogpost');
  });
});