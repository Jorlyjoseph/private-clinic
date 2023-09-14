const router = require('express').Router();
const Patient = require('../models/Patient.model.js');

router.get('/patient/register', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }
  response.render('patient/register');
});

router.post('/patient/register', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }

  const { name, age, address, sex } = request.body;
  Patient.create({
    name,
    age,
    sex,
    address
  }).then((newPatient) => {
    response.redirect('/user');
  });
});

router.get('/patient/all', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }

  Patient.find()
    .populate()
    .then((patientsFromDB) => {
      response.render('patient/patients-list', { patients: patientsFromDB });
    });
});

router.get('/patient/:id/diagnose', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }

  const { id } = request.params;
  Patient.findById(id).then((data) => {
    response.render('patient/diagnose', { data: data });
  });
});

router.get('/patient/:id/edit', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }

  const { id } = request.params;
  Patient.findById(id).then((data) => {
    response.render('patient/edit', { data: data });
  });
});

router.post('/patient/:id/edit', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }

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

router.get('/patient/:id/delete', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }

  const { id } = request.params;
  Patient.findByIdAndDelete(id).then(() => {
    response.redirect('/patient/all');
  });
});

router.post('/patient/all', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }

  const { query } = request.body;
  const reg = new RegExp(query, 'i');

  Patient.find({ name: { $regex: reg } })
    .then((patients) => {
      response.render('patient/patients-list', { patients });
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send('Server error');
    });
});

module.exports = router;
