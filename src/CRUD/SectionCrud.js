const Section = require("../Models/Section");
const Student = require("../Models/Student");


const generateSection = async(gradelevel, spec)=>{

    const batchStudents = await Student.find({grade:gradelevel});
    if (!batchStudents){
        return -1;
    }
    const session = null;
    try {
        Section.StartSession()
        .then(_session =>{
            session = _session;
            return 
        })

    } catch (err) {
        
    }
    finally{
        session.endSession();
    }
}