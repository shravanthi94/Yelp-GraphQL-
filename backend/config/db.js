const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      // reconnectTries: Number.MAX_VALUE,
      // reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 500,
      bufferMaxEntries: 0
    });

    console.log('Connected to mongoDB');
  } catch (err) {
    console.log(err.message);
    //  Exit process when failed to connect
    process.exit(1);
  }
};

module.exports = connectDB;
