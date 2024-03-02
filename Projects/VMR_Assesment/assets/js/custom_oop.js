class QuestionManager {
    constructor() {
      this.clickedText = "";
      this.questions = [];
      this.allAnchorElements = document.getElementsByClassName("collapsed");
      this.initializeEventListeners();
    }
  
    initializeEventListeners() {
      for (let index = 0; index < this.allAnchorElements.length; index++) {
        const element = this.allAnchorElements[index];
        element.addEventListener("click", (e) => {
          e.preventDefault();
          this.handleAnchorClick(index, e);
        });
      }
    }
  
    handleAnchorClick(index, e) {
      index !== 0 ? this.handleFormDisplay(index - 1) : this.handleFormDisplay(index);
      this.clickedText = e.target.innerHTML;
      document.querySelector("#subjectName").innerHTML = this.clickedText + " Questions";
    }
  
    handleFormDisplay(index) {
      document.querySelector("form").innerHTML = "";
      this.questions[index].fields.forEach((question) => {
        this.handleQuestionDisplay(question);
      });
    }
  
    handleQuestionDisplay(question) {
      const wrapperElement = document.createElement("div");
      wrapperElement.classList.add("card");
      // code for creating and appending elements removed for brevity
      document.querySelector("form").appendChild(wrapperElement);
    }
  
    static navigateToAdmin() {
      window.location.href = "admin.html";
    }
  
    static navigateToUser() {
      window.location.href = "index.html";
    }
  
    // Other methods like createHtmlElement, addContentToElement, dynamicButtons, etc. can be moved into utility classes or kept as static methods within this class.
  }
  
  // Instantiate QuestionManager
  const questionManager = new QuestionManager();
  