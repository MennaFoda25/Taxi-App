const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
async () => {

    await sequelize.authenticate(); //Makes sure Sequelize can actually connect to PostgreSQL
    console.log('Connection has been stablished successfully ');
  // } catch (error) {
  //   console.error('unable to connect to the database', error);
  //   process.exit(1);
  // }
};

module.exports = sequelize;
