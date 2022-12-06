const input = document.getElementById('names');
const button = document.getElementById('calculate-button');
const resultElement = document.getElementById('result');

button.addEventListener('click', calculate);

let previousResult;
const called = [];

function calculate() {
  const names = input.value.split(',');
  let result = random(names);

  while (result === previousResult || called.includes(result)) {
    result = random(names);
  }

  resultElement.innerHTML = `Next up: ${result}`;
  resultElement.classList.add('highlight');
  addToHistory(result);
  previousResult = result;
  
  called.push(result);
  
  if (called.length === names.length) {
    called.length = 0;
  }
  
  // Save the history to a cookie
  saveHistoryToCookie();
}

function addToHistory(result) {
  const item = document.createElement('li');
  item.innerHTML = result;

  const history = document.getElementById('history');
  history.appendChild(item);
}

function random(names) {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
}

// Function to save the history to a cookie
function saveHistoryToCookie() {
  // Get the history list
  const historyList = document.getElementById('history');
  // Convert the history list to a string
  const historyString = historyList.innerHTML;
  // Create a date object to set the expiration date of the cookie
  const date = new Date();
  // Set the expiration date to one year from now
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  // Set the cookie with the history string and expiration date
  document.cookie = `history=${historyString}; expires=${date.toUTCString()}`;
}

// Function to load the history from a cookie
function loadHistoryFromCookie() {
  // Get the history cookie
  const historyCookie = document.cookie.replace(/(?:(?:^|.*;\s*)history\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  // If the cookie exists, update the history list with the saved history
  if (historyCookie) {
    document.getElementById('history').innerHTML = historyCookie;
  }
}

// Call the loadHistoryFromCookie function when the page loads
window.onload = function() {
  loadHistoryFromCookie();
};
