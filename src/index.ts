import app from './app';
import sequelize from './config/database';

const PORT = process.env.PORT || 4000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    return sequelize.sync({ force: false }); // Cambiar a true para reiniciar las tablas
  })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a la base de datos:', err);
  });
