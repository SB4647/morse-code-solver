import { displayOutput, convertMessage, radioBtnHandle } from './src/index.js';

import { alphabet, morse } from './src/dictionary.js';

describe('convertMessage() tests', () => {

    const invalidArr = {
        'a': '.--',
        'b': '--.',
        'c': '-.-.'
    }

    test('transArr does not equal alphabet or morse', () => {
        expect(() =>  convertMessage("hello", invalidArr)).toThrowError(new Error("transferArr needs to defined in dictionary.js"));
    });

    test('message is not a string', () => {
        expect(() =>  convertMessage(4, alphabet)).toThrowError(new Error("Input message is not a string"));
        expect(() =>  convertMessage(5, alphabet)).toThrowError(new Error("Input message is not a string"));
        expect(() =>  convertMessage({}, alphabet)).toThrowError(new Error("Input message is not a string"));
    });

    test('returns a string', () => {
        expect(typeof convertMessage("hello", alphabet)).toBe("string");
    });


    test('encodes a string correctly', () => {
        expect(convertMessage('hello there, my name is stephen', alphabet)).toBe('.... . .-.. .-.. --- / - .... . .-. . --··-- / -- -.-- / -. .- -- . / .. ... / ... - . .--. .... . -.');
    });

    test('decodes a string correctly', () => {
        expect(convertMessage('.... . .-.. .-.. --- / - .... . .-. . --··-- / -- -.-- / -. .- -- . / .. ... / ... - . .--. .... . -.', morse)).toBe('hello there, my name is stephen');
    });

  
});

describe('displayOutput() tests', () => {

    test('message is not a string', () => {
        expect(() =>  convertMessage(4, alphabet)).toThrowError(new Error("Input message is not a string"));
        expect(() =>  convertMessage(["hello"], alphabet)).toThrowError(new Error("Input message is not a string"));
        expect(() =>  convertMessage(undefined, alphabet)).toThrowError(new Error("Input message is not a string"));
    });

    test('output message is set correctly', () => {
        const outputMessage = document.getElementById('outputMessage');
        displayOutput("hello");
        expect(outputMessage).toBe("hello");
    });
  
});


describe('radioBtnHandle() tests', () => {

    test('target id is incorrect', () => {
        expect(() =>  radioBtnHandle({target: {id: "encoecked"}})).toThrowError(new Error("Incorrect id assigned to radio button"));
    });
  
});






