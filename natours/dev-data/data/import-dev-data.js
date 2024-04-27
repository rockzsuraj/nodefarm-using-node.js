const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

const sampleTourData = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`),
);
const args = process.argv[2];

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log('DB is connected successfully!'));

async function importData() {
  try {
    await Tour.create(sampleTourData);
    console.log('Data is imported successfully');
  } catch (error) {
    console.log('Error importing tour data', error);
  } finally {
    process.exit();
  }
}

async function deleteData() {
  try {
    await Tour.deleteMany();
    console.log('Tour data is deleted successfully!');
  } catch (error) {
    console.log('Error deleting data!', error);
  } finally {
    process.exit();
  }
}

if (args === '__import') {
  importData();
}

if (args === '__delete') {
  deleteData();
}
