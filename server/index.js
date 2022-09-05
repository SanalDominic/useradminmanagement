const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("express");



const userRoute = require("./routes/user");
const adminRoute =require('./routes/admin')


mongoose.connect("mongodb://localhost:27017/useradmin").then(() => {
  console.log("connection success");
});


app.use(cors());
app.use(express.json());

app.use("/", userRoute);
app.use('/admin',adminRoute)

app.listen(4000, () => {
  console.log("server started on port number 4000");
});
