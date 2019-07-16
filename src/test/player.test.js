import Player from '../player';
import Gameboard from '../gameboard';

const gameboard = new Gameboard()

test('creating a player instance', () => {
  const player = new Player('Player', gameboard)
  expect(player).toEqual({
  	type: 'Player',
  	gameboard: gameboard
  });
}); 
