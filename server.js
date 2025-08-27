const express = require('express');
const morgan = require('morgan');
const sequelize = require('./config/Database');
const dotenv = require('dotenv');
const globalError = require('./middlewares/errorMiddleware');
const ApiError = require('./utils/apiError');

dotenv.config({ path: 'config.env' });

//Routes
const userRoutes = require('./routes/userRoutes');

const app = express();

//Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
} else {
  app.use(morgan('prod'));
  console.log(`mode : Production`);
}

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database & models synchronized');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
})();

//Mount Routes
app.use('/api/v1/users', userRoutes);

app.all('*sth', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

//global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Shutting down....');
    process.exit(1);
  });
});
