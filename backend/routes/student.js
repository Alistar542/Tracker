const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/add').post((req,res)=>{
    const studentName = req.body.studentName;
    const dob = req.body.dob;
    const phoneNumber = req.body.phoneNumber;
    const courseInterested = req.body.courseInterested;
    
    const newStudent = new Student({
        studentName,
        dob,
        phoneNumber,
        courseInterested
    })

    newStudent.save()
    .then(() => res.json('Student Added'))
    .catch(err => res.status(400).json('Error :'+err));

})

module.exports = router;