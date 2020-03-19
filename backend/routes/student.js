const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/add').post((req,res)=>{
    console.log('first : '+req.body.followUpDate);
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = Number(req.body.phoneNumber);
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const maritalStatus = req.body.maritalStatus;
    const courseInterested = req.body.courseInterested;
    const followUpDate = req.body.followUpDate;
    const englishExamType = req.body.englishExamType;
    const examDate = req.body.examDate;
    const overall = req.body.overall;
    const listening = req.body.listening;
    const reading = req.body.reading;
    const writing = req.body.writing;
    const speaking = req.body.speaking;
    const lastUpdateUser = req.body.lastUpdateUser;
    const followUpRemarks = req.body.followUpRemarks;
    const newStudent = new Student({
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
        maritalStatus,
        courseInterested,
        followUpDate,
        englishExamType,
        examDate,
        overall,
        listening,
        reading,
        writing,
        speaking,
        lastUpdateUser,
        followUpRemarks
    })

    newStudent.save()
    .then(() => res.json('first : '+req.body.followUpDate+'second : '+followUpDate))
    .catch(err => res.status(400).json('Error :'+err));

})

router.route('/update/:id').post((req,res)=>{
    console.log('Update Id : : '+req.params.id);
	Student.findById(req.params.id)
	.then(student => {
		student.firstName = req.body.firstName;
        student.middleName = req.body.middleName;
        student.lastName = req.body.lastName;
        student.email = req.body.email;
        student.phoneNumber = Number(req.body.phoneNumber);
        student.dateOfBirth = req.body.dateOfBirth;
        student.gender = req.body.gender;
        student.maritalStatus = req.body.maritalStatus;
        student.courseInterested = req.body.courseInterested;
        student.followUpDate = req.body.followUpDate;
        student.englishExamType = req.body.englishExamType;
        student.examDate = req.body.examDate;
        student.overall = req.body.overall;
        student.listening = req.body.listening;
        student.reading = req.body.reading;
        student.writing = req.body.writing;
        student.speaking = req.body.speaking;
		student.lastUpdateUser = req.body.lastUpdateUser;
		student.followUpRemarks = req.body.followUpRemarks;
		
		student.save()
		.then(() => res.json('Student updated'))
		.catch(err => res.status(400).json('Error :'+err));
	})
	.catch(err => res.status(400).json('Error :'+err));

})

router.route('/getstudent').post((req,res) => {
    var date1 = Date.parse(req.body.followUpDate);
    var currentUser = req.body.currentUser;
    var status = req.body.status;
    var query;
    if(currentUser === 'admin'){

        query = {followUpDate : date1};
    }else{
        query = {followUpDate : date1,
            lastUpdateUser:currentUser};
    }
    var cloneQuery = {status:status,...query};
    Student.find(cloneQuery)
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;