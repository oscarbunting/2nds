// Get the input field, button, and result element
const input = document.getElementById('names');
const button = document.getElementById('calculate-button');
const resultElement = document.getElementById('result');

// Add an event listener to the button that
// runs the calculate function when clicked
button.addEventListener('click', calculate);

// A variable to store the previous result
let previousResult;

// The calculate function gets the names from the input
// field, calculates who gets the joint next, and
// updates the page with the result
function calculate() {
  // Get the names from the input field
  const names = input.value.split(',');

  // Use a random algorithm to calculate who gets the joint next
  // Call the random function and store the result in a variable
  let result = random(names);

  // Check if the result is the same as the previous result
  // If it is, call the random function again until a different result is returned
  while (result === previousResult) {
    result = random(names);
  }

  // Update the page with the result
  resultElement.innerHTML = `Next up: ${result}`;
  resultElement.classList.add('highlight');

  // Add the result to the history
  addToHistory(result);

  // Store the result in a variable for the next time the function is called
  previousResult = result;
}

// The addToHistory function adds the result to the history
// list at the bottom of the page
function addToHistory(result) {
  // Create a new list item with the result
  const item = document.createElement('li');
  item.innerHTML = result;

  // Add the item to the history list
  const history = document.getElementById('history');
  history.appendChild(item);
}

// The random function takes an array of names and
// returns a random name from the array
function random(names) {
  // Generate a random index based on the length of the array
  const index = Math.floor(Math.random() * names.length);
  // Return the name at the random index
  return names[index];
}
