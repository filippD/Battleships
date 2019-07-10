import './styles/index.scss'

const Player = require('./player');


const player1 = new Player('player');
// const player2 = new Player('computer');

// const addEvent = (div) => {
// 	div.addEventListener('click', (e) => {
// 		console.log(e.target.id)
// 	})
// }

// const fillBoard = () => {

// }



const displayBoard = (player, board_id) => {
	let myBoard = document.getElementById(board_id)
	myBoard.innerHTML = null
	for(let i=0; i<10; i++) {
		let div = document.createElement('div');
		for(let j = 0; j<10; j++) {
			let innerDiv = document.createElement('div')
			innerDiv.classList.add('sqr');
			if (player.gameboard.board[i][j] !== null) {
				innerDiv.classList.add('ship')
			}
			innerDiv.innerHTML=`x${i}y${j}`;
			innerDiv.id=`${i}${j}`
			// innerDiv.addEventListener('click', (e) => {
			// 	player.gameboard.receiveAttack(Number(e.target.id[0]), Number(e.target.id[1]))
			// 	console.log(player.gameboard)
			// })
			div.appendChild(innerDiv);
		}
		myBoard.appendChild(div);
	}
}

const randomize = (player) => {
	player.gameboard.fillBoard()
	displayBoard(player, 'board1')
}

const randButton = document.getElementById('Randomize')
const dispButton = document.getElementById('Display')
randButton.addEventListener('click', ()=>{randomize(player1)})
// dispButton.addEventListener('click', ()=>{displayBoard(player1, 'board1')})
