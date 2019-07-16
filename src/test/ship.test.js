import Ship from '../ship';

const ship = new Ship(4)

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