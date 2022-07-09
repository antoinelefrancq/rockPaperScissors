const app = {
  choices: ["paper", "scissors", "rock"],

  init: function () {
    app.createMainContent();
    app.handleModalRules();
    app.handlePlayerPick();
  },

  handleModalRules: function () {
    const rulesModal = document.getElementById("rulesModal");
    const rulesButton = document.getElementById("rulesButton");

    const span = document.getElementsByClassName("close")[0];

    rulesButton.onclick = function () {
      rulesModal.style.display = "block";
    };

    span.onclick = function () {
      rulesModal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == rulesModal) {
        rulesModal.style.display = "none";
      }
    };
  },

  createMainContent: function () {
    const main = document.getElementById("main");

    const choiceContainer = document.createElement("section");
    choiceContainer.setAttribute("id", "choiceContainer");
    choiceContainer.classList.add("choiceContainer");

    app.choices.forEach((choice) => {
      const articleChoice = document.createElement("article");
      articleChoice.setAttribute(
        "id",
        `choice${choice[0].toUpperCase() + choice.slice(1)}`
      );
      articleChoice.classList.add("choice", `choice--${choice}`);

      const imgChoice = document.createElement("img");
      imgChoice.setAttribute("src", `./images/icon-${choice}.svg`);
      imgChoice.setAttribute("alt", `choice ${choice}`);
      articleChoice.appendChild(imgChoice);

      choiceContainer.appendChild(articleChoice);
    });

    main.appendChild(choiceContainer);
  },

  removeMainContent: function () {
    const main = document.getElementById("main");
    main.innerHTML = "";
  },

  handlePlayerPick: function () {
    const allChoice = document.querySelectorAll(".choice");

    allChoice.forEach((choice) => {
      choice.addEventListener("click", (e) => {
        app.removeMainContent();
        console.log(e.target.id);
      });
    });
  },
};

document.addEventListener("DOMContentLoaded", app.init);
