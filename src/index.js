import './styles/index.scss'

const Player = require('./player');


const player1 = new Player('player');
const player2 = new Player('computer');

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
			if (arr[i+j] !== null) {
				innerDiv.classList.add('ship')
			}
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

const AImove = (gameboard) => {
	let rand = Math.floor(Math.random()*100)
	while(gameboard.board[rand] === 'hit') {
		rand = Math.floor(Math.random()*100)
	}
	return rand 
}
// Number(e.target.id)
const move = (player, target) => {
	
	let ship
	let divID = player === player1 ? `1${target}` : `2${target}`;
	console.log(divID)
	let div = document.getElementById(divID)
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
		let msg = document.getElementById('msg');
		msg.innerHTML = `${player.type} won`
	} 
}

const start = () => {
	player1.gameboard.fillBoard()
	displayBoard(player1, 'board1')
	player2.gameboard.fillBoard()
	displayBoard(player2, 'board2')
	const board = document.getElementById('board2')
	board.addEventListener('click', (e) => {
		let arr = e.target.id.split('').slice(1)
		let p1Target = arr.length === 2 ? `${arr[0]}${arr[1]}` : `${arr[0]}`
		if (player2.gameboard.board[Number(p1Target)] !== 'hit') {
			move(player2, Number(p1Target))
			move(player1, AImove(player1.gameboard))
		}
	})
}

const randButton = document.getElementById('Randomize')
const dispButton = document.getElementById('Display')
randButton.addEventListener('click', ()=>{randomize(player1)})
dispButton.addEventListener('click', ()=>{start()})