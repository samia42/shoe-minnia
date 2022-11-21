import mongoose from "mongoose";
const Connection = async () => {
  const URL = process.env.DB_URI;
  console.log(URL, "url");
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Data base connected successfully");
  } catch (error) {
    console.log("Error while conecting with database", error);
  }
};
export default Connection;
