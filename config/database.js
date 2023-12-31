import mongoose from 'mongoose'

const connectDatabase = () => { mongoose.connect(process.env.DB_URI, {
  useNewUrlParser : true,
  useUnifiedTopology : true
  // useCreateIndex : true
}).then(con => {
  console.log(`MongoDB Database connected with host: ${con.connection.host}`);
  });
};


export default  connectDatabase;