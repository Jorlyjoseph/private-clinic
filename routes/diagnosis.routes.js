const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient.model.js');

// GET route for the diagnosis
router.get('/patient/:id/diagnose', (request, response, next) => {
    console.log('Handling /patient/:id/diagnose request');
    const { id } = request.params;
    response.redirect(`/patient/${id}/diagnoses`);
  });

// GET route for all diagnoses
router.get('/patient/:id/diagnoses', (request, response, next) => {
  if (!request.session.currentUser) {
    response.redirect('/user/login');
    return;
  }

  const { id } = request.params;
  Patient.findById(id)
    .then((patient) => {
      response.render('patient/diagnoses-list', { patient: patient });
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send('Internal Server Error');
    });
});



