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
      response.render('patient/patients-list', { patients: patientsFromDB });
    });
});

router.get('/patient/:id/diagnose', (request, response, next) => {
  const { id } = request.params;
  Patient.findById(id).then((data) => {
    response.render('patient/diagnose', { data: data });
  });
});

router.get('/patient/:id/edit', (request, response, next) => {
  const { id } = request.params;
  Patient.findById(id).then((data) => {
    response.render('patient/edit', { data: data });
  });
});

router.post('/patient/:id/edit', (request, response, next) => {
  const { id } = request.params;
  const { name, age, sex, address } = request.body;

  Patient.findByIdAndUpdate(id, {
    name,
    age,
    sex,
    address
  }).then(() => {
    response.redirect('/patient/all');
  });
});

module.exports = router;
