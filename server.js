import dotenv from "dotenv";
import App from "./app.js";
import cloudinary from 'cloudinary'
import Connection from "./config/database.js";

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error:: ${err.message}`);
  console.log("Shutting down the server");
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config/config.env" });
}
else
dotenv.config({path:"./config/config.env" })
Connection();
const port = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.COUDINARY_NAME,
  api_key: process.env.COUDINARY_API_KEY,
  api_secret: process.env.COUDINARY_SECRET_KEY
})
App.listen(port, () => {
  console.log(`Server running on the Port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err}`);
  console.log("Shutting down Server due unhandled promise rejection");
});
