const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/add').post((req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const followUpDate = req.body.followUpDate;
    const phoneNumber = req.body.phoneNumber;
    const courseInterested = req.body.courseInterested;
    
    const newStudent = new Student({
        firstName,
        lastName,
        followUpDate,
        phoneNumber,
        courseInterested
    })

    newStudent.save()
    .then(() => res.json('Student Added'))
    .catch(err => res.status(400).json('Error :'+err));

})

module.exports = router;