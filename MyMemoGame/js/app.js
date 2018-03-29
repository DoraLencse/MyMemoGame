
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

	
let moves = 0;
let cardContent = document.querySelectorAll('li.card');
let pickCard = document.getElementsByClassName('card');
let picked = [];
let openedCards = document.getElementsByClassName('open show');
let opened = [];
let flipBack = document.getElementsByClassName('nomatch');
let matchedCards = document.getElementsByClassName('match');
let matched = [];
			 
startGame();

/*
document.getElementsByClassName('restart fa fa-repeat').onclick = function() {restartGame()};
const movesCount = document.getElementsByClassName('moves');
movesCount.innerHTML = '<span class="moves">'+moves+'blabla</span> Moves';*/

/*
if (opened.length <= 2){
	clickOnCards();
}*/


/*****FOR TEST *************/		
console.log(openedCards);
console.log(opened);
console.log(matched);
/*****FOR TEST *************/

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

/*if (opened.length <= 2){
	clickOnCards();
}*/
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
function clickOnCards() {
	            
			for(let i = 0; i < pickCard.length; i++){	
			pickCard[i].addEventListener('click', function() {
			pickCard[i].setAttribute('class', 'card open show');
			opened.push(pickCard[i]);
			picked.push(pickCard[i]);
	
	        moves++;
	
			compareCards();
			
			}, true);			
			}

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
			
			for(let i = 0; i < matched.length; i++){
			matched[i].style.pointerEvents="none";
			}
		
	}

	 setTimeout(function(){
			for(let i = 0; i < flipBack.length; i++){
			flipBack[i].setAttribute('class', 'card');
			} }, 1500);				
			
	endGame();
}

function endGame () {
	
	if (matched.length === 16) { 
	 
	alert("Congratulations! You win! :)");
	
	setTimeout(function(){
	 for (let i = 0; i< pickCard.length; i++){
	pickCard[i].setAttribute('class', 'card');
	//matched.shift();
    pickCard[i].style.pointerEvents="auto";	
	 } }, 800);
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

matchedDelete();	
 
startGame();	
}

	
	
	

