/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let buttonRoll = document.querySelector(".btn-roll");
let buttonHold = document.querySelector(".btn-hold");
let buttonNewGame = document.querySelector(".btn-new");
let diceImage1 = document.querySelector(".dice__group--1");
let diceImage2 = document.querySelector(".dice__group--2");
let player1 = document.querySelector(".player-0-panel");
let player2 = document.querySelector(".player-1-panel");

let scores, roundScore, activePlayer,gamePlaying,winningScore;
let score1 = document.getElementById("score-0");
let score2 = document.getElementById("score-1");
let current1 = document.getElementById("current-0");
let current2 = document.getElementById("current-1");

const initialization = () => {
	score1.textContent=score2.textContent = '0';
	current1.textContent=current2.textContent = '0';
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	diceImage1.style.display = 'none';
	diceImage2.style.display = 'none';
	document.querySelector("#name-0").textContent = "Player-1";
	document.querySelector("#name-1").textContent = "Player-2";
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
//initial setting
initialization();

let preNumber;
//switch image based on the random dice rolled
const switchImage = () =>{
	if (gamePlaying) {
		//1. random dice number
		let dice1 = Math.floor(Math.random()*6)+1;
		let dice2 = Math.floor(Math.random()*6)+1;
		//2. a better way to display images
		diceImage1.style.display = "inline";
		diceImage1.src="img/dice-" + dice1 + ".png";

		diceImage2.style.display = "inline";
		diceImage2.src="img/dice-" + dice2 + ".png";

		console.log(dice1,dice2)
		//3.update the round score if the rolled number wad not 1 1
		if (dice1 != 1 && dice2 != 1){
			//add score
			roundScore = roundScore + dice1 + dice2;
			// document.querySelector("#current-"+activePlayer).textContent = dice;
			document.querySelector("#current-"+activePlayer).innerHTML = roundScore;
		} else {
			document.querySelector("#score-"+activePlayer).textContent = '0';
			scores[activePlayer]=0;
			document.getElementById("score-"+ activePlayer).textContent = scores[activePlayer];
			//next player
			nextPlayer()
			// diceImage.style.display = 'none';
		}
		preNumber = dice;
	}
}

const holdScore = () => {
	//1. add current score to global score
	scores[activePlayer] += roundScore;

	//2. UPDATE UI
	document.getElementById("score-"+ activePlayer).textContent = scores[activePlayer];

	//check the type of input value, a null, "", undefined, 0 are coerced to false, anything else is coerced to true
	let inputScore = document.querySelector(".form__input").value;
	inputScore=Number(inputScore);
	if (inputScore) {
		winningScore = inputScore;
	} else {
		winningScore = 100;
	}

	//3. check if there is a winner
	if (scores[activePlayer]>=winningScore) {
		gamePlaying=false;
		document.querySelector("#name-" + activePlayer).textContent="winner!";
		document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
	} else {
	//NEXT PLAYER
		diceImage1.style.display = 'none';
		diceImage2.style.display = 'none';
		nextPlayer();
	}
}

const nextPlayer = () =>{
	//update current active player
	roundScore = 0;
	document.querySelector("#current-"+activePlayer).textContent = roundScore;
	
	//change players
	player1.classList.toggle('active');
	player2.classList.toggle('active');
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}

buttonRoll.addEventListener("click",switchImage)

buttonHold.addEventListener("click", holdScore)

buttonNewGame.addEventListener("click", initialization)


let toggleStatus = 1;
const toggle = () => {
    if (toggleStatus === 1) {
        document.querySelector(".wrapper").style.left = "45%";
        toggleStatus = 0;
        console.log("toggleStatus1",toggleStatus);
    } else if (toggleStatus === 0) {
        document.querySelector(".wrapper").style.left = "50%";
        toggleStatus = 1;
        console.log("toggleStatus2",toggleStatus);
    }
}

document.querySelector(".toggle-rule").addEventListener("click",toggle);
document.querySelector(".toggle-icon").addEventListener("click",toggle);
	//the following way to display dice is complicate
	// switch(dice) {
	// 	case 1:
	// 		diceImage.src="img/dice-1.png";
	// 		break;
	// 	case 2:
	// 		diceImage.src="img/dice-2.png";
	// 		break;
	// 	case 3:
	// 		diceImage.src="img/dice-3.png";
	// 		break;
	// 	case 4:
	// 		diceImage.src="img/dice-4.png";
	// 		break;
	// 	case 5:
	// 		diceImage.src="img/dice-5.png";
	// 		break;
	// 	case 6: 
	// 		diceImage.src="img/dice-6.png";
	// 		break;
	// }

// let rule = document.querySelector(".btn-text");
// rule.addEventListener("click", )