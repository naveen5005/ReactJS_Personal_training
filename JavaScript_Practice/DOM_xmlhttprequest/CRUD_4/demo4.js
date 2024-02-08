function uniqueId() {
    let random = Math.random().toString(36).substring(2, 12);
    return random;
}

function returnObj() {
    return {
        id: "",
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
    console.log(data)
    for (a in data) {
        if (a == "id") {
            data[a] = uniqueId();
        }
        else if (a !== "batting_stats" && a != "bowling_stats") {
            data[a] = document.getElementById(a).value;
        }
        else {
            for (b in data[a]) {
                data[a][b] = document.getElementById(b).value;
            }
        }
    }
    return data;
}
function readDataFromFOMUpdate() {
    var data = returnObj();
    console.log(data)
    for (a in data) {
        if (a == "id") {
            data[a] = document.getElementById(a).value;
        }
        else if (a !== "batting_stats" && a != "bowling_stats") {
            data[a] = document.getElementById(a).value;
        }
        else {
            for (b in data[a]) {
                data[a][b] = document.getElementById(b).value;
            }
        }
    }
    return data;
}

addPlayer = () => {
    var data = readDataFromFOM();
    var postData = new XMLHttpRequest();
    postData.open("POST", "http://localhost:3000/demo4");
    postData.setRequestHeader("Content-Type", "Application/json");
    postData.send(JSON.stringify(data));
}

let players = []
function getDataFromAPI() {
    var getData = new XMLHttpRequest();
    getData.open("GET", "http://localhost:3000/demo4");
    getData.send();
    getData.onreadystatechange = function () {
        if (getData.readyState == 4 && getData.status == 200) {
            players = JSON.parse(getData.response);
            displayPlayers(players);
        }
    }
}
getDataFromAPI();

function displayPlayers(players) {
    players.forEach((data, i) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            if (a != "batting_stats" && a !== "bowling_stats") {
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
        var myEditTd = document.createElement("td");
        var myEditBtn = document.createElement("button");
        myEditBtn.innerHTML = "EDIT";
        myEditBtn.addEventListener("click", (() => {
            editPlayer(data);
        }))
        myEditTd.appendChild(myEditBtn);
        myTr.appendChild(myEditTd);

        var myDeleteTd = document.createElement("td");
        var myDeleteBtn = document.createElement("button");
        myDeleteBtn.innerHTML = "DELETE";
        myDeleteBtn.addEventListener("click", (() => {
            deletePlayer(data)
        }))
        myDeleteTd.appendChild(myDeleteBtn);
        myTr.appendChild(myDeleteTd);

        document.querySelector("tbody").appendChild(myTr);
    })
}
deletePlayer = (data) => {
    // console.log(data);
    var deletePayload = new XMLHttpRequest();
    deletePayload.open("DELETE", "http://localhost:3000/demo4/" + data.id);
    deletePayload.send();
}
var editToggle = document.getElementById("addStats");
var updateToggle = document.getElementById("updateStats");
editPlayer = (data) => {
    for (a in data) {
        if (a !== "batting_stats" && a !== "bowling_stats") {
            document.getElementById(a).value = data[a];
        } else {
            for (b in data[a]) {
                document.getElementById(b).value = data[a][b];
            }
        }
    }

    editToggle.setAttribute("style","display:none");
    updateToggle.setAttribute("style","display:block");
}
updatePlayer = ()=>{
    var data = readDataFromFOMUpdate();
    var updatePayload = new XMLHttpRequest();
    updatePayload.open("PUT","http://localhost:3000/demo4/"+data.id);
    updatePayload.setRequestHeader("Content-Type","Application/json");
    updatePayload.send(JSON.stringify(data));

    editToggle.setAttribute("style","display : block");
    updateToggle.setAttribute("style","display:none")
}