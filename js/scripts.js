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
  let resultsTitle = document.querySelector("#result-title");
  let resultsText = document.querySelector("#result-text");
  document.querySelector("#result-card").classList.remove("hidden");
  document.querySelector("#accordion").classList.add("hidden");

  if (answersValue >= 8) {
    resultsTitle.innerText = "WoodWork";
    resultsText.innerText = "You an excitable person always jumping onto the latest thing. Perhaps you've dabbled in many languages, or are taking this quiz itself is an impulse. Either way, WoodWork is right for you. Simultaneously the lowest and highest-level programming language possible, it is versatile in ways that moral minds struggle to understand. The only trouble you may encounter is that this language doesn't actually exist yet. Luckily, that just means you have something to look forward to!";
  } else if (answersValue >= 4) {
    resultsTitle.innerText = "HTML, CSS, and Javascript";
    resultsText.innerText = "You are a middle of the road individual, who's just looking for a useful language to immerse themselves in. You might be talented at other thing such as literary analysis or an interment and are looking to round out your skillset. Perhaps you have a strong deadpan sense of humor and enjoy creating and consuming media with sensibilities leaning towards surreal. Unfortunately, seeing as There Can Only Be One, you are obligated find me and engage in a duel to the death. Sorry, I don't make the rules.";
  } else if (answersValue >= 0) {
    resultsTitle.innerText = "Assembly Language";
    resultsText.innerText = "You are a stubborn person who hates change. Frankly, you think the advent of computers was bad for society, but you're interested in programming them anyway. You much prefer to see your 'code' instigate noticeable physical change in the world, which would be exceptionally difficult to achieve meaningfully in ASM. This is good, because you seem to enjoy being miserable.";
  } else {
    resultsTitle.innerText = "Something Went Wrong";
    resultsText.innerText = "Try again later";
  }
  answersValue = 0;
}

function formReset() {
  //Reset form entries
  document.querySelector("#color").value = "#000000";
  document.querySelector("#thoughts").innerHTML = "";
  
  const radioButtons = document.querySelectorAll("input[type='radio']");
  radioButtons.forEach(radio => {
    radio.checked = false;
  })
  document.querySelector("#magicYes").checked = true;
  document.querySelector("#godLogic").checked = true;
  document.querySelector("#happyYes").checked = true;

  //Reset shown question
  const shownQuestion = document.querySelector(".show");
  if (shownQuestion) {
    shownQuestion.classList.remove("show");
  }
  document.querySelector("#collapseOne").classList.add("show");

  //Show form
  document.querySelector("#result-card").classList.add("hidden");
  document.querySelector("#accordion").classList.remove("hidden");
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