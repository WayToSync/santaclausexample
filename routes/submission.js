const express = require("express");
const router = express.Router();

router.post("/submission", (request, response) => {
  response.redirect(`/`);
});

module.exports = router;
