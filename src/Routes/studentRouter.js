const express = require("express");
const { validateStudent } = require("../Models/Student");
const { registerStudent, deleteStudent, updateStudent, findStudent, findAllStudent} = require("../CRUD/StudentCrud");


const router = express.Router();


router.post("/student", async (req, res, next)=>{
    try {
        
        const student = req.body;
        
        if (validateStudent(student) != null){
            
            return res.status(400).send("invalid request parameters");
        }
        
        const newStudent = await registerStudent(student);
        return res.status(200).send(newStudent);
    } catch (err) {
        console.error(err);
        return res.status(500).send("internal server error");
    }
    

})

router.delete(`/student/delete/:id`, async(req,res, next)=>{
    const id = req.params.id;
 
        const deletedStudent = await deleteStudent(id);
        if (deletedStudent == -1){
            return res.status(400).send("invalid student id");
        }
        else{
            return res.status(200).send(deletedStudent)
        }
    

})

router.put("/student/update/:id", async(req,res)=>{
    const id = req.params.id;
    const data  = req.body;
    const updatedStudent = await updateStudent(id, data);
    if (updatedStudent == -1){
        return res.status(404).send("student not found");

    }
    return res.status(200).send(updatedStudent);
})

router.get("/student", async(req,res)=>{
    const data = req.body;
    try {
        const student = await findStudent(data);
        if (student == -1){
            return res.status(404).send("student with the search parameter is not found");
        }
        return res.status(200).send(student);
    } catch (err) {
        console.error(err);   
    }

})

router.get("/student/all", async(req,res)=>{
    try {
        const allStudents = await findAllStudent();
        return res.status(200).send(allStudents);
    } catch (err) {
        console.error(err);
    }
})

module.exports =  router;
