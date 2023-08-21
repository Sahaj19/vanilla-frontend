//**********************************************************************************/

//selecting result area elements
let result_Span = document.querySelector("#result");
let copy_button = document.querySelector("#copyBtn");

//selecting checkboxes
let password_length_input = document.querySelector("#Passlength");
let uppercase_checkbox = document.querySelector("#uppercase");
let lowercase_checkbox = document.querySelector("#lowercase");
let numbers_checkbox = document.querySelector("#numbers");
let symbols_checkbox = document.querySelector("#symbols");

//selecting password generator button
let password_generator_button = document.querySelector("#generate-password");

//**********************************************************************************/

//function generating random lowercase letter
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//function generating random uppercase letter
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//function generating random number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//function generating random symbol
function getRandomSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 7) + 58);
}

//**********************************************************************************/
//Bvalue === boolean value
password_generator_button.addEventListener("click", () => {
  let password_length = Number(password_length_input.value);
  let upper_Bvalue = uppercase_checkbox.checked;
  let lower_Bvalue = lowercase_checkbox.checked;
  let number_Bvalue = numbers_checkbox.checked;
  let symbol_Bvalue = symbols_checkbox.checked;

  //generatePassword function takes all these values as arguments
  result_Span.innerText = generatePassword(
    upper_Bvalue,
    lower_Bvalue,
    number_Bvalue,
    symbol_Bvalue,
    password_length
  );
});

//**********************************************************************************/

let final_password = "";
function generatePassword(upper, lower, number, symbol, length) {
  //only the function reference with truthy value get stored in the checked_array
  let checked_array = [];
  if (upper) checked_array.push(getRandomUpper);
  if (lower) checked_array.push(getRandomLower);
  if (number) checked_array.push(getRandomNumber);
  if (symbol) checked_array.push(getRandomSymbol);

  if (checked_array.length === 0) {
    return "";
  }

  let Result = "";
  //invoking truthy functions through func callback function
  //their returned values gets appended in the result variable.
  for (let i = 0; i < length; i++) {
    checked_array.forEach((func) => {
      Result = Result + func();
    });
  }

  //slicing, because the loop runs through each checkbox function as many times as the provided length.
  //in small screens , input is not working!!
  if (length < 4 || length > 16) {
    final_password = "";
    notification.style.backgroundColor = "rgb(160,0,0)";
    toast_notification("Valid password length : [4,16]");
  } else {
    final_password = Result.slice(0, length);
  }
  return final_password;
}

//**********************************************************************************/

//copy button functionality
let notification = document.querySelector(".notification");

function toast_notification(message) {
  notification.innerText = message;
  notification.classList.remove("notification");
  notification.classList.add("active");
  setTimeout(() => {
    notification.classList.remove("active");
    notification.classList.add("notification");
  }, 1500);
}

copy_button.addEventListener("click", async () => {
  if (result_Span.innerText === "") {
    notification.style.backgroundColor = "rgb(160,0,0)";
    toast_notification("Generate a password first!");
  } else {
    try {
      await window.navigator.clipboard.writeText(final_password);
      notification.style.backgroundColor = "green";
      toast_notification("Password copied successfully!");
    } catch {
      toast_notification("Copy error.Retry.");
    }
  }
});

//**********************************************************************************/
