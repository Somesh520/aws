import express from 'express';

const app=express();
const PORT=3000;



app.get('/',(req,res)=>{
    res.json({message:"message form server 3000"});
})




app.listen(PORT,()=>{
    console.log("HELLO from world");
    console.log(`localhost ${PORT}`);

})