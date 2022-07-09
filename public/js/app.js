const app = {
  choices: ["paper", "scissors", "rock"],
  resultCompare: false,
  compare: false,
  score: 0,

  init: function () {
    app.createScore();
    app.removeMainContent();
    app.createMainContent();
    app.handleModalRules();
    app.handlePlayerPick();
  },

  getRandomInt: function (max) {
    return Math.floor(Math.random() * max);
  },

  getRandomChoice: function () {
    const choice = app.choices[app.getRandomInt(app.choices.length)];
    return `choice${choice.charAt(0).toUpperCase() + choice.slice(1)}`;
  },

  // <p id="score__number"></p>
  createScore: function () {
    const scoreNumber = document.getElementById("score__number");
    scoreNumber.textContent = app.score;
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

  createPicksContent: function (choiceUser, choiceComputer) {
    const main = document.getElementById("main");

    const picksContainer = document.createElement("section");
    picksContainer.setAttribute("id", "picksContainer");
    const divUserPick = document.createElement("div");
    divUserPick.setAttribute("id", "userPickContainer");
    const divComputerPick = document.createElement("div");
    divComputerPick.setAttribute("id", "computerPickContainer");

    const pickUserTitle = document.createElement("h2");
    pickUserTitle.textContent = "YOU PICKED";

    const articleChoiceUser = document.createElement("article");
    articleChoiceUser.setAttribute("id", choiceUser);
    articleChoiceUser.classList.add(
      "choice",
      `choice--${choiceUser.slice(6).toLowerCase()}`,
      "choicePickUserPosition"
    );

    const imgChoice = document.createElement("img");
    imgChoice.setAttribute(
      "src",
      `./images/icon-${choiceUser.slice(6).toLowerCase()}.svg`
    );
    imgChoice.setAttribute(
      "alt",
      `choice ${choiceUser.slice(6).toLowerCase()}`
    );
    articleChoiceUser.appendChild(imgChoice);

    const articleChoiceComputer = document.createElement("article");
    articleChoiceComputer.setAttribute("id", choiceComputer);
    articleChoiceComputer.classList.add(
      "choice",
      `choice--${choiceComputer.slice(6).toLowerCase()}`,
      "choicePickUserPosition"
    );

    const imgChoiceComputer = document.createElement("img");
    imgChoiceComputer.setAttribute(
      "src",
      `./images/icon-${choiceComputer.slice(6).toLowerCase()}.svg`
    );
    imgChoiceComputer.setAttribute(
      "alt",
      `choice ${choiceComputer.slice(6).toLowerCase()}`
    );
    articleChoiceComputer.appendChild(imgChoiceComputer);

    const pickComputerTitle = document.createElement("h2");
    pickComputerTitle.textContent = "THE HOUSE PICKED";

    const resultContainer = document.createElement("article");
    resultContainer.setAttribute("id", "resultContainer");
    const result = document.createElement("h2");
    result.setAttribute("id", "result");

    const buttonPLayAgain = document.createElement("button");
    buttonPLayAgain.textContent = "PLAY AGAIN";
    buttonPLayAgain.setAttribute("id", "buttonPlayAgain");

    resultContainer.appendChild(result);
    resultContainer.appendChild(buttonPLayAgain);
    // choix User -----------------------------------------------------
    divUserPick.appendChild(pickUserTitle);
    divUserPick.appendChild(articleChoiceUser);

    // choix Computer -------------------------------------------------
    divComputerPick.appendChild(pickComputerTitle);
    setTimeout(() => {
      divComputerPick.appendChild(articleChoiceComputer);
    }, 500);

    picksContainer.appendChild(divUserPick);
    setTimeout(() => {
      picksContainer.appendChild(resultContainer);
      app.handlePlayAgain();
      app.handleWinner();
      result.textContent = app.resultCompare; // A modifier
    }, 1500);
    picksContainer.appendChild(divComputerPick);
    main.appendChild(picksContainer);
  },

  handlePlayerPick: function () {
    const allChoice = document.querySelectorAll(".choice");
    allChoice.forEach((choice) => {
      choice.addEventListener("click", (e) => {
        const userChoice = e.target.id;
        const computerChoice = app.getRandomChoice();
        app.removeMainContent();
        app.createPicksContent(userChoice, computerChoice);
        app.compare = [{ choice: userChoice }, { choice: computerChoice }];
      });
    });
  },
  handleWinner: function () {
    console.log(app.compare);
    const formatedCompare = app.compare.map((compare) =>
      compare.choice.slice(6).toLowerCase()
    );
    console.log(formatedCompare);
    if (formatedCompare[0] === formatedCompare[1]) {
      app.resultCompare = "It's a draw";
    }
    // else if (formatedCompare[0] === "rock" && formatedCompare[1] === "paper")
    else if (
      app.choices.indexOf(formatedCompare[0]) -
        app.choices.indexOf(formatedCompare[1]) ===
        -1 ||
      app.choices.indexOf(formatedCompare[0]) -
        app.choices.indexOf(formatedCompare[1]) ===
        2
    ) {
      app.resultCompare = "You Lose !";
    } else {
      app.score++;
      app.createScore();
      app.resultCompare = "You Win !";
    }
  },

  handlePlayAgain: function () {
    const buttonPlayAgain = document.getElementById("buttonPlayAgain");

    buttonPlayAgain.addEventListener("click", () => {
      app.init();
    });
  },
};

document.addEventListener("DOMContentLoaded", app.init);
