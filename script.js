// Array of special characters to be included in password
var specialCharacters = [
    '@',
    '%',
    '+',
    '\\',
    '/',
    "'",
    '!',
    '#',
    '$',
    '^',
    '?',
    ':',
    ',',
    ')',
    '(',
    '}',
    '{',
    ']',
    '[',
    '~',
    '-',
    '_',
    '.'
  ];
  
  // Array of numeric characters to be included in password
  var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  // Array of lowercase characters to be included in password
  var lowerCasedCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  
  // Array of uppercase characters to be included in password
  var upperCasedCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  
  // Function to prompt user for password options
  function getPasswordOptions() {
    let passwordLength = Number(prompt("How many characters should your password contain? Please enter a number between 10 and 64."));
    while (passwordLength<10||passwordLength>64) {
        passwordLength = prompt("Sorry, your password must contain between 10 and 64 characters \n How many characters should your password contain? Please enter a number between 10 and 64.")
    }
    let upperLetter = window.confirm("Should your password include upper case letters? Select ok for yes or cancel for no.");
    let lowerLetter = window.confirm("Should your password include lower case letters? Select ok for yes or cancel for no.");
    let numeric = window.confirm("Should your password include numbers? Select ok for yes or cancel for no.");
    let special = window.confirm("Should your password include special characters? Select ok for yes and cancel for no.");
    //If no options are selected, alert the user and then ask for prompts again
    if (!upperLetter && !lowerLetter && !numeric && !special) {
        window.alert("Cannot generate a password without at least one character type. \n Please choose at least one from lower case, upper case, numeric or special characters.");
        return getPasswordOptions();
    } else {
        return [passwordLength, upperLetter, lowerLetter, numeric, special];
    } 
  }
  
  // Function for getting a random element from an array
  function getRandom(arr) {
    let i = Math.floor(Math.random()*arr.length);
    return arr[i];
  }
  
  // Function to generate password with user input
  function generatePassword() {
    let options = getPasswordOptions();
    let sourceArray = []
    let passwordArray = [];
    let passwordLength = options[0];
    //If user has selected uppercase characters, add those to source array
    if (options[1] === true) {
        sourceArray = sourceArray.concat(upperCasedCharacters);
        //Ensure at least one uppercase character is added to the password
        passwordArray.push(getRandom(upperCasedCharacters));
        passwordLength--;
    } 
    //If user has selected lowercase characters, add those to source array
    if (options[2] === true) {
        sourceArray = sourceArray.concat(lowerCasedCharacters);
        //Ensure at least one lowercase character is added to the password
        passwordArray.push(getRandom(lowerCasedCharacters));
        passwordLength--;
    }
    //If user has selected numeric characters, add those to source array
    if (options[3] === true) {
        sourceArray = sourceArray.concat(numericCharacters);
        //Ensure at least one numeric character is added to the password
        passwordArray.push(getRandom(numericCharacters));
        passwordLength--;
    }
    //If user has selected special characters, add those to source array
    if (options[4] === true) {
        sourceArray = sourceArray.concat(specialCharacters);
        //Ensure at least one special character is added to the password
        passwordArray.push(getRandom(specialCharacters));
        passwordLength--;
    }

    while (passwordLength>0) {
        //Select random characters to fill rest of password
        passwordArray.push(getRandom(sourceArray));
        passwordLength--;
    }
    return randomiseString(passwordArray);
  }  

  function randomiseString(arr) {
    let randomString = "";
    let stringLength = arr.length;
    while (stringLength>0) {
        //Select a random character from source array
        let randomIndex = Math.floor(Math.random()*stringLength);
        //Add to randomised password
        randomString+=arr[randomIndex];
        //Remove that character from the source array
        arr.splice(randomIndex, 1);
        stringLength--;
    }
    return randomString;
  }
  // Get references to the #generate element
  var generateBtn = document.querySelector('#generate');
  
  // Write password to the #password input
  function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector('#password');
  
    passwordText.value = password;
  }
  
  // Add event listener to generate button
  generateBtn.addEventListener('click', writePassword);