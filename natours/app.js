const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
// const config = require('./utils/config');
// const { auth } = require('express-openid-connect');

const app = express();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    name: process.env.SESSION_NAME, // Replace with environment variable
    secret: process.env.SESSION_SECRET, // Replace with environment variable
    resave: false,
    saveUninitialized: false, // Set to false to avoid creating sessions for unauthenticated users
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      httpOnly: true, // Prevent JavaScript access to cookies
      sameSite: 'lax', // Mitigate CSRF
      maxAge: 1000 * 60 * 30, // Example: 30 minutes
    },
    store: MongoStore.create({
      mongoUrl: DB, // Replace with MongoDB URI environment variable
      collectionName: 'sessions',
      dbName: process.env.DB_NAME,
    }),
  }),
);

// app.use(auth(config));

// app.set('view engine', 'pug');
app.get('/', (req, res, next) => {
  const response = req?.oidc?.user?.name
    ? `<div>Hello, ${req?.oidc?.user?.name} </div>`
    : '<div>Hello world</div>';
  res.send(response);
});

// app.get('/', (req, res) => {
//   console.log('req', req);

//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

app.use(
  cors({
    origin: process.env.corsOrigin, // React app's URL
    credentials: true, // Allow credentials to be sent with requests
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  }),
);

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// handle invalid api routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find (${req.originalUrl}) on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
