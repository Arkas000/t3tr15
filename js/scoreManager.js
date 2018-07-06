var score = 0;
var lines = 0;
var level = 0;

function increaseScore(value) {
    if(gameStatus && gameStatus == GameStates.PLAYING) {
        score += value;
        updateScoreUI();
        updateLinesUI();
        updateLevelUI();
    }
}

function increaseLines() {
    lines++;
    if(lines < 30) level = 0;
    else if(lines < 50) level = 1;
    else if(lines < 70) level = 2;
    else if(lines < 85) level = 3;
    else if(lines < 95) level = 4;
    else if(lines < 108) level = 5;
    else if(lines < 114) level = 6;
    else if(lines < 117) level = 7;
    else if(lines < 119) level = 8;
    else if(lines < 121) level = 9;
    else level = 10 + lines - 121;
    updateScoreUI();
    updateLinesUI();
    updateLevelUI();
}

//DEBUG
/*
function increaseLines() {
    lines++;
    if(lines < 1) level = 0;
    else if(lines < 2) level = 1;
    else if(lines < 3) level = 2;
    else if(lines < 4) level = 3;
    else if(lines < 5) level = 4;
    else if(lines < 6) level = 5;
    else if(lines < 7) level = 6;
    else if(lines < 8) level = 7;
    else if(lines < 9) level = 8;
    else if(lines < 10) level = 9;
    else level = 10 + lines - 11;
    updateLinesUI();
    updateLevelUI();
}*/

function resetData() {
    score = 0;
    lines = 0;
    level = 0;
    updateScoreUI();
    updateLinesUI();
    updateLevelUI();
}

setInterval(function() { increaseScore(1); },1000);