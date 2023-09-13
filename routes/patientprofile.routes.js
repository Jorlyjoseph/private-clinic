const router = require('express').Router();

router.get('/patient/:id/diagnose', (request, response, next) => {
  response.render('patient/diagnose');
});

module.exports = router;
