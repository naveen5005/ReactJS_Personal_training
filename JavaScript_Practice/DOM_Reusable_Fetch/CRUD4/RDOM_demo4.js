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
function readDataFromFOM() {
    var data = returnObj();
    for (a in data) {
        if (a == "player_id") {
            data[a] = document.getElementById(a).value === "" ? uniqueIdentifier() : document.getElementById(a).value;
        }
        else if (a !== "bowling_stats" && a !== "batting_stats") {
            data[a] = document.getElementById(a).value;
        } else {
            for (b in data[a]) {
                data[a][b] = document.getElementById(b).value
            }
        }
    }
    return data;
}

createDynamicTh = (text, target) => {
    var Th = document.createElement("th");
    Th.innerHTML = text,
        Th.setAttribute("rowspan", "2");
    target.appendChild(Th);
}
createDynamicButtons = (text, target, event, obj) => {
    var myBtnTd = document.createElement("td");
    var myBtn = document.createElement("button");
    myBtn.innerHTML = text;
    myBtn.setAttribute("type", "button");
    myBtn.addEventListener("click", function () {
        event(obj);
    })
    myBtnTd.appendChild(myBtn);
    target.appendChild(myBtnTd);
}
commonPlayersDataDisplay = (cell, target, obj) => {
    var myTr = document.createElement("tr");
    var myInnerTr = document.createElement("tr");
    for (a in obj) {
        if (a !== "batting_stats" && a !== "bowling_stats") {
            var myTh = document.createElement(cell);
            myTh.innerHTML = cell === "th" ? a : obj[a];
            cell === "th" ? myTh.setAttribute("rowspan", "2") : null;
            myTr.appendChild(myTh);
        } else if (a === "batting_stats" || a === "bowling_stats") {
            if (cell === "th") {
                var myTh = document.createElement(cell);
                myTh.innerHTML = a;
                myTh.setAttribute("colspan", a === "bowling_stats" ? "3" : "4");
                for (b in obj[a]) {
                    var myInnerTh = document.createElement(cell);
                    myInnerTh.innerHTML = b;
                    myInnerTr.appendChild(myInnerTh);
                }
                myTr.appendChild(myTh);
            } else {
                for (b in obj[a]) {
                    var myInnerTh = document.createElement(cell);
                    myInnerTh.innerHTML = obj[a][b];
                    myTr.appendChild(myInnerTh);
                }
            }
        }
    }
    if (cell === "th") {
        createDynamicTh("EDIT", myTr);
        createDynamicTh("DELETE", myTr);
        document.querySelector(target).appendChild(myTr);
        document.querySelector(target).appendChild(myInnerTr);
    } else {
        createDynamicButtons("Edit", myTr, editPlayer, obj);
        createDynamicButtons("Delete", myTr, deletPlayer, obj);
        document.querySelector(target).appendChild(myTr);
    }

}
let results = [];
displayPlayers = () => {
    commonPlayersDataDisplay("th", "thead", results[0]);
    results.forEach((player) => {
        commonPlayersDataDisplay("td", "tbody", player);
    })
}
commonServerCommunication = async (method, payload) => {
    method === "GET" || method === "POST" ? url = "http://localhost:3000/demo4" : url = "http://localhost:3000/demo4/" + payload.player_id;
    results = await (await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: method ==="PUT" || method ==="POST" ? JSON.stringify(payload) : null
    })).json();
    displayPlayers();
}
commonServerCommunication("GET");
const addToggle = document.getElementById("addStats");
const updateToggle = document.getElementById("updateStats");
editPlayer = (player) => {
    for (a in player) {
        if (a !== "batting_stats" && a !== "bowling_stats") {
            document.getElementById(a).value = player[a];
        } else {
            for (b in player[a]) {
                document.getElementById(b).value = player[a][b];
            }
        }
    }
    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");
}
deletPlayer = (player) => {
    commonServerCommunication("DELETE", player);
}
updatePlayer = () => {
    var data = readDataFromFOM();
    commonServerCommunication("PUT",data);
    addToggle.setAttribute("style", "display:block");
    updateToggle.setAttribute("style", "display:none");
}

addPlayer = () =>{
    var data = readDataFromFOM();
    commonServerCommunication("POST",data);
}