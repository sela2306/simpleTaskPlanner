// Initialize TaskManager class
const newTaskManager = new TaskManager();
// task form elements
const newTaskName = document.querySelector("#newTask-name");
const newTaskDescription = document.querySelector("#newTask-description");
const newTaskAssignedTo = document.querySelector("#newTask-assigned-to");
const newTaskDate = document.querySelector("#newTask-date");
const newTaskStatus = document.querySelector("#newTask-status");
// button elements
const btnMainAddNewTask = document.querySelector("#btnMainAddNewTask");
const btnNewTaskAdd = document.querySelector("#btnNewTaskAdd");
const btnNewTaskReset = document.querySelector("#btnNewTaskReset");

// field validation span elements
let inValidFeedback1 = document.querySelector(".in-valid-feedback1");
let inValidFeedback2 = document.querySelector(".in-valid-feedback2");
let inValidFeedback3 = document.querySelector(".in-valid-feedback3");
let inValidFeedback4 = document.querySelector(".in-valid-feedback4");
let inValidFeedback5 = document.querySelector(".in-valid-feedback5");

let isValidCount = 0;

// validate input fields
function validateInput(event, feedbackEvent, inputType) {
  switch (inputType) {
    case "text":
      {
        if (event.value.length <= 5) {
          console.log("task name not valid");
          feedback(feedbackEvent, "text", "invalid");
          isValidCount++;
        } else {
          feedback(feedbackEvent, "text", "valid");
        }
      }
      break;
    case "date":
      {
        let userDate = new Date(event.value);
        // get current date
        const d = new Date();
        let userMonth = userDate.getMonth() + 1;
        let nowYear = d.getFullYear();
        let nowDate = d.getDate();
        let nowMonth = d.getMonth() + 1;
        let inValidDate = false;

        if (userDate.getFullYear() < nowYear) {
          inValidDate = false;
          console.log("invalid year");
        } else if (userMonth < nowMonth) {
          inValidDate = false;
        } else if (userMonth === nowMonth && userDate.getDate() < nowDate) {
          console.log("invalid date");
          inValidDate = false;
        } else {
          console.log("valid everything");
          inValidDate = true;
        }

        if (inValidDate) {
          feedback(feedbackEvent, inputType, "valid");
        } else {
          feedback(feedbackEvent, inputType, "invalid");
          isValidCount++;
        }
      }
      break;
    case "status":
      {
        if (event.value === "") {
          feedback(feedbackEvent, inputType, "invalid");
          isValidCount++;
        } else {
          feedback(feedbackEvent, inputType, "valid");
        }
      }
      break;
  }
}

// add valid/invalid feedback to span element for form fields
function feedback(event, inputType, feedbackType) {
  if (feedbackType === "invalid") {
    event.style.color = "red";
    switch (inputType) {
      case "text":
        event.innerText = "* Task name should be more than 5 characters";
        break;
      case "date":
        event.innerText = "* Please select a date";
        break;
      case "status":
        event.innerText = "* Please select an option";
        break;
      default:
        event.innerText = "";
    }
  }

  if (feedbackType === "valid") {
    event.style.color = "green";
    event.innerHTML = `Looks good!<i class="bi-check2"></i>`;
  }
}

// function to validate form fields and render task
function validFormFieldInput(event) {
  let newTaskNameVal = newTaskName.value;
  let newTaskDescriptionVal = newTaskDescription.value;
  let newTaskAssignedToVal = newTaskAssignedTo.value;
  let newTaskDateVal = newTaskDate.value;
  let newTaskStatusVal = newTaskStatus.value;

  console.log(`new task name - ${newTaskNameVal}`);
  console.log(`new task description - ${newTaskDescriptionVal}`);
  console.log(`new task assigned-to - ${newTaskAssignedToVal}`);
  console.log(`new task date - ${newTaskDateVal}`);
  console.log(`new task status - ${newTaskStatusVal}`);

  event.preventDefault();

  validateInput(newTaskName, inValidFeedback1, "text");
  validateInput(newTaskDescription, inValidFeedback2, "text");
  validateInput(newTaskAssignedTo, inValidFeedback3, "text");
  validateInput(newTaskDate, inValidFeedback4, "date");
  validateInput(newTaskStatus, inValidFeedback5, "status");

  if (isValidCount === 0) {
    //  formatting date dd/mm/yyyyHTML
    const formattedDate = newTaskDateVal.split("-");
    let newDate = `${formattedDate[2]}/${formattedDate[1]}/${formattedDate[0]}`;

    // add task to the array
    newTaskManager.addTask(
      newTaskNameVal,
      newTaskDescriptionVal,
      newTaskAssignedToVal,
      newDate,
      newTaskStatusVal
    );
    console.log(newTaskManager.tasks);
    // reset form to make ready for next task input
    resetFormFieldInput();
    // create the html for diplaying the tasks
    const taskHtml = newTaskManager.createTaskHtml(
      newTaskNameVal,
      newTaskDescriptionVal,
      newTaskAssignedToVal,
      newDate,
      newTaskStatusVal
    );
    newTaskManager.render();
    console.log(taskHtml);
  } else {
    isValidCount = 0;
  }
}

// reset all form input fields
function resetFormFieldInput() {
  isValidCount = 0;
  newTaskName.value = "";
  newTaskDescription.value = "";
  newTaskAssignedTo.value = "";
  newTaskDate.value = "";
  newTaskStatus.value = "";

  resetFeedbackSpan(inValidFeedback1, "Enter more than 5 characters");
  resetFeedbackSpan(inValidFeedback2, "Enter more than 5 characters");
  resetFeedbackSpan(inValidFeedback3, "Enter more than 5 characters");
  resetFeedbackSpan(inValidFeedback4, "");
  resetFeedbackSpan(inValidFeedback5, "");
  function resetFeedbackSpan(event, text) {
    event.innerText = text;
    event.style.color = "";
  }
}

// call validation function when Add Task button is clicked
btnNewTaskAdd.addEventListener("click", (event) => validFormFieldInput(event));
// call reset function when reset button is clicked
btnNewTaskReset.addEventListener("click", resetFormFieldInput);

// Clear form when closed( X button is clicked) if form is half-filled
var myModal = document.getElementById("staticBackdrop");
myModal.addEventListener("hidden.bs.modal", function (event) {
  // clear form
  resetFormFieldInput();
});
