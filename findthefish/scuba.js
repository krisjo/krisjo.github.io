var catImage, mouseImage;
var intervalId, mouseIntervalId;
var catVerticalSpeed;
var catHorizontalSpeed;
var speed = 1;
var mouseHorizontal = 2;
var mouseVertical = 1;

function initScuba() {
  catImage = document.getElementById("scuba");
  catImage.style.left = "400px";
  catImage.style.top = "400px";
  catVerticalSpeed = 0;
  catHorizontalSpeed = 0;

  mouseImage = document.getElementById("mouse");
  mouseImage.style.left = "700px";
  mouseImage.style.top = "400px";
  mouseIntervalId = setInterval(mouseMove, 10);
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      catHorizontalSpeed = -speed;
      catVerticalSpeed = 0;
      break;
    case "ArrowRight":
      catHorizontalSpeed = speed;
      catVerticalSpeed = 0;
      break;
    case "ArrowUp":
      catVerticalSpeed = -speed;
      catHorizontalSpeed = 0;
      break;
    case "ArrowDown":
      catVerticalSpeed = speed;
      catHorizontalSpeed = 0;
      break;
    default:
      mouseIntervalId = setInterval(mouseMove, 10);
      
  }
  intervalId = setInterval(catMove, 30);
});
window.addEventListener("keyup", (event) => {
  catHorizontalSpeed = 0;
  catVerticalSpeed = 0;
  clearInterval(intervalId);
});

  function catMove() {
    const left = parseInt(catImage.style.left);
    if ((left >= window.innerWidth - catImage.clientWidth && catHorizontalSpeed > 0)
    || (left <= 0 && catHorizontalSpeed < 0)) {
      catHorizontalSpeed = 0;
    }
    const top = parseInt(catImage.style.top);
    if ((top >= window.innerHeight - catImage.clientHeight && catVerticalSpeed > 0)
    || (top <= 0 && catVerticalSpeed < 0)) {
      catVerticalSpeed = 0;
    }
    catImage.style.top = top + catVerticalSpeed + "px";
    catImage.style.left = left + catHorizontalSpeed + "px";
    if (Math.abs(top + catVerticalSpeed - parseInt(mouseImage.style.top)) < mouseImage.clientHeight
    && Math.abs(left + catHorizontalSpeed - parseInt(mouseImage.style.left)) < mouseImage.clientWidth) {
      clearInterval(mouseIntervalId);
      beep("/img/beep-10.wav")
    }
  }

function mouseMove() {
  mouseImage.style.left = parseInt(mouseImage.style.left) + mouseHorizontal + "px";
  if (parseInt(mouseImage.style.left) > window.innerWidth - mouseImage.clientWidth || parseInt(mouseImage.style.left) < 5) {
    mouseHorizontal = -mouseHorizontal;
  }
  mouseImage.style.top = parseInt(mouseImage.style.top) + mouseVertical + "px";
  if (parseInt(mouseImage.style.top) > window.innerHeight - mouseImage.clientHeight || parseInt(mouseImage.style.top) < 5) {
    mouseVertical = -mouseVertical;
  }
}

function beep(wavFile){
  wavFile = wavFile || "/img/beep-10.wav"
      var e = document.createElement('AUDIO');
      var src1 = document.createElement('SOURCE');
      src1.type= 'audio/wav';
      src1.src= wavFile;
      e.appendChild(src1);
      e.play();
}
