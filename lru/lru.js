class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  capacity;
  map;
  head;
  tail;

  constructor(size = 10) {
    this.map = new Map();
    this.capacity = size;
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    const node = this.map.get(key);
    //  console.log("get", { node, h: this.head, t: this.tail, m: this.map });

    if (node) {
      this._delete(node);
      this._insert(node);
      // console.log("get", { h: this.head, t: this.tail, m: this.map });
      return node.value;
    }
  }

  put(key, value) {
    if (this.map.has(key)) {
      this._delete(this.map.get(key));
    } else {
      if (this.size() === this.capacity) {
        this._evictLRU();
      }
    }
    const node = new Node(key, value);
    this.map.set(key, node);
    this._insert(node);

    // console.log("put", {
    //   key,
    //   value,
    //   h: this.head,
    //   t: this.tail,
    //   // m: this.map
    // });
  }

  _evictLRU() {
    const lru = this.tail.prev;
    this._delete(lru);
    this.map.delete(lru.key);
  }

  _delete(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _insert(node) {
    const second = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = second;
    second.prev = node;
  }

  size() {
    return this.map.size;
  }
}

module.exports = LRUCache;
