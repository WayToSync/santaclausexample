const express = require("express");
const router = express.Router();

router.post("/error", (request, response) => {
  response.redirect(`/`);
});

module.exports = router;
