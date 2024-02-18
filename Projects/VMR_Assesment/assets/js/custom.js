let allAnchorElements = document.getElementsByClassName("collapsed");

for (let index = 0; index < allAnchorElements.length; index++) {
  const element = allAnchorElements[index];
  element.addEventListener("click", function (e,) {
    e.preventDefault(); // Will Stop the Default Behavour (Navigation)
    index !== 0 ? handleFormDisplay(index - 1) : handleFormDisplay(index); // we can change the behaviour later
    const clickedText = e.target.innerHTML;
    document.querySelector("#subjectName").innerHTML =
      clickedText + " Questions";
  });
}

function navigateToAdmin() {
  window.location.href = "admin.html";
}

function navigateToUser() {
  window.location.href = "index.html";
}
createHtmlElement = (elementName) => {
  const element = document.createElement(elementName);
  // elementName === "input" ? element.setAttribute("id", "id" + Math.round(Math.random() * 100)) : null;
  elementName === "input" ? element.setAttribute("id", "text") : null;
  elementName === "input" ? element.setAttribute("type", "text") : null;

  return element;
};
const addContentToElement = (element, elementName, text) => {
  if (elementName !== "input") {
    element.innerHTML = text;
  } else if (elementName === "input") {
    element.value = text;
  }
  return element;
};

handleQuestionDisplay = (question) => {
  const wrapperElement = createHtmlElement("div");
  wrapperElement.classList.add("card");
  const questionTypeElement = addContentToElement(
    createHtmlElement("p"),
    "p",
    "Question Type : " + question.type
  );

  const questionlabelElement = addContentToElement(
    createHtmlElement("label"),
    "label",
    "Question : "
  );
  const questionInputElement = addContentToElement(
    createHtmlElement("input"),
    "input",
    question.Question
  );
  wrapperElement.appendChild(questionlabelElement);
  wrapperElement.appendChild(questionInputElement);
  wrapperElement.prepend(questionTypeElement);
  question.options.forEach((option) => {
    Object.keys(option).forEach((opt) => {
      const optionsWrapper = createHtmlElement("div");
      optionsWrapper.classList.add("option-wrapper");
      const optionLabelElement = addContentToElement(
        createHtmlElement("label"),
        "label",
        opt
      );
      const optionInputElement = addContentToElement(
        createHtmlElement("input"),
        "input",
        option[opt]
      );
      optionsWrapper.appendChild(optionLabelElement);
      optionsWrapper.appendChild(optionInputElement);
      wrapperElement.appendChild(optionsWrapper);
    });
  });
  document.querySelector("form").appendChild(wrapperElement);
};

displayQuestions = () => {
  const formElement = createHtmlElement("form");
  const formButtonElement = addContentToElement(
    createHtmlElement("button"),
    "submit",
    "Submit"
  );
  document.querySelector(".col-lg-9").appendChild(formElement);
  handleFormDisplay = (i) => {
    document.querySelector("form").innerHTML = "";
    questions[i].fields.forEach((question) => {
      handleQuestionDisplay(question);
    });
  }
  formButtonElement.classList.add("btn", "btn-success");
  formElement.appendChild(formButtonElement);
};

let questions = [];
getAllQuestions = async (method) => {
  method === "GET" ? url = "http://localhost:3000/forms" : url = "http://localhost:3000/forms/" + id;
  questions = await (await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: method === "GET" ? null : JSON.stringify(payload)
  })).json();
  displayQuestions();
};

getAllQuestions("GET");
