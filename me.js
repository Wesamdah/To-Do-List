let input = document.querySelector(".value");
let divTasks = document.querySelector(".tasks");
let number = document.querySelector(".number");

// window.localStorage.clear();

let taskArray = [];
if (window.localStorage.getItem("tasks")) {
  taskArray = JSON.parse(window.localStorage.getItem("tasks"));
}

getLocal();

function getDate() {
  let h3 = document.querySelector(".date");
  let date = new Date();
  date = date.toString().split(" ");
  h3.appendChild(
    document.createTextNode(`${date[0]} ${date[1]} ${date[2]} ${date[3]}`)
  );
}

window.onload = () => {
  getDate();
  input.focus();
  number.appendChild(document.createTextNode(taskArray.length));
};

document.querySelector(".add").addEventListener("click", () => {
  if (input.value !== "") {
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].title == input.value) {
        let black = document.createElement("div");
        black.className = "black";
        document.body.appendChild(black);
        let same = document.createElement("div");
        same.className = "same";
        let contSame = document.createElement("div");
        contSame.className = "cont-same";
        let h2 = document.createElement("h2");
        h2.className = "text-same";
        h2.appendChild(document.createTextNode("You Have Added This Task"));
        let btnSame = document.createElement("button");
        btnSame.className = "btn-same";
        btnSame.appendChild(document.createTextNode("OK"));
        contSame.appendChild(h2);
        contSame.appendChild(btnSame);
        same.appendChild(contSame);
        document.body.appendChild(same);
        if (same.innerHTML !== "") {
          divTasks.style.cssText = " display: none";
          let ok = document.querySelector(".btn-same");
          ok.onclick = function () {
            divTasks.style.cssText = " display: block";
            same.remove();
            black.remove();
          };
        }
      }
    }
    setArray(input.value);
    input.focus();
    input.value = "";
  } else {
    let cover = document.createElement("div");
    cover.className = "black";
    document.body.appendChild(cover);
    let alert = document.createElement("div");
    alert.className = "alert";
    let text = document.createElement("div");
    text.className = "text";
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode("Please Enter At Least One Task"));
    let btn = document.createElement("button");
    btn.className = "ok";
    btn.appendChild(document.createTextNode("OK"));
    text.appendChild(h2);
    text.appendChild(btn);
    alert.appendChild(text);
    document.body.appendChild(alert);
    if (alert.innerHTML !== "") {
      let ok = document.querySelector(".ok");
      ok.onclick = function () {
        alert.remove();
        cover.remove();
      };
    }
  }
});

document.querySelector(".clear").onclick = function (e) {
  divTasks.innerHTML = "";
  window.localStorage.clear();
  location.reload();
};

divTasks.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn2")) {
    event.target.parentElement.parentElement.remove();
    removeLocal(
      event.target.parentElement.parentElement.getAttribute("data-id")
    );
  }
  if (event.target.classList.contains("btn1")) {
    event.target.parentElement.parentElement.classList.toggle("done");
    setState(event.target.parentElement.parentElement.getAttribute("data-id"));
  }
});

function setArray(tasks) {
  let task = {
    id: Date.now(),
    title: tasks,
    completed: false,
  };
  taskArray.push(task);
  setLocal(taskArray);
  setTask(taskArray);
}

function setTask(taskArray) {
  divTasks.innerHTML = "";
  taskArray.forEach((element) => {
    let div = document.createElement("div");
    div.className = "task";
    if (element.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", element.id);
    div.appendChild(document.createTextNode(element.title));
    let div_2 = document.createElement("div");
    div_2.className = "edit";
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    span1.className = "btn1";
    span2.className = "btn2";
    span1.appendChild(document.createTextNode("Done"));
    span2.appendChild(document.createTextNode("Delete"));
    div_2.appendChild(span1);
    div_2.appendChild(span2);
    div.appendChild(div_2);
    divTasks.appendChild(div);
  });
}

function setLocal(taskArray) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArray));
  // location.reload();
}

function getLocal() {
  let date = window.localStorage.getItem("tasks");
  if (date) {
    task = JSON.parse(date);
    setTask(task);
  }
}

function removeLocal(taskid) {
  taskArray = taskArray.filter((event) => event.id != taskid);
  setLocal(taskArray);
}

function setState(taskid) {
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == taskid) {
      taskArray[i].completed == false
        ? (taskArray[i].completed = true)
        : (taskArray[i].completed = false);
    }
  }
  setLocal(taskArray);
}
