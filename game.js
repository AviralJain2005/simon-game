var colors = ["red","blue","green","yellow"];
var pattern = [];
var input = [];
var level = 0;
var started = false;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  input = [];
  level++;
  $("#level-title").text("Level " + level);
  var ind = Math.floor(Math.random() * 4);
  var randCol = colors[ind];
  pattern.push(randCol);
  $("#" + randCol).fadeOut(100).fadeIn(100);
  playSound(randCol);
}

$(".btn").click(function() {
  var userColor = $(this).attr("id");
  input.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(input.length - 1);
});

$(document).keydown(function() {
  if (started === false) {
    started = true;
    nextSequence();
  }
});

function checkAnswer(currLevel) {
  if (input[currLevel] === pattern[currLevel]) {
    if (input.length === pattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  pattern = [];
  started = false;
}
