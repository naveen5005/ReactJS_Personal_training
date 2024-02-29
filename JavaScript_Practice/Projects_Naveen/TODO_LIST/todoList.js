function returnObj() {
    return {
        task: ""
    }
}
function readDataFromFORM() {
    var data = returnObj();
    for (a in data) {
        data[a] = document.getElementById(a).value;
    }
    return data;
}
function getDate() {
    var currentDate = new Date();
    // Get the current year, month, and day
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Months are zero-indexed, so January is 0
    var day = currentDate.getDate();
    return year + "-" + month + "-" + day;
}
addTasks = () => {
    const data = readDataFromFORM();
    data["date"] = getDate();
    console.log(data);
    commonServerCommunication("POST", data);
}

dynamicBtns = (text, target, event, obj) => {
    const spanDelete = document.createElement("span");
    spanDelete.setAttribute("class", "material-symbols-outlined");
    spanDelete.innerHTML = text;
    spanDelete.setAttribute("id", text + "-button");
    spanDelete.addEventListener(("click"), function () {
        event(obj)
    })
    target.appendChild(spanDelete);
}
displayTasks = () => {
    allTasks.forEach((task, i) => {
        const wrapperElement = document.createElement("div");
        wrapperElement.classList.add("wrapper-task-details");
        const taskNumber = document.createElement("h3");
        taskNumber.innerHTML = "task " + (i + 1);

        const dateDetails = document.createElement("p");
        dateDetails.innerHTML = task.date;

        const taskDetails = document.createElement("p");
        taskDetails.classList.add("taskDetails")
        taskDetails.innerHTML = task.task;

        const wrapperElement_Edit_Delete = document.createElement("div");
        wrapperElement_Edit_Delete.classList.add("edit_delete_wrapper");
        dynamicBtns("edit_square", wrapperElement_Edit_Delete, editTask, task);
        dynamicBtns("delete", wrapperElement_Edit_Delete, deleteTask, task);

        wrapperElement.appendChild(taskNumber);
        wrapperElement.appendChild(dateDetails);
        wrapperElement.appendChild(taskDetails);
        wrapperElement.appendChild(wrapperElement_Edit_Delete);

        document.querySelector(".task-list").appendChild(wrapperElement);
    })
}
let allTasks = []

displayTasks();

commonServerCommunication = async (method, payload) => {
    method === "GET" || method === "POST" ? url = "http://localhost:3000/allTasks" : url = "http://localhost:3000/allTasks/" + payload.id;
    allTasks = await (await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: method === "POST" || method === "PUT" ? JSON.stringify(payload) : null
    })).json();
    displayTasks();
}

commonServerCommunication("GET");

deleteTask = (task) => {
    commonServerCommunication("DELETE", task);
}

let addToggle = document.getElementById("addTask");
let updateToggle = document.getElementById("updateTask");

let updateIndex = null;
editTask = (task) => {
    console.log(task)
    updateIndex = task.id;
    for (a in task) {
        if (a === "task") {
            document.getElementById(a).value = task[a];
        }
    }
    addToggle.setAttribute("style","display:none");
    updateToggle.setAttribute("style","display:block");
}

updateTasks = () =>{
    var data = readDataFromFORM();
    data["id"] = updateIndex;
    data["date"] = getDate();
    commonServerCommunication("PUT",data);
    addToggle.setAttribute("style","display:block");
    updateToggle.setAttribute("style","display:none");
}