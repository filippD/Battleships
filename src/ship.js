class Ship {
	constructor(length) {
		this.length = length;
		// this.sunk = false;
		// this.hit = false;
		// this.status = [];
		this.hp = length;
	}

	// initArray () {
	// 	let arr = []
	// 	for (let i = 0; i<this.length; i++) {
	// 		arr.push("")
	// 	}
	// 	return arr
	// }

	// setStatus (status) {
	// 	this.status = status
	// }

	// damage (coord) {
	// 	let arr = this.status;
	// 	arr[coord] = 'hit';
	// 	return arr
	// }

	damage () {
		this.hp -= 1
	}

	isSunk() {
		if (this.hp === 0) {
			return true
		} else {
			return false
		}
	}

	// isSunk() {
	// 	return this.status.every((status) => status === "hit")
	// }

}

module.exports = Ship;