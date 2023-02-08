const {Teacher} = require("../Models/Teacher");


const registerTeacher = async (teacher)=>{

    try {
        let id;
        let i=0;
        while(i<5){
            id  = Math.floor(1000 + Math.random() * 9000);

            let existingTeacher = Teacher.findOne({teacherId:id})  
            if (!existingTeacher){
                break;
            }
            i++;
        }

        const newTeacher = Teacher({
            teacherId: id,
            ...teacher})
        await newTeacher.save(); 
        console.log("saved teacher: ", newTeacher)
        return newTeacher;
        
    } catch (err) {
        console.error(err)   
        }
}
const deleteTeacher = async(id)=>{
       const teacher =  await Teacher.findOneAndDelete({TeacherId:id});
       if (!teacher){
        return -1
       }
        return teacher;
}

const updateTeacher = async(id, data)=>{
    const updatedTeacher = await Teacher.findOneAndUpdate({teacherId:id}, data, {new:true});
    if (!updatedTeacher){
        return -1;
    }
    return updatedTeacher;
}
const findTeacher = async(data)=>{
    const teachers = await Teacher.find(data);
    if (!teachers){
        return -1;
    }
    return teachers;
}
const findAllTeachers = async()=>{
    return await Teacher.find();
}

module.exports  = { registerTeacher, deleteTeacher, updateTeacher, findTeacher, findAllTeachers}