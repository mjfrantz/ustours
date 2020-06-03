const express = require('express');
const morgan = require('morgan');

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
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
