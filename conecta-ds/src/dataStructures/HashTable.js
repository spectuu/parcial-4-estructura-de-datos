/**
 * Tabla Hash para almacenamiento eficiente de perfiles de usuario
 * Implementa encadenamiento (chaining) para resolver colisiones
 */
class HashTable {
  /**
   * @param {number} size - Tamaño inicial de la tabla hash
   */
  constructor(size = 100) {
    this.size = size;
    this.table = new Array(size);
    this.count = 0;
  }

  /**
   * Función hash que convierte un UserID en un índice
   * @param {string} key - UserID
   * @returns {number} - Índice en la tabla
   */
  _hash(key) {
    let hash = 0;
    const str = String(key);
    
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash; // Convertir a entero de 32 bits
    }
    
    return Math.abs(hash) % this.size;
  }

  /**
   * Inserta un nuevo perfil en la tabla hash
   * @param {string} key - UserID
   * @param {Object} value - Objeto perfil de usuario
   * @returns {boolean} - true si se insertó correctamente
   */
  insert(key, value) {
    const index = this._hash(key);
    
    if (!this.table[index]) {
      this.table[index] = [];
    }
    
    // Verificar si la clave ya existe
    const bucket = this.table[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Actualizar valor existente
        return true;
      }
    }
    
    // Insertar nuevo par clave-valor
    bucket.push([key, value]);
    this.count++;
    
    // Redimensionar si el factor de carga es muy alto
    if (this.count / this.size > 0.75) {
      this._resize();
    }
    
    return true;
  }

  /**
   * Busca un perfil por UserID
   * @param {string} key - UserID
   * @returns {Object|null} - Perfil encontrado o null
   */
  search(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    
    if (!bucket) {
      return null;
    }
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    
    return null;
  }

  /**
   * Elimina un perfil de la tabla hash
   * @param {string} key - UserID
   * @returns {boolean} - true si se eliminó correctamente
   */
  delete(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    
    if (!bucket) {
      return false;
    }
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    
    return false;
  }

  /**
   * Redimensiona la tabla hash cuando el factor de carga es alto
   * @private
   */
  _resize() {
    const oldTable = this.table;
    this.size *= 2;
    this.table = new Array(this.size);
    this.count = 0;
    
    for (let bucket of oldTable) {
      if (bucket) {
        for (let [key, value] of bucket) {
          this.insert(key, value);
        }
      }
    }
  }

  /**
   * Obtiene todos los perfiles almacenados
   * @returns {Array} - Array de perfiles
   */
  getAllProfiles() {
    const profiles = [];
    
    for (let bucket of this.table) {
      if (bucket) {
        for (let [key, value] of bucket) {
          profiles.push(value);
        }
      }
    }
    
    return profiles;
  }

  /**
   * Obtiene el número de perfiles almacenados
   * @returns {number}
   */
  getCount() {
    return this.count;
  }

  /**
   * Verifica si existe un perfil con el UserID dado
   * @param {string} key - UserID
   * @returns {boolean}
   */
  has(key) {
    return this.search(key) !== null;
  }

  /**
   * Limpia toda la tabla hash
   */
  clear() {
    this.table = new Array(this.size);
    this.count = 0;
  }

  /**
   * Muestra estadísticas de la tabla hash (útil para debugging)
   * @returns {Object}
   */
  getStats() {
    let bucketsUsed = 0;
    let maxChainLength = 0;
    let totalChainLength = 0;
    
    for (let bucket of this.table) {
      if (bucket && bucket.length > 0) {
        bucketsUsed++;
        totalChainLength += bucket.length;
        maxChainLength = Math.max(maxChainLength, bucket.length);
      }
    }
    
    return {
      size: this.size,
      count: this.count,
      bucketsUsed,
      loadFactor: (this.count / this.size).toFixed(3),
      avgChainLength: bucketsUsed > 0 ? (totalChainLength / bucketsUsed).toFixed(2) : 0,
      maxChainLength
    };
  }
}

export default HashTable;
