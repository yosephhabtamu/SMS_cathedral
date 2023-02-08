const mongoose  = require("mongoose");
const express = require("express"); 
const studentRouter = require("./Routes/studentRouter");
const teacherRouter = require("./Routes/teacherRouter");


const app = express()

app.use(express.json());

app.use("/system", studentRouter);
app.use("/system", teacherRouter)



const start = async()=>{
    try {
        await mongoose.connect('mongodb://localhost/requirement')
        console.log("successful connection with db")

        app.listen(4000, ()=>{
            console.log("listening on port 4000")
        });

    } catch (err) {
        console.error(err)
        return
    }
}

start()
