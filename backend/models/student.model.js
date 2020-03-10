const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    followUpDate : {type:Date,required:true},
    phoneNumber : {type:Number,required:true},
    courseInterested : {type:String,required:true},
    status:{type:String,required:true,default:'P'},
    lastUpdateUser : {type:String,required:true},
    followUpRemarks : {type:Array}
},{
    timestamps:true
});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;