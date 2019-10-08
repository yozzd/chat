const mongoose = require('mongoose');

const environment = {
  production: 'mongodb+srv://yozz:backspace44@cluster0-qppdz.mongodb.net/chat?retryWrites=true&w=majority',
};

const config = {
  mongo: {
    connect: async () => {
      try {
        await mongoose.connect(environment[process.env.NODE_ENV], {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
      } catch (err) {
        console.error(`MongoDB connection error: ${err}`);
        process.exit(-1);
      }
    },
    close: async () => {
      await mongoose.connection.close();
    },
  },
};
module.exports = config;
