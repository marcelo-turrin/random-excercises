const LRUCache = require("./lru.js");
// const LRUCache = require("./lruV2.js");

// Test 1: Basic insertion and retrieval
console.log("\n=== Test 1: Basic insertion and retrieval ===");
const cache1 = new LRUCache(3);
cache1.put("a", 1);
cache1.put("b", 2);
cache1.put("c", 3);
console.log("get('a'):", cache1.get("a"), "- Expected: 1");
console.log("get('b'):", cache1.get("b"), "- Expected: 2");
console.log("get('c'):", cache1.get("c"), "- Expected: 3");
console.log("size():", cache1.size(), "- Expected: 3");

// Test 2: Capacity limit - evict least recently used
console.log("\n=== Test 2: Capacity limit - evict LRU ===");
const cache2 = new LRUCache(3);
cache2.put("a", 1);
cache2.put("b", 2);
cache2.put("c", 3);
cache2.put("d", 4); // Should evict 'a'
console.log("get('a'):", cache2.get("a"), "- Expected: undefined (evicted)");
console.log("get('b'):", cache2.get("b"), "- Expected: 2");
console.log("get('c'):", cache2.get("c"), "- Expected: 3");
console.log("get('d'):", cache2.get("d"), "- Expected: 4");
console.log("size():", cache2.size(), "- Expected: 3");

// Test 3: Access updates recency
console.log("\n=== Test 3: Access updates recency ===");
const cache3 = new LRUCache(3);
cache3.put("a", 1);
cache3.put("b", 2);
cache3.put("c", 3);
cache3.get("a"); // Access 'a', making it recently used
cache3.put("d", 4); // Should evict 'b', not 'a'
console.log("get('a'):", cache3.get("a"), "- Expected: 1 (not evicted)");
console.log("get('b'):", cache3.get("b"), "- Expected: undefined (evicted)");
console.log("get('c'):", cache3.get("c"), "- Expected: 3");
console.log("get('d'):", cache3.get("d"), "- Expected: 4");

// Test 4: Update existing key
console.log("\n=== Test 4: Update existing key ===");
const cache4 = new LRUCache(3);
cache4.put("a", 1);
cache4.put("b", 2);
cache4.put("a", 10); // Update 'a'
console.log("get('a'):", cache4.get("a"), "- Expected: 10");
console.log("size():", cache4.size(), "- Expected: 2");

// Test 5: Update existing key refreshes position
console.log("\n=== Test 5: Update refreshes position ===");
const cache5 = new LRUCache(3);
cache5.put("a", 1);
cache5.put("b", 2);
cache5.put("c", 3);
cache5.put("a", 10); // Update 'a', making it most recent
cache5.put("d", 4); // Should evict 'b', not 'a'
console.log("get('a'):", cache5.get("a"), "- Expected: 10 (not evicted)");
console.log("get('b'):", cache5.get("b"), "- Expected: undefined (evicted)");
console.log("get('c'):", cache5.get("c"), "- Expected: 3");
console.log("get('d'):", cache5.get("d"), "- Expected: 4");

// Test 6: Get non-existent key
console.log("\n=== Test 6: Get non-existent key ===");
const cache6 = new LRUCache(3);
cache6.put("a", 1);
console.log("get('b'):", cache6.get("b"), "- Expected: undefined");
console.log("get('z'):", cache6.get("z"), "- Expected: undefined");

// Test 7: Empty cache
console.log("\n=== Test 7: Empty cache ===");
const cache7 = new LRUCache(3);
console.log("size():", cache7.size(), "- Expected: 0");
console.log("get('a'):", cache7.get("a"), "- Expected: undefined");

// Test 8: Single capacity cache
console.log("\n=== Test 8: Single capacity cache ===");
const cache8 = new LRUCache(1);
cache8.put("a", 1);
console.log("get('a'):", cache8.get("a"), "- Expected: 1");
cache8.put("b", 2);
console.log("get('a'):", cache8.get("a"), "- Expected: undefined (evicted)");
console.log("get('b'):", cache8.get("b"), "- Expected: 2");
console.log("size():", cache8.size(), "- Expected: 1");

// Test 9: Multiple accesses maintain order
console.log("\n=== Test 9: Multiple accesses maintain order ===");
const cache9 = new LRUCache(4);
cache9.put("a", 1);
cache9.put("b", 2);
cache9.put("c", 3);
cache9.put("d", 4);
cache9.get("a"); // a is now most recent
cache9.get("b"); // b is now most recent
cache9.put("e", 5); // Should evict 'c'
console.log("get('a'):", cache9.get("a"), "- Expected: 1");
console.log("get('b'):", cache9.get("b"), "- Expected: 2");
console.log("get('c'):", cache9.get("c"), "- Expected: undefined (evicted)");
console.log("get('d'):", cache9.get("d"), "- Expected: 4");
console.log("get('e'):", cache9.get("e"), "- Expected: 5");

// Test 10: Default capacity
console.log("\n=== Test 10: Default capacity (10) ===");
const cache10 = new LRUCache();
for (let i = 0; i < 10; i++) {
  cache10.put(`key${i}`, i);
}
console.log("size():", cache10.size(), "- Expected: 10");
cache10.put("key10", 10); // Should evict 'key0'
console.log(
  "get('key0'):",
  cache10.get("key0"),
  "- Expected: undefined (evicted)",
);
console.log("get('key10'):", cache10.get("key10"), "- Expected: 10");
console.log("size():", cache10.size(), "- Expected: 10");
