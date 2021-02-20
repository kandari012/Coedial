const express=require("express");
const app=express();
const port=8000;

//use express router
app.use("/", require("./routes/index"));                  //middleware 


app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in running the server :  ${port}`);
        
    }
    console.log(`server is running on port :  ${port}`);
});