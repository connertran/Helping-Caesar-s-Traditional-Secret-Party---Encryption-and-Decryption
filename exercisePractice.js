const alphabet = "abcdefghijklmnopqrstuvwxyz";

function randomAlphabetLetter(){
  let randomIndex= Math.floor(Math.random() * 26);
  return alphabet[randomIndex];
}

function encrypt (message, shiftValue)
{
  // encrypting normal message to encrypted message without random characters
  let messageWithoutRandomLetter= "";
  for (let i = 0; i< message.length; i++){
    // the letter is found in the alphabet
    if (alphabet.indexOf(message[i])!==-1){
      let encryptLetter = alphabet[(alphabet.indexOf(message[i])+shiftValue)% alphabet.length];
      messageWithoutRandomLetter+=encryptLetter;
    }
    // the letter is not found in the alphabet because it is in UpperCase
    else if(alphabet.indexOf(message[i].toLowerCase())!==-1){
      let encryptLetterUpperToLower = alphabet[(alphabet.indexOf(message[i].toLowerCase())+shiftValue)% alphabet.length];
      let encryptLetterLowerToUpper = encryptLetterUpperToLower.toUpperCase();
      messageWithoutRandomLetter+=encryptLetterLowerToUpper;
    }
    // the character doesn't belong to the alphabet
    else{
      messageWithoutRandomLetter += message[i] ;
    }
  }

  // adding random characters to the encrypted string
  let encryptedMessage= "";
  let indexForRandom=0;
  for (let j = 0; j<messageWithoutRandomLetter.length; j++){
    if (indexForRandom<2){
      encryptedMessage+= messageWithoutRandomLetter[j];
      indexForRandom++;
    }
    else{
      encryptedMessage+= randomAlphabetLetter()+ messageWithoutRandomLetter[j];
      indexForRandom=1;
    }
  }
  return encryptedMessage;
}

function decrypt (encryptedMessage, shiftValue)
{
  // Removing all random characters from the encrypted text
  let noRandomEncryptedMessage="";
  let indexForRandomInMessage =0; 
  for (let i=0; i < encryptedMessage.length; i++) {
    if (indexForRandomInMessage <2 ) {
      noRandomEncryptedMessage += encryptedMessage [i];
      indexForRandomInMessage ++;
    }
    else{
      indexForRandomInMessage= 0;
    }
  }
  // decrypt encrypted message to normal message using shiftValue
  let decryptedMessage ="";
  for (let i = 0; i< noRandomEncryptedMessage.length; i++){
    // letter is in lower case
    // alphabet.length*shiftvalue to avoid negative numbers
    if (alphabet.indexOf(noRandomEncryptedMessage[i])!==-1){
      let decryptLetterIndex=(alphabet.indexOf(noRandomEncryptedMessage[i])-shiftValue+(alphabet.length*shiftValue)) % alphabet.length;
      decryptedMessage += alphabet[decryptLetterIndex];
    }
    // letter is in uppercase
    // alphabet.length*shiftvalue to avoid negative numbers
    else if(alphabet.indexOf(noRandomEncryptedMessage[i].toLowerCase())!==-1){
      let decryptLetterUpperToLower = alphabet[(alphabet.indexOf(noRandomEncryptedMessage[i].toLowerCase())-shiftValue+(alphabet.length*shiftValue)) % alphabet.length];
      let decryptLetterLowerToUpper = decryptLetterUpperToLower.toUpperCase();
      decryptedMessage+= decryptLetterLowerToUpper;
    }
    // character doesn't belong to the alphabet
    else{
      decryptedMessage+= noRandomEncryptedMessage[i];
    }
  }
  return decryptedMessage;

}