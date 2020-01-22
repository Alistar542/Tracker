const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/add').post((req,res)=>{
    console.log('first : '+req.body.followUpDate);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const followUpDate = Date.parse(req.body.followUpDate);
    const phoneNumber = Number(req.body.phoneNumber);
    const courseInterested = req.body.courseInterested;
    const lastUpdateUser = req.body.lastUpdateUser;
    const newStudent = new Student({
        firstName,
        lastName,
        followUpDate,
        phoneNumber,
        courseInterested,
        lastUpdateUser
    })

    newStudent.save()
    .then(() => res.json('first : '+req.body.followUpDate+'second : '+followUpDate))
    .catch(err => res.status(400).json('Error :'+err));

})

router.route('/getstudent').post((req,res) => {
    var date1 = Date.parse(req.body.followUpDate);
    var currentUser = req.body.currentUser;
    var query;
    if(currentUser === 'admin'){

        query = {followUpDate : date1};
    }else{
        query = {followUpDate : date1,
            lastUpdateUser:currentUser};
    }
    
    Student.find(query)
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;