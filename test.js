
const mongoose = require("mongoose");

const uri =
"mongodb+srv://ishantpathak659_db_user:airbn%40123@cluster0.5eu1vth.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  family: 4
})
.then(() => {
  console.log("Connected");
})
.catch(err => {
  console.error(err);
});