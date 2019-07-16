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
		}
	    return false
	}

}

export default Ship;