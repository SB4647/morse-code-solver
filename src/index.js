import { alphabet, morse } from './dictionary.js';

//retrieve mutable html element data
const inputMessage = document.getElementById('inputMessage');
const outputMessage = document.getElementById('outputMessage');
const radioButtons = document.querySelectorAll('input[name="radioBtns"]');
const form = document.getElementById('form');

//set default message conversion to encode
let mode = "encode";

/* FUNCTIONS */

//display the converted message to output text-area
const displayOutput = (message) => {

  outputMessage.innerHTML = message;

}

const convertMessage = (message, transferArr) => {

  //check if transferArr is defined in dictionary.js and throw error if not
  if (transferArr !== morse && transferArr !== alphabet) {

    throw new Error("transferArr needs to defined in dictionary.js");

  }

  //set deliminators according to the message converting mode selected
  const [delim1, delim2] = (transferArr === alphabet) ? ['', ' '] : [' ', ''];
  //spilt the message string into an array of characters (each seperated by a deliminator)
  let transferMessage = message.split(delim1);
  //convert the message 
  return transferMessage = transferMessage.reduce((enc, char) => enc + transferArr[char] + delim2, "");

}

/* EVENT HANDLERS */

//add event handler to radio buttons
radioButtons.forEach(btn => {
  btn.addEventListener("change", event => {

    //set message conversion mode (encode or decode) according to which radio button is selected
    if (event.target.id === "encodeChecked") {
      inputMessage.placeholder = 'Enter unencryped message here';
      outputMessage.placeholder = 'Encrypted message will be shown here';
      inputMessage.value = '';
      mode = "encode";
    }

    if (event.target.id === "decodeChecked") {
      inputMessage.placeholder = 'Enter encryped message here';
      outputMessage.placeholder = 'Decoded message will be shown here';
      inputMessage.value = '';
      mode = "decode";
    }

  })
});

//add event handler to form submit event
form.addEventListener('submit', event => {
  //prevent form 
  event.preventDefault();

  //convert input message according to which mode was selected
  const convertedMessage = (mode === "encode") ? convertMessage(inputMessage.value, alphabet) : convertMessage(inputMessage.value, morse);

  displayOutput(convertedMessage);

});

//add event handler to input into text-area event
//only allows the user to enter characters that can be encoded/decoded according to dictionary.js library
inputMessage.addEventListener('input', event => {

  let charValidArr = [];

  charValidArr = (mode === "encode") ? inputMessage.value.match(/[a-z0-9 !.,]/g) : inputMessage.value.match(/[ ./-]/g);

  if (charValidArr === null || (charValidArr.join('') !== inputMessage.value)) {
    inputMessage.value = '';
    alert("Invalid character entered. Enter a valid input message");
  }

});












