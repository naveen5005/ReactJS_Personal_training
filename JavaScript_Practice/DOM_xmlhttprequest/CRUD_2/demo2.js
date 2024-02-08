function uniqueIdentifier() {
    const randomId = Math.random().toString(36).substring(2, 10);
    return randomId;
}
function returnObj() {
    const user = {
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: {
            rate: "",
            count: ""
        }
    }
    return user;
}
function readDataFromFOM() {
    const user = returnObj();
    let randomData = uniqueIdentifier();
    console.log(randomData);
    for (a in user) {
        if (a == "image") {
            user[a] = document.getElementById(a).value;
        } else if (a == "id") {
            console.log(randomData);
            user[a] = randomData;
        } else if (a == "rating") {
            for (b in user[a]) {
                user[a][b] = document.getElementById(b).value;
            }
        } else {
            user[a] = document.getElementById(a).value;
        }
    }

    return user;
}
function readDataFromFOMUpdate() {
    const user = returnObj();
    for (a in user) {
        if (a == "image") {
            user[a] = document.getElementById(a).value;
        } else if (a == "rating") {
            for (b in user[a]) {
                user[a][b] = document.getElementById(b).value;
            }
        }
        else {
            console.log(user[a]);
            user[a] = document.getElementById(a).value;
        }
    }
    return user;
}
addProduct = () => {
    const user = readDataFromFOM();
    console.log(user)

    const postData = new XMLHttpRequest();
    postData.open("POST", "http://localhost:3000/demo2");
    postData.setRequestHeader("Content-type", "Application/json");
    postData.send(JSON.stringify(user));
}

let products = [];
function getDataFromAPI() {
    const getData = new XMLHttpRequest();
    getData.open("GET", "http://localhost:3000/demo2");
    getData.send();
    getData.onreadystatechange = function () {
        if (getData.readyState == 4 && getData.status == 200) {
            products = JSON.parse(getData.response);
            displayProducts(products);
        }
    }

}
getDataFromAPI();

function displayProducts(products) {
    console.log(products)
    products.forEach((data, i) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            if (a == "rating") {
                for (b in data[a]) {
                    var myInnerTd = document.createElement("td");
                    myInnerTd.innerHTML = data[a][b];
                    myTr.appendChild(myInnerTd);
                }
            } else if (a == "image") {
                var myImage = document.createElement("img");
                myImage.setAttribute("src", data[a]);
                myImage.setAttribute("width", "100px");
                myImage.setAttribute("height", "100px");
                myTd.appendChild(myImage);
                myTr.appendChild(myTd);
            }
            else {
                myTd.innerHTML = data[a];
                myTr.appendChild(myTd);
            }
        }

        var myEditTd = document.createElement("td");
        var myEditButton = document.createElement("button");
        myEditButton.innerHTML = "EDIT";
        myEditButton.addEventListener("click", (() => {
            editProduct(data);
        }))
        myEditTd.appendChild(myEditButton);
        myTr.appendChild(myEditTd);

        var myDeleteTd = document.createElement("td");
        var myDeleteButton = document.createElement("button");
        myDeleteButton.innerHTML = "DELETE";
        myDeleteButton.addEventListener("click", (() => {
            deleteProduct(data);
        }))
        myDeleteTd.appendChild(myDeleteButton);
        myTr.appendChild(myDeleteTd);

        document.querySelector("tbody").appendChild(myTr);
    })
}

deleteProduct = (payload) => {
    var deletePayload = new XMLHttpRequest();
    deletePayload.open("DELETE", "http://localhost:3000/demo2/" + payload.id);
    deletePayload.send();
}

let updateToggle = document.querySelector("#updateuser");
let editToggle = document.querySelector("#adduser");

editProduct = (payload) => {
    console.log(typeof (payload))
    for (a in payload) {
        if (a == "image") {
            document.getElementById(a).value = payload[a];
        } else if (a == "rating") {
            for (b in payload[a]) {
                document.getElementById(b).value = payload[a][b];
            }
        }
        else {
            document.getElementById(a).value = payload[a];
        }
    }

    editToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");

}

updateProduct = () => {
    var user = readDataFromFOMUpdate();

    var updUser = new XMLHttpRequest();
    updUser.open("PUT", "http://localhost:3000/demo2/" + user.id);
    updUser.setRequestHeader("Content-Type", "Application/json");
    updUser.send(JSON.stringify(user));

    editToggle.setAttribute("style", "display:block");
    updateToggle.setAttribute("style", "display:none");
}