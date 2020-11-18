//handling queries related to class

const express= require('express');
const classData=require('../model/classModel');
const classRouter=express.Router();

classRouter.get('/',(req,res)=>
{
res.send("TACO FROM CLASS ROUTER")
});
classRouter.post('/createClass',(req,res)=>
{
    let data=      //capturing raw data from the request body
    {
        standard:req.body.std,
        division:req.body.div   
    }
    let clss=classData(data);  //mapping to the schema
    clss.save();     //saving to the database
    res.send("class data saved to database!");
})
classRouter.post('/updateClass',(req,res)=>
{
     //capturing details from request body
    let data=
    {
      standard:req.body.std,
      division:req.body.div
    }
    classData.updateOne({standard:data.standard}, //filter
      {
        $set:           //update
        {
         division:data.division
        }
      })
      .then(e=>
            {
                console.log("Success!");
                res.send("Updated One Class!");
            })
      .catch(err=>
            {
                console.log("Error!");
                res.send("OOPS! Caught some Errors!");
            })
})
classRouter.post('/deleteClass',(req,res)=>
{
    const std=req.body.std; //capturing the standard
    classData.deleteOne({standard:std})
    .then(e=>
        {
            console.log("Deletion Success!");
            res.send(`Deleted ${e.deletedCount} Class!😥`);
        })
    .catch(err=>
        {
            console.log("Errors!😫");
            res.send("OOOPS...Errors!");
        })
})
    //reading the divisions of each standards
classRouter.get('/divisionsOfStandards/:std',(req,res)=>
{
    let std=req.params.std;  //getting the standard from the url
    classData.findOne({standard:std},{_id:0,division:1})
    .then(divisions=>
        {
            if(divisions!=null)
            {
                console.log("Found!");
                res.json({"standard":std,"divisions":divisions.division});
            }
            else
            {
                console.log("No Results!");
                res.send("No results!");
            }
        })
    .catch(err=>
        {
            console.log("Errors!");
        })
})

module.exports=classRouter; //exporting the CLASSROUTER