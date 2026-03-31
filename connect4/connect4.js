const PLAYER1 = 1;
const PLAYER2 = 2;
const MAX_ROWS = 7;
const MAX_COLS = 5;

class Connect4 {
  board;
  currentPlayer;
  winner;

  constructor() {
    this.board = Array.from({ length: MAX_ROWS }, () =>
      new Array(MAX_COLS).fill(0),
    );
    this.currentPlayer = PLAYER1;
  }

  play(col) {
    if (this.winner) {
      console.log("Game ended");
      return;
    }

    if (col < 0 || col >= MAX_COLS) {
      console.log("invalid play: " + col);
      return;
    }

    let row = undefined;

    for (let i = MAX_ROWS - 1; i >= 0 && !row; i--) {
      if (this.board[i][col] === 0) {
        //we found the spot.
        row = i;
        this.board[i][col] = this.currentPlayer;
        this.checkWinner(i, col);
        this.currentPlayer = this.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
      }
    }
  }

  checkWinner(row, col) {
    const counts = {
      horizontal: 0,
      vertical: 0,
      bup: 0,
      upd: 0,
    };

    for (let i = -3; i <= 3 && !this.winner; i++) {
      counts.vertical = this.checkPosition(counts.vertical, row + i, col);
      counts.horizontal = this.checkPosition(counts.horizontal, row, col + i);
      counts.bup = this.checkPosition(counts.bup, row - i, col + i);
      counts.upd = this.checkPosition(counts.upd, row + i, col + i);
    }
  }
  checkPosition(count, row, col) {
    if (row < 0 || row >= MAX_ROWS || col < 0 || col >= MAX_COLS) return 0;

    const value = this.board[row][col];
    const response = value === this.currentPlayer ? count + 1 : 0;
    if (response === 4) {
      this.winner = this.currentPlayer;
    }
    return response;
  }

  winner() {
    return this.winner;
  }

  print() {
    console.table(this.board);
    if (this.winner) {
      console.log("Winner: ", this.winner);
    } else {
      console.log("Player to play:", this.currentPlayer);
    }
  }
}

module.exports = Connect4;
