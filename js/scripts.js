//Business Logic

function getRange(value) {
  const thresholds = [85, 170, 255];
  if (value <= thresholds[0]) return "low";
  if (value <= thresholds[1]) return "med";
  if (value <= thresholds[2]) return "high";
}

function getColorBucket(RGB) {
  //turn RGB into one of 27 buckets
  const [r, g, b] = RGB;
  const rRange = getRange(r);
  const gRange = getRange(g);
  const bRange = getRange(b);

  return rRange + "-" + gRange + "-" + bRange;
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

function colorSubmissionHandler() {
  const colorInput = document.querySelector("#color").value;
  const colorRGB = hexToRGB(colorInput);
  const colorBucket = getColorBucket(colorRGB);
  //TODO: Do something with the colorBucket
  console.log(colorBucket);
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

window.addEventListener("load", function() {
  const form = this.document.querySelector("form");
  
  collapseHandler();
  form.addEventListener("submit", function (event){
    event.preventDefault();
    colorSubmissionHandler()
  })
})