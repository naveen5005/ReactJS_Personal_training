
commonServerCommunications = async (method) => {
    let formDetails = await (await fetch("http://localhost:3000/forms", {
        method: method,
        body: { 'Content-Type': 'application/json' },
        body: null
    })).json();
    displayFields(formDetails);
    console.log(formDetails);
}
commonServerCommunications("GET");

displayFields = (formDetails) => {
    formDetails.forEach((data) => {
        var heading1 = document.createElement("h1");
        heading1.innerHTML = data.formName.replace(/_/g, " ");
        data.fields.forEach((question, questionIndex) => {
            if (question.type === "text") {
                // console.log(question);
                var myDiv = document.createElement("div");
                for (a in question) {
                    myDiv.setAttribute("style", "border:2px solid black");
                    if (a === "Question") {
                        var paragraph = document.createElement("p");
                        paragraph.innerHTML = questionIndex + ") " + question[a]
                        myDiv.appendChild(paragraph)
                    } else if (a === "answer") {
                        var myLabel = document.createElement("label");
                        myLabel.innerHTML = "Answer: "
                        var myInput = document.createElement("input");
                        myInput.setAttribute("type", question.type);
                        myDiv.appendChild(myLabel);
                        myDiv.appendChild(myInput);
                    }
                }
                document.querySelector("form").appendChild(myDiv);
            }
            else if (question.type === "radio" || question.type === "checkbox") {
                // console.log(question);
                var myDiv = document.createElement("div");
                for (a in question) {
                    myDiv.setAttribute("style", "border:2px solid black");
                    if (a === "Question") {
                        var paragraph = document.createElement("p");
                        paragraph.innerHTML = questionIndex + ") " + question[a]
                        myDiv.appendChild(paragraph)
                    } else if (a === "options") {
                        // console.log(question[a]);
                        question[a].forEach((option, optionIndex) => {
                            var myDivOptions = document.createElement("div");
                            for(b in option){
                                var myInputOptions = document.createElement("input");
                                myInputOptions.setAttribute("type",question.type);
                                question.type ==="radio" ? myInputOptions.setAttribute("name","status") : myInputOptions.setAttribute("name",option[b])
                                myDivOptions.appendChild(myInputOptions); 

                                var myLabelOptions = document.createElement("label");
                                myLabelOptions.innerHTML = option[b]+"<br>";
                                // myLabelOptions.setAttribute("style","display:block");
                                myDivOptions.appendChild(myLabelOptions);
                            }
                            myDiv.appendChild(myDivOptions);
                        })
                        // var myLabel = document.createElement("label");
                        // myLabel.innerHTML = "Answer: "
                        // var myInput = document.createElement("input");
                        // myInput.setAttribute("type", question.type);
                        // myDiv.appendChild(myLabel);
                        // myDiv.appendChild(myInput);
                    }
                }
                document.querySelector("form").appendChild(myDiv);
            }
            else if (question.type === "select"){
                // console.log(question);
                var myDiv = document.createElement("div");
                for (a in question) {
                    myDiv.setAttribute("style", "border:2px solid black");
                    if (a === "Question") {
                        var paragraph = document.createElement("p");
                        paragraph.innerHTML = questionIndex + ") " + question[a]
                        myDiv.appendChild(paragraph)
                    }
                }
                document.querySelector("form").appendChild(myDiv);
            }
        })
        document.querySelector("body").prepend(heading1);
    })
}
