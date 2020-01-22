const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri , {useNewUrlParser : true, useCreateIndex:true ,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB connected");
    
});

const courseRouter = require('./routes/courses');

app.use('/course',courseRouter);

const studentRouter = require('./routes/student');

app.use('/student',studentRouter);

//Dummy test
app.get('/',(req,res) =>{
    res.json({
        message:"hello world"
    })
})

// serve static assets if in production (heroku)
// if(process.env.NODE_ENV === 'production'){
//     //set static folder
//     app.use(express.static(path.resolve(__dirname,'/../','build','index.html')));
//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname,'/../','build','index.html'));
//     });
// }

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});