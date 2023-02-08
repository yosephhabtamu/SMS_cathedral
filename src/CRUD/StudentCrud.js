const {Student} = require("../Models/Student");


const registerStudent = async (student)=>{

    try {
        let id;
        let i=0;
        while(i<5){
            console.log("i: ", i);
            id  = Math.floor(100000 + Math.random() * 900000);
            console.log("id: ",id)
            let existingstudent = Student.findOne({studentId:id})  
            if (!existingstudent){
                break;
            }
            i++
        }
        console.log("id :",id)
        const newStudent = Student({
            studentId: id,
            ...student})
        await newStudent.save(); 
        console.log("saved student: ", newStudent)
        return newStudent;
        
    } catch (err) {
        console.error(err)   
        }
}
const deleteStudent = async(id)=>{
       const student =  await Student.findOneAndDelete({studentId:id});
       if (!student){
        return -1
       }
        return student;
}

const updateStudent = async(id, data)=>{
    const updatedStudent = await Student.findOneAndUpdate({studentId:id}, data, {new:true});
    if (!updatedStudent){
        return -1;
    }
    return updatedStudent;
}
const findStudent = async(data)=>{
    const students = await Student.find(data);
    if (!students){
        return -1;
    }
    return students;
}
const findAllStudent = async()=>{
    return await Student.find();
}

module.exports  = { registerStudent, deleteStudent, updateStudent, findStudent, findAllStudent}