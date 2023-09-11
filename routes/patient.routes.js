const router = require("express").Router();

router.get("/patient/register", (request, response, next) => {
  response.render("patient/register");
});

router.get("/patient/all", (request, response, next) => {
  response.render("patient/patients-list");
});

router.get("/patient/:id/diagnose", (request, response, next) => {
  response.render("patient/diagnose");
});

module.exports = router;
