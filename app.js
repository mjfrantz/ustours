const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middleware
//This middleware applies to each and every request if the route handler comes before the route handler.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // logger the time it took to send back the response

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Routes (Middleware)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Middleware handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
