//Business Logic

let answersValue = 0;

function getRange(value) {
  const thresholds = [85, 170, 255];
  if (value <= thresholds[0]) return 0;
  if (value <= thresholds[1]) return 1;
  if (value <= thresholds[2]) return 2;
}

function getColorBucket(RGB) {
  //turn RGB into one of 27 buckets
  const [r, g, b] = RGB;
  const rRange = getRange(r);
  const gRange = getRange(g);
  const bRange = getRange(b);

  return rRange + gRange + bRange;
}

function hexToRGB(hex) {
  //convert hexadecimal color form output into RGB
  hex = hex.slice(1);
  const parsedHex = parseInt(hex, 16);
  const r = (parsedHex >> 16) & 255;
  const g = (parsedHex >> 8) & 255;
  const b = parsedHex & 255;
  
  return [r, g, b];
}

function colorSubmissionHandler(colorHex) {
  const colorRGB = hexToRGB(colorHex);
  answersValue += getColorBucket(colorRGB);
} 

function radioSubmissionHandler(radios) {
  let radioValue = 0;
  
  radios.forEach(output => {
    radioValue += parseInt(output.value);
  })
  answersValue += radioValue;
}

//UI Logic

function collapseHandler() {
  const buttons = document.querySelectorAll(".card-header > button");
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

function showResults() {
  document.querySelector("#result-card").classList.remove("hidden");
  document.querySelector("#accordion").classList.add("hidden");
  
  console.log(answersValue);
}

function formReset() {
  document.querySelector("#color").value = "#000000";
  document.querySelector("#thoughts").innerHTML = "";
  document.querySelector("#result-card").classList.add("hidden");
  document.querySelector("#accordion").classList.remove("hidden");

  answersValue = 0;
}

window.addEventListener("load", function() {
  const form = document.querySelector("form");
  const resetButton = document.querySelector("#reset-button")

  collapseHandler();
  form.addEventListener("submit", function (event){
    event.preventDefault();
    const colorInput = document.querySelector("#color").value;
    const radioInput = document.querySelectorAll("input:checked");

    colorSubmissionHandler(colorInput);
    radioSubmissionHandler(radioInput);
    showResults();
  })
  resetButton.addEventListener("click", function() {
    formReset();
  })
})