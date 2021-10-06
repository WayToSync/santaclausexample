// server.js
// where your node app starts

// init project
const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const { santaForm } = require("./routes/santaForm");
const returnHome = require("./routes/returnHome");
const submission = require("./routes/submission");
const doStuff = require("./api/mail-api");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined"));

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/submission", (request, response) => {
  response.sendFile(__dirname + "/views/submission.html");
});

app.get("/error", (request, response) => {
  response.sendFile(__dirname + "/views/error.html");
});

app.use(santaForm);
app.use(submission);
app.use(returnHome);

setInterval(() => doStuff(), 15000);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log(
    `Your app is listening on port http://localhost:${listener.address().port}`
  );
});
