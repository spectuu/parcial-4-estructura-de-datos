export default class UnionFind {
    constructor(n = 0) {
      this.parent = Array.from({ length: n }, (_, i) => i);
      this.size = Array(n).fill(1);
      this.count = n;
      this.indexById = new Map();
      this.idByIndex = [];
    }
  
    ensureUser(userId) {
      if (this.indexById.has(userId)) return this.indexById.get(userId);
      const i = this.parent.length;
      this.parent.push(i);
      this.size.push(1);
      this.count++;
      this.indexById.set(userId, i);
      this.idByIndex[i] = userId;
      return i;
    }
  
    find(i) {
      while (i !== this.parent[i]) {
        this.parent[i] = this.parent[this.parent[i]];
        i = this.parent[i];
      }
      return i;
    }
  
    unionByIndex(a, b) {
      let ra = this.find(a), rb = this.find(b);
      if (ra === rb) return false;
      if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
      this.parent[rb] = ra;
      this.size[ra] += this.size[rb];
      this.count--;
      return true;
    }
  
    unionById(aId, bId) {
      const a = this.ensureUser(aId);
      const b = this.ensureUser(bId);
      return this.unionByIndex(a, b);
    }
  
    connectedById(aId, bId) {
      if (!this.indexById.has(aId) || !this.indexById.has(bId)) return false;
      return this.find(this.indexById.get(aId)) === this.find(this.indexById.get(bId));
    }
  
    componentSizeById(aId) {
      if (!this.indexById.has(aId)) return 0;
      const root = this.find(this.indexById.get(aId));
      return this.size[root];
    }
  }
  