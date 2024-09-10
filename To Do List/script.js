const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value == "") alert("Add a task to continue!");
  else {
    //Add list element
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    //add delete task btn
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  //clear input field
  inputBox.value = "";

  saveData();
}

//Enter key is pressed
inputBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask(); 
    }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

//save data in browser
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
//fetches stored data from browser and displays it
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
