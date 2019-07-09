const Ship = require('./ship')

class Gameboard {
	constructor() {
		this.board = [
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null]
		]

		this.ships = {
			'4': 0,
			'3': 0,
			'2': 0,
			'1': 0
		}
	}

	addShip(length, x, y) {
		this.ships[`${length}`] += 1;
		const ship = new Ship(length);
		for(let i = y; i< ship.length+y; i++) {
			this.board[x][i] = ship
		}	
	}

	receiveAttack(x, y) {
		if (this.board[x][y] !== null && this.board[x][y] !== 'hit') {
			const ship = this.board[x][y];
			ship.damage();
			if (ship.isSunk()) {
				this.ships[`${ship.length}`]-=1
			}
		}
		this.board[x][y] = 'hit';
	}

	anyShipsLeft() {
		let left = false
		for(let i = 1; i<=4; i++) {
			if (this.ships[i] !== 0) {
				left = true
			}
		}
		return left
	}
}

module.exports = Gameboard;
