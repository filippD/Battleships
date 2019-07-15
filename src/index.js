import './styles/index.scss'
import Player from './player';
import Gameboard from './gameboard';

const board1 = new Gameboard();
const board2 = new Gameboard()
const player1 = new Player('Player', board1);
const player2 = new Player('Computer', board2);

const displayBoard = (player, board_id) => {
	let myBoard = document.getElementById(board_id)
	myBoard.innerHTML = null
	let arr = player.gameboard.board
	for(let i=0; i<arr.length; i+=10) {
		let div = document.createElement('div');
		let row = arr.slice(i,i+10)
		for(let j = 0; j< row.length; j++) {
			let innerDiv = document.createElement('div')
			innerDiv.classList.add('sqr');
			
			if (player === player2) {
				if (i===0) {
					innerDiv.id = `2${j}`
				} else {
					innerDiv.id = `2${i/10}${j}`
				}	
			} else {
				if (i===0) {
					innerDiv.id = `1${j}`
				} else {
					innerDiv.id = `1${i/10}${j}`
				}
				if (arr[i+j] !== null) {
					innerDiv.classList.add('ship')
				}
			}
			div.appendChild(innerDiv);
		}
		myBoard.appendChild(div);
	}
}

const randomize = (player) => {
	player.gameboard.fillBoard()
	displayBoard(player, 'board1')
}

const AImove = (gameboard, hit) => {
	let rand;
	if (hit) {

	} else {
		rand = Math.floor(Math.random()*100)
		while(gameboard.board[rand] === 'hit') {
			rand = Math.floor(Math.random()*100)
		}
	}
	return rand;
}

const move = (player, target) => {
	if (!player1.gameboard.anyShipsLeft() || !player2.gameboard.anyShipsLeft()) {
		return false
	}
	let ship
	let divID = player === player1 ? `1${target}` : `2${target}`;
	let div = document.getElementById(divID);
	if ( player.gameboard.board[target] !== null ) {
		ship = player.gameboard.board[target];
		div.classList.add('hitShip')	
	} else {
		div.classList.add('hit')
	}
	
	player.gameboard.receiveAttack(target)
	if (ship !== undefined && ship.isSunk()) {
		for (let i=0; i<ship.position.length; i++) {
			let divID = player === player1 ? `1${ship.position[i]}` : `2${ship.position[i]}`;
			let div = document.getElementById(divID);
			div.classList.add('destroyedShip')
		}
	}
	if (!player.gameboard.anyShipsLeft()) {
		let winner = player === player1 ? player2 : player1
		let msg = document.getElementById('msg');
		msg.innerHTML = `${winner.type} won`
		let restartBtn = document.getElementById('restartBtn');
		restartBtn.classList.remove('hidden');
		
	} 
}

const play = (e) => {
	let arr = e.target.id.split('').slice(1)
	let p1Target = arr.length === 2 ? `${arr[0]}${arr[1]}` : `${arr[0]}`
	if (player2.gameboard.board[Number(p1Target)] !== 'hit') {
		move(player2, Number(p1Target))
		move(player1, AImove(player1.gameboard))
	}
}

const restart = () => {
	const btnDiv = document.getElementById('btnDiv');
	const msg = document.getElementById('msg');
	const restartBtn = document.getElementById('restartBtn');
	const board1 = document.getElementById('board1');
	const board2 = document.getElementById('board2')
	msg.innerHTML = null;
	board1.innerHTML = null;
	board2.innerHTML = null;
	restartBtn.classList.add('hidden');
	player1.gameboard.fillBoard();
	start()
}

const start = () => {
	const btnDiv = document.getElementById('btnDiv');
	btnDiv.classList.add('hidden');
	displayBoard(player1, 'board1');
	player2.gameboard.fillBoard();
	displayBoard(player2, 'board2');
	const board = document.getElementById('board2');
	board.addEventListener('click', (e) => { play(e) })
}



displayBoard(player1, 'board1');
const randButton = document.getElementById('Randomize');
const startButton = document.getElementById('Start');
const restartBtn = document.getElementById('restartBtn');
randButton.addEventListener('click', ()=>{randomize(player1)});
startButton.addEventListener('click', ()=>{
	if (!player1.gameboard.anyShipsLeft()) {
		player1.gameboard.fillBoard();
	}
	const board = document.getElementById('board2');
	board.classList.remove('hidden')
	start();
});
restartBtn.addEventListener('click', () =>{restart()})