const Gameboard = require('./gameboard');

class Player {
	constructor(type) {
		this.type = type,
		this.gameboard = new Gameboard()
	}
}

module.exports = Player;
