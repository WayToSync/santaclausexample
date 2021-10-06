// client-side js
// run by the browser each time your view template is loaded

console.log("hello world :o");

// define variables that reference elements on our page
const santaForm = document.forms[0];
console.log(santaForm);

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = function (event) {
  if (santaForm[1].value.length > 100) event.preventDefault();
  // TODO: check the text isn't more than 100chars before submitting
  // event.preventDefault();
};
