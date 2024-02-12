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
commonServerCommunication = (method, data) => {
    var payload = readDataFromFOM();
    method === "GET" || method === "POST" ? url = "http://localhost:3000/demo4" : url = "http://localhost:3000/demo4/" +  data.player_id;
    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: method === "POST" || method ==="PUT" ? JSON.stringify(payload) : null,
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Response is not ok...!!");
        }
        return response.json();
    }).then((players) => {
        displayPlayers(players)
    })
}
getDataFromAPI = () => {
    commonServerCommunication("GET");
}
getDataFromAPI();
addPlayer = () => {
    commonServerCommunication("POST");
}
createDynamicBtns = (text, event, data, target) => {
    var Td = document.createElement("td");
    var Button = document.createElement("button");
    Button.innerHTML = text;
    Button.addEventListener("click", function () {
        event(data);
    })
    Td.appendChild(Button);
    target.appendChild(Td);
}
createDynamicTh = (text,target) =>{
    var Th = document.createElement("th");
    Th.innerHTML = text;
    Th.setAttribute("rowspan" ,"2");
    target.appendChild(Th);
}
commonDiplayDataTable = (cell,obj,target)=>{
    var myTr = document.createElement("tr");
        for (a in obj) {
            if (a !== "batting_stats" && a !== "bowling_stats") {
                var myTd = document.createElement(cell);
                myTd.innerHTML = cell === "th" ? a : obj[a];
                cell === "th" ? myTd.setAttribute("rowspan","2") : myTd.setAttribute("rowspan","0")
                myTr.appendChild(myTd);
                var myInnerTr = document.createElement("tr");
            } else {
                var myTd = document.createElement(cell);
                myTd.innerHTML = cell === "th" ? a : obj[a];
                a === "batting_stats" ? myTd.setAttribute("colspan","4") : myTd.setAttribute("colspan","3")
                myTr.appendChild(myTd);
                if(cell == "td"){
                    for (b in obj[a]) {
                        var myInnerTD = document.createElement(cell);
                        myInnerTD.innerHTML = cell === "th" ? a : obj[a][b];
                        myTr.appendChild(myInnerTD);
                    }
                }else{
                    for (b in obj[a]) {
                        var myInnerTD = document.createElement(cell);
                        myInnerTD.innerHTML = cell === "th" ? b : obj[a][b];
                        myInnerTr.appendChild(myInnerTD);
                        document.querySelector(target).appendChild(myInnerTr);
                    }
                }
            }

        }if(cell === "th"){
            createDynamicTh("EDIT",myTr);
            createDynamicTh("DELETE",myTr);
        }else{
            createDynamicBtns("Edit", editPlayer, obj, myTr);
            createDynamicBtns("Delete", deletePlayer, obj, myTr);
    
        }

        document.querySelector(target).appendChild(myTr);
}
commonDiplayDataTable("th",returnObj(),"thead")
displayPlayers = (players) => {
    players.forEach((data) => {
        commonDiplayDataTable("td",data,"tbody")
    })
}
let addStats = document.getElementById("addStats");
let updateStats = document.getElementById("updateStats");
let updateData= null;
editPlayer = (data) => {
    updateData = data;
    for (a in data) {
        if (a !== "bowling_stats" && a !== "batting_stats") {
            document.getElementById(a).value = data[a];
        } else {
            for (b in data[a]) {
                document.getElementById(b).value = data[a][b];
            }
        }

        addStats.setAttribute("style","display:none");
        updateStats.setAttribute("style","display:block");
    }
}
updatePlayer = () =>{
    commonServerCommunication("PUT",updateData);
    addStats.setAttribute("style","display:block");
    updateStats.setAttribute("style","display:none");
}
deletePlayer = (data) => {
    commonServerCommunication("DELETE", data);
}