var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;


function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    $('#'+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
    $('h1').text('Level ' + level);
    level++; 
}

var result = 'success';
var i = 0;

    $(document).on('click', '.btn', function(e) {
             var userChosenColour = this.id;
             userClickedPattern.push(userChosenColour);
             playSound(userChosenColour);
             animatePress(userChosenColour);
                checkAnswer(userClickedPattern.length-1);
             if(result == 'success' && userClickedPattern.length == gamePattern.length){
                var delayInMilliseconds = 1000; //1 second

                setTimeout(function() {
                    nextSequence();
                }, delayInMilliseconds);
                userClickedPattern = [];
             }
         });



function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
  
}

function animatePress(currentColor){
  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function (event) {
    playSound('start');
    if(level != 1){
        result = 'success';
        level = 0; 
        $('h1').text('Level '+ level); 
        var delayInMilliseconds = 2000; //2 second
    
        setTimeout(function() {
            nextSequence();
        }, delayInMilliseconds);
    }
        
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log('success');
    }
    else{
        result = 'wrong';
        playSound('wrong');
        $('h1').text('Game Over, Press any key to Restart');
        $('body').addClass("game-over");

        //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
        setTimeout(function () {
          $('body').removeClass("game-over");
        }, 200);
        gamePattern = [];
        userClickedPattern = [];
        level =0;
        $('#start-button').text('RESTART').fadeIn();

    }
}

$(document).on('click', '#start-button', function(e) {

    playSound('start');
    $("#start-button").addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#start-button").removeClass("pressed");
  }, 100);

    $("#start-button").fadeOut();
  if(level != 1){
    result = 'success';
    level = 0; 
    $('h1').text('Level '+ level); 
    var delayInMilliseconds = 1000; //2 second

    setTimeout(function() {
        nextSequence();
    }, delayInMilliseconds);
}
})

