const express= require('express');
const cors =require('cors')
const user = require('./routers/user')
const blog = require('./routers/blog')

const dotenv =require('dotenv')
const cookieParser = require('cookie-parser')
const app =express();
dotenv.config();
app.use(express.json())
app.use(cookieParser());

var corsOptions = {
  credentials:true,
  origin: "http://localhost:5173"
};


const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(cors(corsOptions));
app.use('/user',user);
app.use('/blog',blog);

// const test = require('./routers/test')
// app.use(express.static('public'));


// app.use('/test',test);





app.listen(3000,console.log('Server running on Port: 3000'));