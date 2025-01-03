const color=['red','blue','yellow','green']

var userChosenColour=[]
var gameSequence=[]

var gamestarted=false
var level = 0

$(document).keypress(function(){
    if(!gamestarted){
        $('#level-title').text('level '+level)
        sequence()
        gamestarted=true
    } 
})
$('.btn').click(function(){
    var userChosenCour=$(this).attr('id') 
    userChosenColour.push(userChosenCour)
    playSound(userChosenCour)
    animatePress(userChosenCour)
    checkAnswer(userChosenColour.length-1)
})


function checkAnswer(currentLevel) {
    if (userChosenColour[currentLevel] === gameSequence[currentLevel]) {
        console.log('Correct!');
        if (userChosenColour.length === gameSequence.length) {
            setTimeout(function() {
                userChosenColour = []; 
                sequence();
            }, 1000);
        }
    } else {
        console.log('Wrong!');
        playSound('wrong');
        $('body').addClass('game-over'); 
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart'); 
        reset(); 
    }
}
function sequence() {
    userChosenColour = []; 
    level++;
    $('#level-title').text('Level ' + level);
    var random = color[Math.floor(Math.random() * 4)];
    gameSequence.push(random);
    $('#' + random).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(random);
    animatePress(random);
}

function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3')
     audio.play()
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
      $("#" + color).removeClass("pressed");
    }, 100);
  }
  
function reset(){
    gameSequence=[]
    gamestarted = false;
    level=0
}

