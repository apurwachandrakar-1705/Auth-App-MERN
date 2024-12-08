const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/auth-app")
.then(()=>{console.log("conneted with db...")})
.catch(e=>console.log(e))
module.exports = mongoose;