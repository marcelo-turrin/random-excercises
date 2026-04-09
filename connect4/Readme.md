# Connect 4 JS/TS Implementation

A robust, object-oriented implementation of the classic **Connect 4** game. This project focuses on engine logic, featuring three distinct algorithms for winner detection and a transition from JavaScript to a fully typed TypeScript environment.

## 🕹️ The Game

Connect 4 is a two-player connection game in which the players take turns dropping discs into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective is to be the first to form a horizontal, vertical, or diagonal line of four discs.

## 🏗️ Implementation Details

The game engine is built as a stadnalone class, strictly separating logic from the interface.

### Key Features

- **Encapsulation**: Uses private class fields (`#board`, `#winner`) to ensure state integrity.
- **Validation**: Handles out-of-bounds moves, full columns, and prevents play after the game ends.
- **Winner Detection**: Includes three interchangeable logic versions:
  1. **Iterative Bidirectional**: Traditional nested loops walking both sides of an axis.
  2. **Functional**: Uses `.some()` and `.every()` for a declarative approach.
  3. **Range Scanning**: Checks a static window from -3 to +3 around the last move.

### Winner Detection

- The Iterative Bidirectional algorithm is preferable because it starts from the postion and checks for each direction at most 3 values, so six in total. But if the values are not for the current player or a winner is found we stop the lookup. In general is not a algorithm that depends on the size of the board.
- The functional is the same algorithm just written using "functional" methods to avoid fors and breaks it was just created to see it done.
- Range Scanning is a little more inneficient because it does not "end fast" it needs to go over the seven values on each direction. As the first one it does not depend on the size of the board.

## 📈 Complexity Analysis

Because the engine only checks the area around the **last placed disc** instead of re-scanning the whole board:

| Metric               | Complexity   | Description                                                                          |
| :------------------- | :----------- | :----------------------------------------------------------------------------------- |
| **Time Complexity**  | **O(1)**     | Constant time. We check 4 axes with a max of 7 slots each, regardless of board size. |
| **Space Complexity** | **O(R × C)** | Linear memory based on the number of Rows (R) and Columns (C).                       |

The constructor has a Time Complexity **O(R × C)** because it needs to fill all the slots with the empty value.

## 🚀 Running the Project

The project uses the **Node.js native test runner**, requiring **zero external dependencies**.

### 1. Manual Scenarios

Runs `index.js` to demonstrate various game outcomes (wins, prints, etc.):

```bash
node index.js
```

or

```bash
npm start
```

### 2. Automated Tests

Runs `game.test.js` using the native assertion runner to verify logic and error handling:

```bash
node --test game.test.js
```

or

```bash
npm test
```

### 🛠️ TypeScript Improvements

The provided TypeScript version (Connect4.ts) enhances the project with:

- Type Safety: Uses Union Types ("1" | "2" | "0") to prevent invalid board states.
- ReadOnly Constants: Protects game configuration from accidental runtime changes.
- Interface Clarity: Provides clear public/private access modifiers for better API design.
