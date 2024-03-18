const inputBox = document.querySelector(".inputBox");
const lists = document.querySelector(".todos");
const add = document.querySelector(".add");
const clr = document.querySelector(".ac");

let counter = 1; //helps in naming id's of li elements

// pulling existing data from local storage
get();

add.addEventListener("click", () => {
  if (inputBox.value === "") {
    alert("Please enter something!");
  } else {
    let li = document.createElement("li");

    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `list${counter}`);

    let label = document.createElement("label");
    label.setAttribute("for", `list${counter}`);
    label.innerText = inputBox.value;

    let button = document.createElement("button");
    button.setAttribute("class", "del");
    button.innerText = "x";

    //   saving in local storage
    save(inputBox.value);

    lists.append(li);
    li.append(input);
    li.append(label);
    li.append(button);
    counter++;
    inputBox.value = "";
  }
});

// event delegation
lists.addEventListener("click", (e) => {
  if (e.target.innerText === "x") {
    deleteFromStorage(e.target.parentElement);
    e.target.parentElement.remove();
  }
});

clr.addEventListener("click", () => {
    lists.remove();

    // clearing from storage too
    clearAll();
})


// NOW MAKE IT SOLVE LOCALLY
function save(inputBoxValue) {
  // checking existing local storage
  let array;
  if (localStorage.getItem("array") == null) {
    array = [];
  } else {
    array = JSON.parse(localStorage.getItem("array"));
  }

  // console.log()
  array.push(inputBoxValue);
  localStorage.setItem("array", JSON.stringify(array));
}

// deleting from local storage
function deleteFromStorage(li) {
  // checking existing local storage
  let array;
  if (localStorage.getItem("array") == null) {
    array = [];
  } else {
    array = JSON.parse(localStorage.getItem("array"));
  }

  let labelText = li.children[1].innerText;
  let labelIndex = array.indexOf(labelText);

  array.splice(labelIndex, 1);

  localStorage.setItem("array", JSON.stringify(array));
}

// getting existing data from the local storage
function get() {
  // checking for local storage
  let array;
  if (localStorage.getItem("array") == null) {
    array = [];
  } else {
    array = JSON.parse(localStorage.getItem("array"));
  }

  array.forEach((element) => {
    let li = document.createElement("li");

    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `list${counter}`);

    let label = document.createElement("label");
    label.setAttribute("for", `list${counter}`);

    label.innerText = element;

    let button = document.createElement("button");
    button.setAttribute("class", "del");
    button.innerText = "x";

    lists.append(li);
    li.append(input);
    li.append(label);
    li.append(button);
    counter++;
  });

  localStorage.setItem("array", JSON.stringify(array));
}

// clear all
function clearAll (){
    localStorage.clear();
}