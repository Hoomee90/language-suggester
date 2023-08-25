function collapseHandler() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    const target = document.querySelector(button.dataset.target);
    
    button.addEventListener("click", function() {
      const toHide = document.querySelector(".show")
      if (toHide) {
        toHide.classList.toggle("show");
      }
      if (toHide !== target) {
        target.classList.toggle("show");
      }
    })
  })
}

window.addEventListener("load", function() {
  collapseHandler();
})