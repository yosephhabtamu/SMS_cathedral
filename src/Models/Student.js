const mongoose  = require("mongoose");
const Joi = require("joi");

const StudentSchema = new mongoose.Schema({
    studentId:{
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
        max:23     
    },
    gender:{
        type:String,
        enum:['M', 'F'],
        required:true
    },
    grade:{
        type:Number,
        min:1,
        max:12,
        required:true
    }
    
    
});
const Student = new mongoose.model("Student",StudentSchema);

exports.validateStudent = function (student) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        middleName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        age:Joi.number().positive().integer().min(3).required(),
        gender:Joi.string().valid("M", "F").required(),
        grade:Joi.number().positive().integer().min(1).max(12).required()

    });
    let { error } = schema.validate(student);
    return error;
  };

exports.Student = Student;
