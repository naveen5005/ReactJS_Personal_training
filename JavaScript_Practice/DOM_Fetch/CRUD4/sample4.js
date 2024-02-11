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

function readOnlyDataFromFOM() {
    var data = returnObj();
    for (a in data) {
        if (a == "player_id") {
            data[a] = document.getElementById(a).value == "" ? uniqueIdentifier() : document.getElementById(a).value;
        }
        else if (a !== "batting_stats" && a !== "bowling_stats") {
            data[a] = document.getElementById(a).value;
        } else {
            for (b in data[a]) {
                data[a][b] = document.getElementById(b).value;
            }
        }
    }
    return data;
}

addPlayer = () => {
    var postPayload = readOnlyDataFromFOM();
    fetch("http://localhost:3000/demo4", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
    })
}

getDataFromAPI = () => {
    fetch("http://localhost:3000/demo4", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        body: null
    }).then((response) => {
        if (!response.ok) {
            throw new Error("response is not ok");
        }
        return response.json()
    }).then((players) => {
        displayPlayers(players);
    })
}
getDataFromAPI();

function displayPlayers(players) {
    players.forEach((data) => {
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

        var myEditTD = document.createElement("td");
        var myEditBtn = document.createElement("button");
        myEditBtn.innerHTML = "EDIT";
        myEditBtn.addEventListener("click", function () {
            editPlayer(data);
        });
        myEditTD.appendChild(myEditBtn);
        myTr.appendChild(myEditTD);

        var myDeleteTD = document.createElement("td");
        var myDeleteBtn = document.createElement("button");
        myDeleteBtn.innerHTML = "DELETE";
        myDeleteBtn.addEventListener("click", function () {
            deletePlayer(data);
        });
        myDeleteTD.appendChild(myDeleteBtn);
        myTr.appendChild(myDeleteTD);

        document.querySelector("tbody").appendChild(myTr);
    })
}

deletePlayer = (data) => {
    fetch("http://localhost:3000/demo4/" + data.player_id, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: null
    })
}
let addToggle = document.getElementById("addStats");
let updateToggle = document.getElementById("updateStats");

editPlayer = (data) => {
    for (a in data) {
        if (a !== "batting_stats" && a !== "bowling_stats") {
            document.getElementById(a).value = data[a]
        } else {
            for (b in data[a]) {
                document.getElementById(b).value = data[a][b];
            }
        }
    }
    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");
}

updatePlayer = () => {
    var putPayload = readOnlyDataFromFOM();
    fetch("http://localhost:3000/demo4/" + putPayload.player_id, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putPayload)
    })

    addToggle.setAttribute("style", "display:block");
    updateToggle.setAttribute("style", "display:none");
}