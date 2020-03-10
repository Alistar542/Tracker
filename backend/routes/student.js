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
    const followUpRemarks = req.body.followUpRemarks;
    const newStudent = new Student({
        firstName,
        lastName,
        followUpDate,
        phoneNumber,
        courseInterested,
        lastUpdateUser,
        followUpRemarks
    })

    newStudent.save()
    .then(() => res.json('first : '+req.body.followUpDate+'second : '+followUpDate))
    .catch(err => res.status(400).json('Error :'+err));

})

router.route('/update/:id').post((req,res)=>{
    console.log('Update Id : : '+req.params.id);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const followUpDate = Date.parse(req.body.followUpDate);
    const phoneNumber = Number(req.body.phoneNumber);
    const courseInterested = req.body.courseInterested;
    const lastUpdateUser = req.body.lastUpdateUser;
    const followUpRemarks = req.body.followUpRemarks;
   

	Student.findById(req.params.id)
	.then(student => {
		console.log("Student found bro !!!!")
		student.firstName = req.body.firstName;
		student.lastName = req.body.lastName;
		student.followUpDate = Date.parse(req.body.followUpDate);
		student.phoneNumber = Number(req.body.phoneNumber);
		student.courseInterested = req.body.courseInterested;
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