const router = require('express').Router();
const Patient = require('../models/Patient.model.js');

router.get('/patient/register', (request, response, next) => {
  response.render('patient/register');
});

router.post('/patient/register', (request, response, next) => {
  const { name, age, address, sex } = request.body;
  console.log(name, age, address, sex);
  Patient.create({
    name,
    age,
    sex,
    address
  }).then((newPatient) => {
    response.redirect('/user');
  });
  // response.send(request.body);
  // console.log(request.body);
});

router.get('/patient/all', (request, response, next) => {
  Patient.find()
    .populate()
    .then((patientsFromDB) => {
      console.log(patientsFromDB);
      response.render('patient/patients-list', { patients: patientsFromDB });
    });
});

router.get('/patient/:id/diagnose', (request, response, next) => {
  const { id } = request.params;
  Patient.findById(id).then((data) => {
    response.render('patient/diagnose', { data: data });
  });
});

module.exports = router;
