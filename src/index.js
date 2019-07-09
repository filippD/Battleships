import './styles/index.scss'

const Player = require('./player');


const player1 = new Player('player');
// const player2 = new Player('computer');

// const addEvent = (div) => {
// 	div.addEventListener('click', (e) => {
// 		console.log(e.target.id)
// 	})
// }

const displayBoard = (player, board_id) => {
	let myBoard = document.getElementById(board_id)
	for(let i=0; i<10; i++) {
		let div = document.createElement('div');
		for(let j = 0; j<10; j++) {
			let innerDiv = document.createElement('div')
			innerDiv.classList.add('sqr');
			innerDiv.innerHTML=`${i}${j}`;
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

// const placeShip(coord) = {
	
// }



displayBoard(player1, 'board1')