function collapseHandler() {
  const ButtonOne = document.querySelector("#headingOne > button");
  const collapseOne = document.querySelector("#collapseOne");

  ButtonOne.addEventListener("click", function() {
    collapseOne.classList.toggle("show");
  })
}

window.addEventListener("load", function() {
  collapseHandler();
})