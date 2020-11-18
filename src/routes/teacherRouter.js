//handling queries related to teacher

const express= require('express');
const teacherData=require('../model/teacherModel');
const teacherRouter=express.Router();

teacherRouter.get('/',(req,res)=>
{
    res.send("TACO from TEACHER ROUTER");
});
teacherRouter.post('/createTeacher',(req,res)=>
{
    let data=      //capturing raw data from the request body
    {
        name:req.body.name,
        id:req.body.id,
        subject:req.body.sub,
        classes:req.body.classes   
    }
    let teacher=teacherData(data);  //mapping to the schema
    teacher.save();     //saving to the database
    res.send("teacher data saved to database!");
})
teacherRouter.post('/updateTeacher',(req,res)=>
{
      //capturing details from request body
      let data=
      {
        _id:req.body._id,
        id:req.body.id,
        name:req.body.name,
        sub:req.body.sub,
        classes:req.body.classes
      }
      teacherData.updateOne({_id:data._id}, //filter
        {
          $set:           //update
          {
           name:data.name,
           id:data.id,
           subject:data.sub,
           classes:data.classes
          }
        })
        .then(e=>
              {
                  console.log("Success!");
                  res.send("Updated One Teacher!");
              })
        .catch(err=>
              {
                  console.log("Error!");
                  res.send("OOPS! Caught some Errors!");
              })
})
teacherRouter.post('/deleteTeacher',(req,res)=>
{
    const id=req.body._id; //capturing the teacher _id
    teacherData.deleteOne({_id:id})
    .then(e=>
        {
            console.log("Deletion Success!");
            res.send(`Deleted ${e.deletedCount} Teacher!😥`);
        })
    .catch(err=>
        {
            console.log("Errors!😫");
            res.send("OOOPS...Errors!");
        })
})
    //reading the list of classes of a teacher
teacherRouter.get('/teacherClasses/:emp_id',(req,res)=>
{
let eid=req.params.emp_id;  //getting the employee id from the req.
teacherData.findOne({id:eid},{name:1,classes:1,_id:0}) //looking for classes of the teacher
.then(teacher=>
    {
        if(teacher!=null)
        {
            console.log("Found!");
            res.json({"employee Id":eid,"Teacher":teacher.name,"Classes":teacher.classes});
        }
        else
        {
            console.log("No results!");
            res.send("No Results!");
        }
    })
.catch(err=>
    {
        console.log("errors!"+err);
    })
})

module.exports=teacherRouter;  //exporting the TEACHERROUTER