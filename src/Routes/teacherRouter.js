const express = require("express");
const { validateTeacher } = require("../Models/Teacher");
const { registerTeacher, deleteTeacher, updateTeacher, findTeacher, findAllTeachers} = require("../CRUD/TeacherCrud");


const router = express.Router();


router.post("/teacher", async (req, res, next)=>{
    try {
        
        const teacher = req.body;
        
        if (validateTeacher(teacher) != null){
            
            return res.status(400).send("invalid request parameters");
        }
        
        const newTeacher = await registerTeacher(teacher);
        return res.status(200).send(newTeacher);
    } catch (err) {
        console.error(err);
        return res.status(500).send("internal server error");
    }
    

})

router.delete(`/teacher/delete/:id`, async(req,res, next)=>{
    const id = req.params.id;
 
        const deletedTeacher = await deleteTeacher(id);
        if (deletedTeacher == -1){
            return res.status(400).send("invalid teacher id");
        }
        else{
            return res.status(200).send(deletedTeacher)
        }
    

})

router.put("/teacher/update/:id", async(req,res)=>{
    const id = req.params.id;
    const data  = req.body;
    const updatedTeacher = await updateTeacher(id, data);
    if (updatedTeacher == -1){
        return res.status(404).send("teacher not found");

    }
    return res.status(200).send(updatedTeacher);
})

router.get("/teacher", async(req,res)=>{
    const data = req.body;
    try {
        const teacher = await findTeacher(data);
        if (teacher == -1){
            return res.status(404).send("teacher with the search parameter is not found");
        }
        return res.status(200).send(teacher);
    } catch (err) {
        console.error(err);   
    }

})

router.get("/teacher/all", async(req,res)=>{
    try {
        const allTeachers = await findAllTeachers();
        return res.status(200).send(allTeachers);
    } catch (err) {
        console.error(err);
    }
})

module.exports =  router;
