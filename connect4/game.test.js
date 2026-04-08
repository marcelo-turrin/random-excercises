import { test, describe } from "node:test";
import assert from "node:assert/strict";
import Connect4 from "./connect4.js"; // Ensure your connect4.js uses 'export default' or 'module.exports'

const testScenarios = [
  {
    name: "Player 1 wins horizontally",
    moves: [0, 0, 1, 1, 2, 2, 3],
    expectedWinner: "1",
  },
  {
    name: "Player 2 wins horizontally",
    moves: [0, 1, 0, 2, 1, 3, 2, 4],
    expectedWinner: "2",
  },
  {
    name: "Player 1 wins vertically",
    moves: [0, 1, 0, 1, 0, 1, 0],
    expectedWinner: "1",
  },
  {
    name: "Player 2 wins vertically",
    moves: [0, 1, 0, 1, 2, 1, 2, 1],
    expectedWinner: "2",
  },
  {
    name: "Player 1 wins diagonal (bottom-up)",
    moves: [0, 1, 1, 2, 2, 3, 2, 3, 3, 0, 3],
    expectedWinner: "1",
  },
  {
    name: "Player 2 wins diagonal (bottom-up)",
    moves: [5, 0, 1, 1, 2, 2, 3, 2, 3, 3, 0, 3],
    expectedWinner: "2",
  },
  {
    name: "Player 1 wins diagonal (up-down)",
    moves: [3, 2, 2, 1, 1, 0, 1, 0, 0, 5, 0],
    expectedWinner: "1",
  },
  {
    name: "Player 2 wins diagonal (up-down)",
    moves: [4, 3, 4, 2, 0, 2, 0, 1, 0, 1, 4, 1, 3, 0],
    expectedWinner: "2",
  },
  //     {
  //     name: "Game ends in a Draw",
  //     moves: [
  //       0, 1, 0, 1, 0, 1,//
  //        1, 0, 1, 0, 1, 0, // Cols 0 & 1 filled
  //       //
  //       2, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3, 2, // Cols 2 & 3 filled
  //       //
  //       4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 4, // Cols 4 & 5 filled
  //       //
  //       6, 6, 6, 6, 6, 6                   // Col 6 filled (assumes 6x7 board)
  //     ],
  //     expectedWinner: null,
  //     isDraw: true
  //   }
];

describe("Connect 4 Win Conditions", () => {
  testScenarios.forEach(({ name, moves, expectedWinner }) => {
    test(name, () => {
      const game = new Connect4();

      moves.forEach((col) => game.play(col));

      // If a test fails, this shows exactly what we expected vs what we got
      assert.strictEqual(
        game.getWinner(),
        expectedWinner,
        `Scenario "${name}" failed`,
      );
      //       if (isDraw) assert.strictEqual(game.isGameOver, true);
    });
  });
});

describe("Connect 4 -  Errors", () => {
  // 2. Error: Play Out of Bounds
  test("Error: Should throw for out-of-bounds columns", () => {
    const game = new Connect4();
    assert.throws(() => game.play(-1), /invalid/i);
    assert.throws(() => game.play(7), /invalid/i); // Assuming 7 columns (0-6)
  });

  // 3. Error: Play on a Full Column
  test("Error: Should throw when playing in a full column", () => {
    const game = new Connect4();
    for (let i = 0; i < 6; i++) game.play(0); // Fill column 0

    assert.throws(() => game.play(0), {
      message: /column.*full/i, // Matches "Column is full" or similar
    });
  });

  // 4. Error: Play after Game is Won
  test("Error: Should not allow moves after a winner is declared", () => {
    const game = new Connect4();
    // Quick P1 vertical win
    [0, 1, 0, 1, 0, 1, 0].forEach((c) => game.play(c));

    assert.strictEqual(game.getWinner(), "1");
    assert.throws(() => game.play(2), /game over/i);
  });
});
