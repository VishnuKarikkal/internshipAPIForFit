const express = require("express");
const bodyparser = require('body-parser');

const app=new express();
app.use(bodyparser.json());
        //importing router modules😎
const studentRouter=require('./src/routes/studentRouter');
const classRouter=require('./src/routes/classRouter');
const teacherRouter=require('./src/routes/teacherRouter');
        //creating request specific router paths🤠
app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
app.use('/class',classRouter);
        //root request handler😊
app.get('/',(req,res)=>
                {
                    res.send("Taco From Server!");
                });
        //activating port😋
app.listen(2000);
console.log("Library APP : listening on Port :2000");