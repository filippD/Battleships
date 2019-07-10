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

	fillBoard() {
		 // && this.ships[3] !== 2 && this.ships[2] !== 3 && this.ships[1] !== 4
		 this.ships = {
			'4': 0,
			'3': 0,
			'2': 0,
			'1': 0
		}
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
		while(this.ships[4] !== 1) {
			this.addShip(4, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) )
		}

		while(this.ships[3] !== 2) {
			this.addShip(3, Math.floor(Math.random()*10), Math.floor(Math.random()*10) )
		}

		while(this.ships[2] !== 3) {
			this.addShip(2, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) )
		}

		while(this.ships[1] !== 4) {
			this.addShip(1, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) )
		}
	}

	validatePosition(length, x, y) {
		// let ok = true
		// for (let i = y; y<=length; i++) {
		// 	if (this.board[x][i] !== null) {
		// 		ok = false 
		// 	}
			
		// 	if (this.board[x-1][i] !== null || this.board[x+1][i] !== null) {
		// 		ok = false 
		// 	}
		// }
		// if (this.board[x][y-1] !== null || this.board[x][y+length] !== null) {
		// 	ok = false 
		// }
		// return ok
		let isOk = true;
		if (y+length > 10) {
			isOk = false
		}
		let minus = y-1 >= 0 ? y-1 : y
		let plus = y+length+2 <= 9 ? y+length+2 : y+length+1
		let myField = this.board[x].slice(minus, plus)
		if(myField.every((val) => val !== null)) {
			isOk = false 
		}
		if (x-1 >= 0) {
			let myField2 = this.board[x-1].slice(minus, plus)
			if(myField2.every((val) => val !== null)) {
				isOk = false 
			}
		}

		if (x+1 <= 9) {
			let myField3 = this.board[x+1].slice(minus, plus)
			if(myField3.every((val) => val !== null)) {
				isOk = false 
			}
		}
		
		return isOk
	}

	addShip(length, x, y) {
		
		if(this.validatePosition(length, x, y)) {
			console.log(x,y)
			this.ships[length]++;
			const ship = new Ship(length);
			for(let i = y; i<length+y; i++) {
				this.board[x][i] = ship
			}
		}	
	}

	receiveAttack(x, y) {
		if (this.board[x][y] !== null && this.board[x][y] !== 'hit') {
			const ship = this.board[x][y];
			ship.damage();
			if (ship.isSunk()) {
				this.ships[ship.length]--
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
