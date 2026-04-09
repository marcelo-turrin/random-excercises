/** Connect 4 Game */
class Connect4 {
  // Static class constants
  static #ROWS = 6; // board rows
  static #COLS = 7; // board columns
  static #P1 = "1"; // player 1 "color"
  static #P2 = "2"; // player 2 "color"
  static #EMPTY = "0"; // empty slot value

  // Static direction elements to check winner
  static #PATHS = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal \
    [-1, 1], // Diagonal /
  ];
  static #SIDES = [1, -1];
  static #DISTANCES = [1, 2, 3];

  // Private instance fields
  #board;
  #currentPlayer;
  #winner;
  #moves;

  constructor() {
    // board should have all slots with empty value
    this.#board = Array.from({ length: Connect4.#ROWS }, () =>
      Array(Connect4.#COLS).fill(Connect4.#EMPTY),
    );
    this.#currentPlayer = Connect4.#P1; // player 1 starts
    this.#winner = null; // null means game not done
    this.#moves = 0;
  }

  /** @returns the winner or 0 if no winner is decided */
  getWinner() {
    // By request when no winner returns 0.
    return this.#winner === null ? "0" : this.#winner;
  }

  /** user plays by selecting the "col" he/she wants to play */
  play(col) {
    // validations
    if (!this.#isValid(0, col)) {
      // I use isValid with row 0 to reutilize the code.
      throw Error("Invalid column");
    }

    if (this.#winner !== null) {
      throw Error("Game over");
    }

    // Find the last row in the column that is empty
    const row = this.#board.findLastIndex((r) => r[col] === Connect4.#EMPTY);

    // if row is -1 means that the column is full
    if (row === -1) throw new Error("Column is full");

    // set the color on the slot
    this.#board[row][col] = this.#currentPlayer;
    this.#moves++;

    // Check for winner condition
    if (
      this.#checkWinner(row, col)
      // this.#checkWinnerFunctional(row, col)
      // this.#checkWinnerAlternative(row, col)
    ) {
      this.#winner = this.#currentPlayer;
    } else if (this.#moves === Connect4.#ROWS * Connect4.#COLS) {
      this.#winner = "Draw";
    } else {
      //change the player
      this.#currentPlayer =
        this.#currentPlayer === Connect4.#P1 ? Connect4.#P2 : Connect4.#P1;
    }
  }

  /**
   * Walks from the slot in the require paths to see if the player
   * @returns true if the current player won
   */
  #checkWinner(row, col) {
    // 1. for all paths/directions.
    for (const [dr, dc] of Connect4.#PATHS) {
      let count = 1;

      // 2. going backwards and fordwards
      for (const side of Connect4.#SIDES) {
        //3. check up to 3 slots on each side
        for (let dist = 1; dist < 4; dist++) {
          const r = row + dr * dist * side;
          const c = col + dc * dist * side;

          // 4. if we are on the board and still is a
          // player slot we count +1
          if (
            this.#isValid(r, c) &&
            this.#board[r][c] === this.#currentPlayer
          ) {
            count++;
          } else {
            // I we are outside the board or the slot
            // does not have the players value we finish
            // this side
            break;
          }
        }
      }
      // 5. if the dimension count is 4 or more means player won.
      if (count >= 4) return true;
    }
    // player did not won
    return false;
  }

  /**
   * Alternative to #checkWinner using more "functional" elements.
   * To avoid fors and breaks
   * @returns true if the current player won
   */
  #checkWinnerFunctional(row, col) {
    // 1. some() will stop with the first path that returns true
    // so first that wins.
    return Connect4.#PATHS.some(([dr, dc]) => {
      let count = 1;
      // 2. we want to check both sides
      for (const side of Connect4.#SIDES) {
        //2.  .every() stop with the first distance that retursn false
        Connect4.#DISTANCES.every((dist) => {
          const r = row + dr * dist * side;
          const c = col + dc * dist * side;

          if (
            this.#isValid(r, c) &&
            this.#board[r][c] === this.#currentPlayer
          ) {
            count++;
            return true;
          }
          return false; // Stops the .every() for this 'side'
        });
      }

      return count >= 4;
    });
  }

  /** alternative algorithm going 3 slots behind till 3 backward counting contigous player slots */
  #checkWinnerAlternative(row, col) {
    for (const [dr, dc] of Connect4.#PATHS) {
      let count = 0;

      // Check 3 before, the slot and 3 after
      for (let i = -3; i <= 3; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (this.#isValid(r, c) && this.#board[r][c] === this.#currentPlayer) {
          count++;
          if (count === 4) {
            return true; // Winner stop looking
          }
        } else {
          count = 0; // Sequence broken restart the count
        }
      }
    }
    return false;
  }

  /** @return true if the combination of r and c is inside the board. false if not */
  #isValid(r, c) {
    return r >= 0 && r < Connect4.#ROWS && c >= 0 && c < Connect4.#COLS;
  }

  /** prints the board and either the winner or the next player to play */
  print() {
    console.table(this.#board);
    if (this.#winner) {
      console.log("Winner: ", this.#winner);
    } else {
      console.log("Player to play:", this.#currentPlayer);
    }
  }
}

export default Connect4;
