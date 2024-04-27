const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// DB = process.env.DATABASE.replace('<DB_NAME>', process.env.DB_NAME);

mongoose
  .connect(DB, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log('Connection to database is successful!');
  });
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
