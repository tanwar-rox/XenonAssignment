const mongoose = require("mongoose");

const url="mongodb+srv://surajchau549:zqfxHrYvGDdaSxug@cluster0.ja3plqi.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url,{  useNewUrlParser: true,
    useUnifiedTopology: true})

const db=mongoose.connection;

db.on("connected", ()=>{
    console.log("MongoDB is Connected Successfully");
})

db.on("error",()=>{
    console.log("Mongo Db connection Error");
})

module.exports=mongoose