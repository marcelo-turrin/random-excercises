const Connect4 = require('./connect4.js');

// Test 1: Player 1 wins horizontally
console.log("\n=== Test 1: Player 1 wins horizontally ===");
const game1 = new Connect4();
game1.play(0); // P1
game1.play(0); // P2
game1.play(1); // P1
game1.play(1); // P2
game1.play(2); // P1
game1.play(2); // P2
game1.play(3); // P1 - wins horizontally
game1.print();
console.log("Expected: Player 1, Actual:", game1.winner);

// Test 2: Player 2 wins horizontally
console.log("\n=== Test 2: Player 2 wins horizontally ===");
const game2 = new Connect4();
game2.play(0); // P1
game2.play(1); // P2
game2.play(0); // P1
game2.play(2); // P2
game2.play(4); // P1
game2.play(3); // P2
game2.play(4); // P1
game2.play(4); // P2 - wins horizontally
game2.print();
console.log("Expected: Player 2, Actual:", game2.winner);

// Test 3: Player 1 wins vertically
console.log("\n=== Test 3: Player 1 wins vertically ===");
const game3 = new Connect4();
game3.play(0); // P1
game3.play(1); // P2
game3.play(0); // P1
game3.play(1); // P2
game3.play(0); // P1
game3.play(1); // P2
game3.play(0); // P1 - wins vertically
game3.print();
console.log("Expected: Player 1, Actual:", game3.winner);

// Test 4: Player 2 wins vertically
console.log("\n=== Test 4: Player 2 wins vertically ===");
const game4 = new Connect4();
game4.play(0); // P1
game4.play(1); // P2
game4.play(0); // P1
game4.play(1); // P2
game4.play(2); // P1
game4.play(1); // P2
game4.play(2); // P1
game4.play(1); // P2 - wins vertically
game4.print();
console.log("Expected: Player 2, Actual:", game4.winner);

// Test 5: Player 1 wins diagonal (bottom-up, left to right)
console.log("\n=== Test 5: Player 1 wins diagonal (bottom-up) ===");
const game5 = new Connect4();
game5.play(0); // P1
game5.play(1); // P2
game5.play(1); // P1
game5.play(2); // P2
game5.play(2); // P1
game5.play(3); // P2
game5.play(2); // P1
game5.play(3); // P2
game5.play(3); // P1
game5.play(4); // P2
game5.play(3); // P1 - wins diagonal
game5.print();
console.log("Expected: Player 1, Actual:", game5.winner);

// Test 6: Player 2 wins diagonal (bottom-up, left to right)
console.log("\n=== Test 6: Player 2 wins diagonal (bottom-up) ===");
const game6 = new Connect4();
game6.play(4); // P1
game6.play(0); // P2
game6.play(1); // P1
game6.play(1); // P2
game6.play(2); // P1
game6.play(2); // P2
game6.play(3); // P1
game6.play(2); // P2
game6.play(3); // P1
game6.play(3); // P2
game6.play(0); // P1
game6.play(3); // P2 - wins diagonal
game6.print();
console.log("Expected: Player 2, Actual:", game6.winner);

// Test 7: Player 1 wins diagonal (up-down, left to right)
console.log("\n=== Test 7: Player 1 wins diagonal (up-down) ===");
const game7 = new Connect4();
game7.play(0); // P1
game7.play(1); // P2
game7.play(1); // P1
game7.play(2); // P2
game7.play(3); // P1
game7.play(2); // P2
game7.play(2); // P1
game7.play(3); // P2
game7.play(4); // P1
game7.play(3); // P2
game7.play(3); // P1 - wins diagonal
game7.print();
console.log("Expected: Player 1, Actual:", game7.winner);

// Test 8: Player 2 wins diagonal (up-down, left to right)
console.log("\n=== Test 8: Player 2 wins diagonal (up-down) ===");
const game8 = new Connect4();
game8.play(4); // P1
game8.play(3); // P2
game8.play(4); // P1
game8.play(2); // P2
game8.play(0); // P1
game8.play(2); // P2
game8.play(0); // P1
game8.play(1); // P2
game8.play(0); // P1
game8.play(1); // P2
game8.play(4); // P1
game8.play(1); // P2
game8.play(3); // P1
game8.play(0); // P2 - wins diagonal [3,0]-[4,1]-[5,2]-[6,3]
game8.print();
console.log("Expected: Player 2, Actual:", game8.winner);
