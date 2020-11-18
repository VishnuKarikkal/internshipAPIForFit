//handling queries related to student

const express= require('express');
const studentData=require('../model/studentModel');
const studentRouter=express.Router();

studentRouter.get('/',(req,res)=>
{
    res.send("TACO from STUDENT ROUTER");
});
    //creating student data
studentRouter.post('/createStudent',(req,res)=>
{
    let data=      //capturing raw data from the request body
    {
        name:req.body.name,
        roll:req.body.roll,
        mob:req.body.mob,
        div:req.body.div
    }
    let student=studentData(data);  //mapping to the schema
    student.save();     //saving to the database
    res.send("student data saved to database!");
})
    //updating student data
studentRouter.post('/updateStudent',(req,res)=>
{
    const id=req.body.id; //capturing the student id and details from request body
    let data=
    {
      name:req.body.name,
      roll:req.body.roll,
      mob:req.body.mob,
      div:req.body.div
    }
    studentData.updateOne({_id:id}, //filter
      {
        $set:           //update
        {
         name:data.name,
         mob:data.mob,
         div:data.div
        }
      })
      .then(e=>
            {
                console.log("Success!");
                res.send("Updated One Student!");
            })
      .catch(err=>
            {
                console.log("Error!");
                res.send("OOPS! Caught some Errors!");
            })
})
    //delete student data
studentRouter.post('/deleteStudent',(req,res)=>
{
    const id=req.body.id; //capturing the student id
    studentData.deleteOne({_id:id})
    .then(e=>
        {
            console.log("Deletion Success!");
            res.send(`Deleted ${e.deletedCount} Student!😥`);
        })
    .catch(err=>
        {
            console.log("Errors!😫");
            res.send("OOOPS...Errors!");
        })
})
    //reading list of students in a division
studentRouter.get('/studentListByDivision/:div',(req,res)=>
{
    let div=req.params.div;     //capturing url parameter ('division')
    studentData.find({div:div},{name:1,roll:1,_id:0})  //looking for students in the division
    .then(list=>
        {
            if(list.length>0)   //if some results found
            {
                console.log("FoUnD Some!😁");
                res.json({"division":div,"list":list});
            }
            else        //if no results found
            {
                res.send("NO Results!😶");
            }
        })
    .catch(e=>      //ahhh eroorrrrssss🥵
        {
            console.log("Error!!!😐");
        });
})

module.exports=studentRouter; //exporting the STUDENTROUTER