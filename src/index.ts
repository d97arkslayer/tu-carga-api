import 'reflect-metadata';
import app from './app';
import sequelize from './config/database';
import { config } from '@config/index';

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established');
    return sequelize.sync({ force: false }); // Change to true to reset tables
  })
  .then(() => {
    console.log('Models synchronized with database');
    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });
