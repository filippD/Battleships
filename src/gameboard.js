const Ship = require('./ship')

class Gameboard {
	constructor() {
		this.board = new Array(100).fill(null)

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

		this.board = new Array(100).fill(null)
		while(this.ships[4] < 1) {
			this.addShip(4, Math.floor(Math.random() * 100), Math.random() >= 0.5)
		}

		while(this.ships[3] < 2) {
			this.addShip(3, Math.floor(Math.random() * 100), Math.random() >= 0.5)
		}

		while(this.ships[2] < 3) {
			this.addShip(2, Math.floor(Math.random() * 100), Math.random() >= 0.5)
		}

		while(this.ships[1] < 4) {
			this.addShip(1, Math.floor(Math.random() * 100), Math.random() >= 0.5)
		}
	}

	validatePosition(length, x, vertical) {
		let isOk = true;
		if (vertical) {
			let row = Math.floor(x/10);
			if (x+length > row*10+10) {
				isOk = false
			}
			let shouldCheckUpper = row === 9 ? false : true;
			let shouldCheckLower = row === 0 ? false : true;
			for (let i = x===0? x : x-1; i<=x+length; i++) {
				if(this.board[i] !== null) {
					isOk = false
				}
				if (shouldCheckUpper && this.board[i+10] !== null) {
					isOk = false;
				}
				if (shouldCheckLower && this.board[i-10] !== null) {
					isOk = false
				}
			}
		} else {
			let column = x-Math.floor(x/10)*10;
			if (x+length*10 > 100) {
				isOk = false
			}
			let shouldCheckUpper = column === 9 ? false : true;
			let shouldCheckLower = column === 0 ? false : true;
			for (let i = x<10? x : x-10; i<=x+length*10; i+=10) {
				if(this.board[i] !== null) {
					isOk = false
				}
				if (shouldCheckUpper && this.board[i+1] !== null) {
						isOk = false;
				}
				if (shouldCheckLower && this.board[i-1] !== null) {
					isOk = false
				}
			}
		}
		return isOk
	}

	addShip(length, x, vertical) {
		if(this.validatePosition(length, x, vertical)) {
			this.ships[length]++;
			const ship = new Ship(length);
			if (vertical) {
				for(let i = x; i<length+x; i++) {
					this.board[i] = ship;
					ship.position.push(i)
				}
			} else {
				for(let i = x; i<length*10+x; i+=10) {
					this.board[i] = ship;
					ship.position.push(i)
				}	
			}
		}	
	}

	receiveAttack(x) {
		if (this.board[x] !== null && this.board[x] !== 'hit') {
			const ship = this.board[x];
			ship.damage();
			if (ship.isSunk()) {
				this.ships[ship.length]--
			}
		}
		this.board[x] = 'hit';
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
