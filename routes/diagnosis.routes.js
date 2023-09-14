const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient.model.js');

// GET route for the diagnosis
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

// POST route for adding a new diagnosis
router.post('/patient/:id/diagnose', (req, res, next) => {
  const { id } = req.params;
  const { diagnosisDate, diagnosis } = req.body;

  const newDiagnosis = {
    date: diagnosisDate,
    diagnosis: diagnosis
  };

  Patient.findByIdAndUpdate(
    id,
    { $push: { diagnosisHistory: newDiagnosis } },
    { new: true }
  )
    .then((updatedPatient) => {
      if (!updatedPatient) {
        res.status(404).send('Patient not found');
        return;
      }

      res.redirect(`/patient/${id}/diagnoses`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});
module.exports = router;
