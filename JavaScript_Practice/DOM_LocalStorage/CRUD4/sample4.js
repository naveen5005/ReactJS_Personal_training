function uniqueIdentifier() {
    return Math.random().toString(36).substring(2,);
}
function returnObj() {
    return {
        player_id: "",
        player_name: "",
        team: "",
        batting_stats: {
            runs: "",
            centuries: "",
            half_centuries: "",
            average: ""
        },
        bowling_stats: {
            wickets: "",
            overs_bowled: "",
            economy_rate: ""
        }
    }
}
function readDataFromFORM() {
    var data = returnObj();
    for (a in data) {
        if (a == "player_id") {
            data[a] = document.getElementById(a).value === "" ? uniqueIdentifier() : document.getElementById(a).value;
        } else if (a !== "batting_stats" && a !== "bowling_stats") {
            data[a] = document.getElementById(a).value;
        } else {
            for (b in data[a]) {
                data[a][b] = document.getElementById(b).value;
            }
        }
    }
    return data;
}
let crud4_array = JSON.parse(localStorage.getItem("LS_CRUD4"));
if (!crud4_array) crud4_array = [];
addPlayer = () => {
    var data = readDataFromFORM();
    crud4_array.push(data);
    localStorage.setItem("LS_CRUD4", JSON.stringify(crud4_array));
    clearForm();
    displayPlayers();
}
createDynamicBtns = (text, target, event, data, i) => {
    var Td = document.createElement("td");
    var Button = document.createElement("button");
    Button.innerHTML = text;
    Button.addEventListener("click", function () {
        event(data, i);
    });
    Td.appendChild(Button);
    target.appendChild(Td);
}
function displayPlayers() {
    document.querySelector("tbody").innerHTML = "";
    crud4_array.forEach((data, i) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            if (a !== "batting_stats" && a !== "bowling_stats") {
                myTd.innerHTML = data[a];
                myTr.appendChild(myTd);
            } else {
                for (b in data[a]) {
                    var myInnerTd = document.createElement("td");
                    myInnerTd.innerHTML = data[a][b];
                    myTr.appendChild(myInnerTd);
                }
            }
        }
        createDynamicBtns("EDIT", myTr, editPlayer, data, i);
        createDynamicBtns("DELETE", myTr, deletePlayer, data);
        document.querySelector("tbody").appendChild(myTr);
    })
}
displayPlayers();
let updateIndex = null;
let addToggle = document.getElementById("addStats");
let updateToggle = document.getElementById("updateStats");
function editPlayer(data, i) {
    updateIndex = i;
    for (a in data) {
        if (a !== "batting_stats" && a !== "bowling_stats") {
            document.getElementById(a).value = data[a];
        } else {
            for (b in data[a]) {
                document.getElementById(b).value = data[a][b];
            }
        }
    }
    addToggle.setAttribute("style","display:none");
    updateToggle.setAttribute("style","display:block");
}
updatePlayer = () => {
    var data = readDataFromFORM();
    crud4_array[updateIndex] = data;
    localStorage.setItem("LS_CRUD4",JSON.stringify(crud4_array));
    displayPlayers();
    clearForm();
    addToggle.setAttribute("style","display:block");
    updateToggle.setAttribute("style","display:none");
}
function deletePlayer(data) {
    crud4_array = crud4_array.filter((element) => element.player_id !== data.player_id)
    localStorage.setItem("LS_CRUD4", JSON.stringify(crud4_array));
    displayPlayers();
}
function clearForm() {
    var data = returnObj();
    for (a in data) {
        if (a == "player_id") {
            document.getElementById(a).value = "";
        } else if (a !== "batting_stats" && a !== "bowling_stats") {
            document.getElementById(a).value = "";
        } else {
            for (b in data[a]) {
                document.getElementById(b).value = "";
            }
        }
    }
}