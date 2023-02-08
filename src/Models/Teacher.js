const mongoose  = require("mongoose");
const Joi = require("joi");

const subjects = ["amharic", "english","mathematics","biology","physics","chemistry","civics", "technical-drawing", "business", "economics", "information-technology", "sport", "history", "geography","aptitude"];
const qualifications= ["TVET", "Diploma", "Degree", "Masters", "PhD", "professor"];

const TeacherSchema = new mongoose.Schema({
    teacherId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true,
        length:{
            minlength:2,
        }
    },
    middleName:{
        type:String,
        required:true,
        length:{
            minlength:2
        }
    },
    lastName:{
        type:String,
        required:true,
        length:{
            minlength:2
        }
    },
    age:{
        type:Number,
        required:true,
        min:3,
        
    },
    gender:{
        type:String,
        enum:['M', 'F'],
        required:true
    },
    subject:{
        type:String,
        enum:subjects,
        required:true,
    },
    educationLevel:{
       type:String,
       enum:qualifications,
       required:true 
    },

    //just incase we need it for assignment of teachers
    gradeQualification :{
        type:[Number],
        length:{
            minlength:1,
            maxlength:12
        },
        

        
    }

    
})
const Teacher = new mongoose.model("Teacher",TeacherSchema);

exports.validateTeacher = function (teacher) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        middleName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        age:Joi.number().positive().integer().min(3).required(),
        gender:Joi.string().valid("M", "F").required(),
        educationLevel:Joi.string().valid(...qualifications).required(),
        subject:Joi.string().valid(...subjects).required(),
        gradeQualification:Joi.array().items(Joi.number().positive().integer().min(1).max(12)).required()

    });
    let { error } = schema.validate(teacher);
    return error;
  };


exports.Teacher = Teacher;