type PlayerValue = "1" | "2";
type CellValue = PlayerValue | "0";
type WinnerResult = PlayerValue | "0" | "Draw";

class Connect4 {
  // Static class constants
  static readonly #ROWS = 6;
  static readonly #COLS = 7;
  static readonly #P1: PlayerValue = "1";
  static readonly #P2: PlayerValue = "2";
  static readonly #EMPTY: CellValue = "0";

  static readonly #PATHS: [number, number][] = [
    [0, 1],  // Horizontal
    [1, 0],  // Vertical
    [1, 1],  // Diagonal \
    [-1, 1], // Diagonal /
  ];
  static readonly #SIDES: number[] = [1, -1];
  static readonly #DISTANCES: number[] = [1, 2, 3];

  // Private instance fields
  #board: CellValue[][];
  #currentPlayer: PlayerValue;
  #winner: WinnerResult | null;
  #moves: number;

  constructor() {
    this.#board = Array.from({ length: Connect4.#ROWS }, () =>
      Array(Connect4.#COLS).fill(Connect4.#EMPTY)
    );
    this.#currentPlayer = Connect4.#P1;
    this.#winner = null;
    this.#moves = 0;
  }

  get winner(): WinnerResult | null {
    return this.#winner;
  }

  /** @returns the winner or "0" if no winner is decided */
  public getWinner(): WinnerResult {
    return this.#winner === null ? "0" : this.#winner;
  }

  /** user plays by selecting the "col" he/she wants to play */
  public play(col: number): void {
    if (!this.#isValid(0, col)) {
      throw new Error("Invalid column");
    }

    if (this.#winner !== null) {
      throw new Error("Game over");
    }

    const row = this.#board.findLastIndex((r) => r[col] === Connect4.#EMPTY);

    if (row === -1) throw new Error("Column is full");

    this.#board[row][col] = this.#currentPlayer;
    this.#moves++;

    if (
      this.#checkWinner(row, col) ||
      // this.#checkWinnerFunctional(row, col) ||
      this.#checkWinnerAlternative(row, col)
    ) {
      this.#winner = this.#currentPlayer;
    } else if (this.#moves === Connect4.#ROWS * Connect4.#COLS) {
      this.#winner = "Draw";
    } else {
      this.#currentPlayer =
        this.#currentPlayer === Connect4.#P1 ? Connect4.#P2 : Connect4.#P1;
    }
  }

  /** Walks from the slot in the require paths to see if the player won */
  #checkWinner(row: number, col: number): boolean {
    for (const [dr, dc] of Connect4.#PATHS) {
      let count = 1;
      for (const side of Connect4.#SIDES) {
        for (let dist = 1; dist < 4; dist++) {
          const r = row + dr * dist * side;
          const c = col + dc * dist * side;
          if (this.#isValid(r, c) && this.#board[r][c] === this.#currentPlayer) {
            count++;
          } else {
            break;
          }
        }
      }
      if (count >= 4) return true;
    }
    return false;
  }

  /** Alternative to #checkWinner using more "functional" elements. */
  #checkWinnerFunctional(row: number, col: number): boolean {
    return Connect4.#PATHS.some(([dr, dc]) => {
      let count = 1;
      for (const side of Connect4.#SIDES) {
        Connect4.#DISTANCES.every((dist) => {
          const r = row + dr * dist * side;
          const c = col + dc * dist * side;
          if (this.#isValid(r, c) && this.#board[r][c] === this.#currentPlayer) {
            count++;
            return true;
          }
          return false;
        });
      }
      return count >= 4;
    });
  }

  /** Alternative algorithm going 3 slots behind till 3 forward counting contiguous slots */
  #checkWinnerAlternative(row: number, col: number): boolean {
    for (const [dr, dc] of Connect4.#PATHS) {
      let count = 0;
      for (let i = -3; i <= 3; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (this.#isValid(r, c) && this.#board[r][c] === this.#currentPlayer) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  #isValid(r: number, c: number): boolean {
    return r >= 0 && r < Connect4.#ROWS && c >= 0 && c < Connect4.#COLS;
  }

  public print(): void {
    console.table(this.#board);
    if (this.#winner) {
      console.log("Winner: ", this.#winner);
    } else {
      console.log("Player to play:", this.#currentPlayer);
    }
  }
}

export default Connect4;
