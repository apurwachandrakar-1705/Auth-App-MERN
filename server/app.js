require('dotenv').config()
require('./db/conn')
const express = require("express");
const app = express();
const cors = require("cors")
const port = process.env.PORT;
const router = require("./routes/router")
const cookiParser = require("cookie-parser")
app.use(express.json())
app.use(cookiParser())
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true // Allow cookies and other credentials
}));


app.use(router);

app.listen(port,()=>{console.log(`server is running on port:${port}`)})

