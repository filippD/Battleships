const Ship = require('../ship')

const ship = new Ship(4)

// test('setStatus', () => {
//   let status = ship.initArray()
//   ship.setStatus(status)
//   expect(ship.status).toEqual(["", "", "", ""]);
// });

// test('damage', () => {
//   expect(ship.damage(1)).toEqual(["", "hit", "", ""]);
// });

// test("isSunk returns false when ship's array is not all 'hit'", () => {
//   expect(ship.isSunk()).toBeFalsy();
// });

// test("isSunk returns true when ship's array is all 'hit'", () => {
//   ship.status = ["hit", "hit", "hit", "hit"]
//   expect(ship.isSunk()).toBeTruthy();
// });

test('damage', () => {
  ship.damage()
  expect(ship.hp).toBe(3);
});

test("isSunk returns false when ship still has hp", () => {
  expect(ship.isSunk()).toBeFalsy();
});

test("isSunk returns true when ship's array is all 'hit'", () => {
  ship.hp = 0;
  expect(ship.isSunk()).toBeTruthy();
});