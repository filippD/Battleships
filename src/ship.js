class Ship {
	constructor(length) {
		this.length = length;
		this.position = [];
		this.hp = length;
	}

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