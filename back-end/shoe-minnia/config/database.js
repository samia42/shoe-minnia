import mongoose from "mongoose";
const Connection = async () => {
  const URL = process.env.DB_URI;
  console.log(URL,"url url url");
  try {
    await mongoose.connect(`mongodb+srv://samia:1234@cluster0.oysuehh.mongodb.net/test?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Data base connected successfully");
  } catch (error) {
    console.log("Error while conecting with database", error);
  }
};
export default Connection;
