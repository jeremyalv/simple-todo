let taskList = [];

const controlApp = function (event) {
  // Using event bubbling to chain multiple callback functions when a button is clicked
  if (event.target.classList.contains("submit")) {
    // console.log("Running controlApp...");

    // Reads the value from input box
    const input = document.querySelector(".input");
    const inputValue = input.value;

    // If inputValue is not an empty string, execute the functions below.
    if (inputValue) {
      storeInputValue(inputValue);
      appendToList(taskList);
      showTaskList();
      // console.log("controlApp finished running");
      // console.log(taskList);
    }
  }
};

function storeInputValue(inputValue) {
  // If inputValue is an empty string, then do nothing.
  if (!inputValue) return;

  // Appends inputValue to data structure
  taskList.push(inputValue);
  document.querySelector(".input").value = "";
  // console.log(taskList, "storeInputValue run");
}

function appendToList(taskList) {
  // We use Array.length - 1 instead of .pop() because it does not modify the original array.
  const task = taskList[taskList.length - 1];
  // console.log(task);
  const node = document.createElement("li");
  const textnode = document.createTextNode(task);
  node.appendChild(textnode);
  document.querySelector(".task-list").appendChild(node);
}

function showTaskList() {
  // Select the HTML element
  const ul = document.querySelector(".task-list");
  let classes = Object.values(ul.classList);
  // console.log(classes, typeof classes);
  // Remove the 'hidden' class from our list
  if (classes.includes("hidden")) {
    ul.classList.remove("hidden");
  }
}

function init() {
  // Whenever we click the "Submit" button, we append the input value to taskList.
  // document.addEventListener("click", controlApp);
  document.querySelector(".submit").addEventListener("click", controlApp);
}

init();
