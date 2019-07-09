const Gameboard = require('../gameboard')
const Ship = require('../ship')

const gameboard = new Gameboard()

test('addShip', () => {
  let ship = new Ship(2)
  gameboard.addShip(2, 1, 2);
  expect(gameboard.board[1]).toEqual([null, null, ship, ship, null, null, null, null, null, null]);
});

test('receiveAttack', () => {
  gameboard.receiveAttack(1, 2);
  expect(gameboard.board[1][2]).toBe('hit');
  let ship = gameboard.board[1][3];
  expect(ship.hp).toBe(1);
});

test('anyShipsLeft returns true when there are ships', () => {
  gameboard.receiveAttack(1, 2);
  expect(gameboard.anyShipsLeft()).toBeTruthy();
});

test('anyShipsLeft returns false when there are no ships', () => {
  gameboard.receiveAttack(1, 3);
  expect(gameboard.anyShipsLeft()).toBeFalsy();
});