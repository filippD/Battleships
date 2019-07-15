import Gameboard from '../gameboard';
import Ship from '../ship';

const gameboard = new Gameboard()

test('addShip', () => {
  let ship = new Ship(2)
  gameboard.addShip(2, 2, true, ship);
  ship.position = [2,3];
  expect(gameboard.board.slice(0,10)).toEqual([null, null, ship, ship, null, null, null, null, null, null]);
});

test('receiveAttack', () => {
  gameboard.receiveAttack(2);
  expect(gameboard.board[2]).toBe('hit');
  let ship = gameboard.board[3];
  expect(ship.hp).toBe(1);
});

test('anyShipsLeft returns true when there are ships', () => {
  expect(gameboard.anyShipsLeft()).toBeTruthy();
});

test('anyShipsLeft returns false when there are no ships', () => {
  gameboard.receiveAttack(3);
  expect(gameboard.anyShipsLeft()).toBeFalsy();
});