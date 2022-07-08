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
