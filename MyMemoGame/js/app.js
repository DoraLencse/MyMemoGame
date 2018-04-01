let cards = ['fa fa-diamond',
			 'fa fa-paper-plane-o',
			 'fa fa-anchor', 
			 'fa fa-bolt', 
			 'fa fa-cube', 
			 'fa fa-anchor', 
			 'fa fa-leaf', 
			 'fa fa-bicycle', 
			 'fa fa-diamond', 
			 'fa fa-bomb', 
			 'fa fa-leaf', 
			 'fa fa-bomb', 
			 'fa fa-bolt', 
			 'fa fa-bicycle', 
			 'fa fa-paper-plane-o', 
			 'fa fa-cube'];
	
let cardContent = document.querySelectorAll('li.card');
let pickCard = document.getElementsByClassName('card');
let picked = [];
let openedCards = document.getElementsByClassName('open show');
let opened = [];
let flipBack = document.getElementsByClassName('nomatch');
let matchedCards = document.getElementsByClassName('match');
let matched = [];
let movesCount = document.querySelector('span.moves');
let moves = 0;
let starFirst = document.getElementById('first-star');
let starSecond = document.getElementById('second-star');
let starThird = document.getElementById('third-star');
let restartIcon = document.querySelector('div.restart');
let finalTime = "";
let timerDisplay = document.getElementsByClassName('timer-place')[0];
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;

restartIcon.onclick = function() {
	
	moves = 0;
	movesCount.innerHTML = '<span class="moves">'+moves+'</span>';
	
	 for (let i = 0; i< pickCard.length; i++){
	pickCard[i].setAttribute('class', 'card');
    pickCard[i].style.pointerEvents="auto";	
	 }
	 matched.splice(0,16);
	 opened.splice(0,16);
	 	
	restartGame()
}

startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
	
    return array;
}

function startGame() {

cards = shuffle(cards);

for(let i = 0; i < cardContent.length; i++){
	cardContent[i].innerHTML = '<i class="'+cards[i]+'"></i>';
}

clickOnCards();

}
 
function clickOnCards() {
	         
			for(let i = 0; i < pickCard.length; i++){				
			//pickCard[i].addEventListener('click', function() {
			pickCard[i].onclick = function() {
			pickCard[i].style.pointerEvents="none";				
		    moves ++;			
			movesCount.innerHTML = '<span class="moves">'+moves+'</span>';
			rating();
			pickCard[i].setAttribute('class', 'card open show');
								
			opened.push(pickCard[i]);
			
			compareCards();
			
			}/*)*/;	
			}
			startTimer();
}

function compareCards () {

	if (opened.length == 2 ) {		
				
			if(opened[0].innerHTML !== opened[1].innerHTML) {
			opened[0].setAttribute('class', 'card nomatch');
			opened[1].setAttribute('class', 'card nomatch');
			opened.pop();
			opened.pop();
			
			
			} else if (opened[0].innerHTML === opened[1].innerHTML){
			opened[0].setAttribute('class', 'card match');
			opened[1].setAttribute('class', 'card match');	
			matched.push(opened[0]);
			matched.push(opened[1]);			
			opened.pop();
			opened.pop();
			}
			
			for(let i = 0; i < pickCard.length; i++){
			pickCard[i].style.pointerEvents="auto";
			}
			
			for(let i = 0; i < matched.length; i++){
			matched[i].style.pointerEvents="none";
			}					
	}

	 setTimeout(function(){
			for(let i = 0; i < flipBack.length; i++){
			flipBack[i].setAttribute('class', 'card');
			} }, 1200);				
			
	endGame();
}

function rating () {
	if (moves === 16 ) {
	starFirst.style.visibility='hidden';
	}
	
	if (moves === 32 ) {
	starSecond.style.visibility='hidden';
	}
	
	if (moves === 56 ) {
	starThird.style.visibility='hidden';
	}
}

function endGame () {
	
	if (matched.length === 16) { 
	
	stopTimer();
 
	alert("Congratulations! You win with "+moves+" moves and "+finalTime+" seconds ! :)");	
	
/*	if (confirm("Congratulations! You win with "+moves+" moves and "+finalTime+" seconds ! :) Would you like to play again?")) {
    restartGame();
} else {
    alert("Thank you to play with my game!");
}*/
	
	setTimeout(function(){
	 for (let i = 0; i< pickCard.length; i++){
	pickCard[i].setAttribute('class', 'card');
    pickCard[i].style.pointerEvents="auto";	
	 } }, 1200);
	 matched.splice(0,16);
	 opened.splice(0,16);
	 
	 restartGame();
	}	
}

function matchedDelete () {
 if (matched.length > 0) {
	for (let i= 0; i < matched.length; i++) {
	delete matched[i];	
	}	
	matched = [];		
	}	
}

function restartGame () {
	
clearTimer();
starFirst.style.visibility='visible';
starSecond.style.visibility='visible';
starThird.style.visibility='visible';
	
for (let i = 0; i< pickCard.length; i++){
	pickCard[i].setAttribute('class', 'card');
    pickCard[i].style.pointerEvents="auto";	
	 }

matchedDelete();
moves = 0;
movesCount.innerHTML = '<span class="moves">'+moves+'</span>';	
 
startGame();	
}

/*TIMER*/

//based on https://jsfiddle.net/Daniel_Hug/pvk6p/

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    timerDisplay.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
	
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();


function startTimer (){
if(moves > 0) {
timer();	
}else clearTimer();
}

function stopTimer () {
if (matched.length === 16) {
    clearTimeout(t);
	finalTime = timerDisplay.textContent;
}
}

function clearTimer () {
    timerDisplay.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}