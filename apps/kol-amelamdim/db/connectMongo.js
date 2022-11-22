import mongoose from 'mongoose';

let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = null;
}

async function connect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  cachedConnection = await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
  });

  return cachedConnection;
}

export default connect;
