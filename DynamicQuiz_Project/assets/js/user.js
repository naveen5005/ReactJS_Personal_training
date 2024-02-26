function navigateToUser() {
    window.location.href = "index.html";
}
let clickedText = "";
const allAnchorElements = document.querySelectorAll(".collapsed");
for (let index = 0; index < allAnchorElements.length; index++) {
    const element = allAnchorElements[index];
    element.addEventListener("click", (e) => {
        e.preventDefault();
        index !== 0 ? handleFormDisplay(index - 1) : handleFormDisplay(index);
        clickedText = e.target.innerHTML;
        // console.log(clickedText)
        document.querySelector("#subjectName").innerHTML = clickedText + " Questions"
        const SubmitTest = document.querySelector("#submittest");
        SubmitTest.setAttribute("style", "display:block");
        SubmitTest.addEventListener("click", () => {
            submitTest();
        })
    })

}

createHTMLElement = (eleName) => {
    const element = document.createElement(eleName)
    return element;
}
addContentToElement = (element, elementName, text, type, idValue) => {
    if (elementName !== "input" && elementName !== "select" && elementName !== "option") {
        element.innerHTML = text;
        element === "p" ? element.setAttribute("id", idValue) : null;
    } else if (elementName === "input" && (type == "text" || type == "textarea")) {
        element.innerHTML = text;
        element.setAttribute("type", type);
        element.classList.add("form-control")
        element.id = idValue
    } else if (elementName === "input" && type == "radio") {
        element.innerHTML = text;
        element.setAttribute("type", type);
        element.classList.add("form-check-input")
        element.setAttribute("name", "status-" + idValue)
        element.value = text;
    } else if (elementName === "input" && type == "checkbox") {
        element.innerHTML = text;
        element.setAttribute("type", type);
        element.classList.add("form-check-input");
        element.value = text;
        element.setAttribute("name", type + "-result-" + idValue)
    } else if (elementName === "select") {
        element.innerHTML = text;
        element.classList.add("dropdown");
    } else if (elementName === "option") {
        element.innerHTML = text;
        element.classList.add("dropdown-item");
        element.value = text;
    }
    return element;
}
const formElement = createHTMLElement("form");

handleQuestionDisplay = (question, i) => {
    // console.log(question)
    const wrapperElement = createHTMLElement("div");
    wrapperElement.classList.add("card")
    const questionlabelElement = addContentToElement(
        createHTMLElement("label"),
        "label",
        Object.keys(question)[2].substring(0, 9) + (i + 1) + " : " + question.type
    );
    const questionInputElement = addContentToElement(
        createHTMLElement("p"),
        "p",
        Object.values(question)[2],
        "",
        Object.keys(question)[2]
    );
    wrapperElement.appendChild(questionlabelElement);
    wrapperElement.appendChild(questionInputElement);

    question.options.forEach((option) => {
        if (question.type !== "select" && question.type !== "text" && question.type !== "textarea") {
            Object.keys(option).forEach((opt) => {
                const optionsWrapper = createHTMLElement("div");
                optionsWrapper.classList.add("option-wrapper-" + question.id);
                const optionLabelElement = addContentToElement(
                    createHTMLElement("label"),
                    "label",
                    opt,
                    Object.keys(opt)[0]
                )
                const optionInputElement = addContentToElement(
                    createHTMLElement("input"),
                    "input",
                    option[opt],
                    question.type,
                    question.id
                )
                const optionLabelElementForValue = addContentToElement(
                    createHTMLElement("label"),
                    "label",
                    option[opt]
                )
                // optionsWrapper.appendChild(optionLabelElement);
                optionsWrapper.appendChild(optionInputElement);
                optionsWrapper.appendChild(optionLabelElementForValue);
                wrapperElement.appendChild(optionsWrapper);

            })
        } else if (question.type === "select") {
            question.options.forEach((option) => {
                const optionSelectWrapper = createHTMLElement("div");
                const optionSelectElement = addContentToElement(
                    createHTMLElement("select"),
                    "select",
                    "",
                )
                for (a in option) {
                    const optionSelectDropdown = addContentToElement(
                        createHTMLElement("option"),
                        "option",
                        option[a],
                    )

                    optionSelectElement.appendChild(optionSelectDropdown);
                }
                optionSelectWrapper.appendChild(optionSelectElement);
                wrapperElement.appendChild(optionSelectWrapper);
            })
        } else if (question.type === "text" || question.type === "textarea") {
            question.options.forEach((option) => {
                const optionTextWrapper = createHTMLElement("div");
                for (a in option) {
                    const optionTextInput = addContentToElement(
                        createHTMLElement("input"),
                        "input",
                        "",
                        question.type,
                        Object.keys(option)[0]
                    )
                    optionTextWrapper.appendChild(optionTextInput);
                }

                wrapperElement.appendChild(optionTextWrapper);
            })
        }


    })

    formElement.appendChild(wrapperElement);
}

displayQuestions = () => {
    // const formElement = document.createElement("form");
    handleFormDisplay = (i) => {
        document.querySelector("form").innerHTML = "";
        questions[i].fields.forEach((question, i) => {
            handleQuestionDisplay(question, i);
        })
    }
    document.querySelector(".col-lg-9").appendChild(formElement);
}

let questions = [];
getDataFromAPI = async () => {
    questions = await (await fetch("http://localhost:3000/forms")).json()
    displayQuestions();
}
getDataFromAPI()

submitTest = () => {
    readDataFromFOM();
}
readDataFromFOM = () => {
    console.log(questions);
    const resultObject = questions.find(
        (question) => question.formName.indexOf(clickedText)
    );
    console.log(resultObject);
    resultObject.fields.forEach((question) => {
        if (question.type == "text" || question.type === "textarea") {
            question.options.forEach((option) => {
                for (a in option) {
                    option[a] = document.getElementById(a).value;
                }
            })
        }
        else if (question.type === "radio") {
            const allOptions = document.getElementsByName("status-" + question.id);
            allOptions.forEach((element) => {
                // Find the answer key dynamically
                let answerKey;
                for (const key in question) {
                    if (key.startsWith('answer-')) {
                        answerKey = key;
                        break;
                    }
                }
                if (element.checked) {
                    if (element.value === question[answerKey]) {
                        element.parentElement.setAttribute("style", "background:green");
                    } else {
                        element.parentElement.setAttribute("style", "background:red");
                    }
                }
            })
        }
        else if (question.type === "checkbox") {
            const allCheckboxes = document.getElementsByName("checkbox-result-" + question.id);
            allCheckboxes.forEach((element) => {
                console.log(element.checked)
                // Find the answer key dynamically
                let answerKey;
                for (const key in question) {
                    if (key.startsWith('answer-')) {
                        answerKey = key;
                        break;
                    }
                }
                question[answerKey].split(",").forEach((anwser, i) => {
                    if (element.checked) {
                        if (element.value === anwser) {
                            element.parentElement.setAttribute("style", "background:green");
                        } else {
                            element.parentElement.setAttribute("style", "background:red");
                        }
                    }
                })
            })
        }
    })
    console.log(resultObject);
}