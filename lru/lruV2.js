class LRUCache {
  capacity;
  map;

  constructor(size = 10) {
    this.map = new Map();
    this.capacity = size;
  }

  get(key) {
    const value = this.map.get(key);
    if (value) {
      // delete to mark as RU
      this.map.delete(key);
      this.map.set(key, value);

      return value;
    }
  }

  put(key, value) {
    if (!this.map.has(key)) {
      if (this.size() === this.capacity) {
        // evict LRU
        const evicted = this.map.keys().next();
        this.map.delete(evicted.value);
      }
    } else {
      // delete to mark as RU
      this.map.delete(key);
    }
    this.map.set(key, value);
  }

  size() {
    return this.map.size;
  }
}

module.exports = LRUCache;
