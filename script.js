import { $, ENTER_KEYCODE, CROSS_HEX, CHECK_HEX, CROSS_ITEM_CLASSNAME, CHECK_ITEM_CLASSNAME } from './config.js';

let taskList = [];

// Controller Functions
function controlSubmit (event) {
  // Using event bubbling to chain multiple callback functions within a single event when a button is clicked
  if (event.target.classList.contains("submit") || event.target.classList.contains('input')) {
    // Reads the value from input box
    const inputValue = $(".input").value;

    // If inputValue is not an empty string, execute the functions below.
    if (inputValue) {
      // Adds the task to our data structure and renders it to the DOM.
      storeInputValue(inputValue);
      const taskName = getTaskName(taskList);
      createListItem(taskName);
      showTaskList();
    }
  }
};

function controlClearList (event) {
  // Using event bubbling to chain multiple callback functions when a button is clicked
  if (event.target.classList.contains('clear-list')) {
    clearTaskList();
    hideTaskList();
  }
};

function controlPressedEnter(event) {
  const inputValue = $(".input").value;
  if (event.keyCode === ENTER_KEYCODE && inputValue) {
    controlSubmit(event);
  }
}

function controlRemoveListItem(event) {
  // If there is 1 task remaining in taskList, when we delete it we would also delete clear the task list. We wouldn't want to have a section of the page that contains nothing (because it would be empty after we deleted all tasks)
  if (taskList.length === 1) {
    clearTaskList();
    return;
  }

  removeListItem(event);
}

// Worker functions
function storeInputValue(inputValue) {
  // If inputValue is an empty string, then do nothing.
  if (!inputValue) return;

  // Appends inputValue to data structure
  taskList.push(inputValue);

  // Empties the text in the input box
  $(".input").value = "";
}

function getTaskName(taskList) {
  // We use Array.length - 1 instead of .pop() because it does not modify the original array.
  const lastItemIndex = taskList.length - 1;
  return taskList[lastItemIndex];
}

function clearTaskList() {
  for (let i = 0; i < taskList.length; ++i) {
    // Clear the HTML Elements one by one
    const parent = $('.tasks').getElementsByTagName("ul")[0];
    const child = parent.getElementsByTagName('li')[0];
    
    // Remove child element
    parent.removeChild(child);
  }
  
  // Set the taskList array back to empty
  taskList = [];
}

function createListItem(taskName) {
  // Select Targeted HTML Element
  const ul = $('.task-list');

  // Create a list item that's meant for a single task
  const li = document.createElement("li");

  // Add the task name to the list item
  const textnode = document.createTextNode(taskName);
  li.appendChild(textnode);

  // Since these elements are added dynamically, we must embed an onclick and it's callback function so the app runs just as we expected.
  
  // Create a cross button
  const cross = document.createElement('button');
  cross.innerHTML = CROSS_HEX;
  cross.setAttribute('class', CROSS_ITEM_CLASSNAME)
  cross.setAttribute('id', `cross-${taskList.length}`)
  li.appendChild(cross);
  cross.onclick = controlRemoveListItem;

  // Create a checkmark button
  const check = document.createElement('button');
  check.innerHTML = CHECK_HEX;
  check.setAttribute('class', CHECK_ITEM_CLASSNAME)
  check.setAttribute('id', `check-${taskList.length}`)
  li.appendChild(check);
  check.onclick = controlRemoveListItem;

  // Append the list item to the DOM
  li.setAttribute('class', 'list-item')
  li.setAttribute('id', `item-${taskList.length}`)
  ul.appendChild(li);
}

function removeListItem(event) {
  // Retrieves target element's id
  let id = event.currentTarget.id;

  // Selects the element we want to start from -- in this case, the button.
  const button = document.getElementById(id);

  // Delete the element -- traverses up the node tree twice (button -> li -> ul) and delete child (li)
  const li = button.parentNode;

  // Store the id of the list item that we want to delete
  const listID = document.getElementById(li.id);

  // Remove the last two characters from the string returned by listID.innerText (those two are the cross and check symbols)
  const taskName = listID.innerText.slice(0, -2);

  // Removes the li
  li.parentNode.removeChild(li);
}

function showTaskList() {
  // Select the HTML element
  const ul = $(".task-list");
  let classes = Object.values(ul.classList);

  // Remove the 'hidden' class from our list
  if (classes.includes("hidden")) {
    ul.classList.remove("hidden");
  }
}

function hideTaskList() {
  // Select the HTML element
  const ul = $(".task-list");
  let classes = Object.values(ul.classList);
  // Remove the 'hidden' class from our list
  if (!classes.includes("hidden")) {
    ul.classList.add("hidden");
  }
}


// Initialization function
function init() {
  // Whenever we click the "Submit" button, we append the input value to taskList.
  $(".submit").addEventListener("click", controlSubmit);

  // When we click the "Clear List" button, delete all the items in taskList and re-render the DOM.
  $(".clear-list").addEventListener("click", controlClearList);

  // When we press Enter, do the same functionality as when the "submit" button is clicked
  $('.input').addEventListener('keyup', controlPressedEnter);
}

// Run the app
init();
