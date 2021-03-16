var startGame = false;
var level = 0;

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

$(document).keydown(function() {
  if (!startGame) {
    $('h1').text("Level " + level);
    newSequence();
    startGame = true;
  }
})

function newSequence() {
  userClickedPattern = [];
  level++;
  $('h1').text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animationPress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animationPress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        newSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $('body').addClass("game-over");
    setTimeout(function() {
        $('body').removeClass("game-over");
      }, 200);
    $('h1').html("Game Over! <br> Press any key to restart")
    startOver();
    }
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    startGame = false;
  }
