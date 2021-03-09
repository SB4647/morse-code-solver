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
export const displayOutput = (message) => {

  if (typeof message !== "string" && message !== undefined) {
    throw new Error("Input message is not a string");
  }

  outputMessage.innerHTML = message;

}

export const convertMessage = (message, transferArr) => {

  //check if transferArr is defined in dictionary.js and throw error if not
  if (transferArr !== morse && transferArr !== alphabet) {
    throw new Error("transferArr needs to defined in dictionary.js");
  }

  //check if transferArr is defined in dictionary.js and throw error if not
  if (typeof message !== "string") {
    throw new Error("Input message is not a string");
  }

  //set deliminators according to the message converting mode selected
  const [delim1, delim2] = (transferArr === alphabet) ? ['', ' '] : [' ', ''];
  //spilt the message string into an array of characters (each seperated by a deliminator)
  let transferMessage = message.split(delim1);
  //convert the message 
  transferMessage = transferMessage.reduce((enc, char) => enc + transferArr[char] + delim2, "");
  //remove deliminator at end of string 
  return transferMessage.slice(0, -1);

}

/* EVENT HANDLERS */

export const radioBtnHandle = event => {

    if (event.target.id !== "encodeChecked" && event.target.id !== "decodeChecked") {
      throw new Error("Incorrect id assigned to radio button");
    }

    //set message conversion mode (encode or decode) according to which radio button is selected
    try {

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

    } catch(err) {
      throw new Error("Radio button failed to set parameters correctly");
    }
 

  }


export const submitHandle = event => {
    //prevent form 
    event.preventDefault();
  
    //convert input message according to which mode was selected
    const convertedMessage = (mode === "encode") ? convertMessage(inputMessage.value, alphabet) : convertMessage(inputMessage.value, morse);
  
    displayOutput(convertedMessage);
  
  }


export const inputHandle = () => {

    let charValidArr = [];

    charValidArr = (mode === "encode") ? inputMessage.value.match(/[a-z0-9 !.,]/g) : inputMessage.value.match(/[ ./-]/g);
  
    if (charValidArr === null || (charValidArr.join('') !== inputMessage.value)) {
      inputMessage.value = '';
      alert("Invalid character entered. Enter a valid input message");
    }
  
  }


//add event handler to radio buttons
radioButtons.forEach(btn => {
  btn.addEventListener("change", radioBtnHandle);
});

//add event handler to form submit event
if (form) {
  form.addEventListener('submit', submitHandle);
}


//add event handler to input into text-area event
//only allows the user to enter characters that can be encoded/decoded according to dictionary.js library
if (inputMessage) {
  inputMessage.addEventListener('input', inputHandle);
}


export default { displayOutput,convertMessage, radioBtnHandle, inputHandle};







