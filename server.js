const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const { HOST_DB, PORT = 3000 } = process.env;

const app = require('./app');

async function connect() {
  try {
    if (!HOST_DB) {
      throw new Error('HOST_DB not set!');
    }
    await mongoose.connect(HOST_DB);
    console.log('Database connection successful!');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error('Error', error.message);
    process.exit(1);
  }
}
connect();
