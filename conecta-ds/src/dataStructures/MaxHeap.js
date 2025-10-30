/**
 * Max-Heap (Cola de Prioridad Máxima)
 * Implementación para gestionar sugerencias de amigos priorizadas
 */
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  /**
   * Obtiene el índice del padre de un nodo
   * @param {number} index
   * @returns {number}
   */
  _parent(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Obtiene el índice del hijo izquierdo
   * @param {number} index
   * @returns {number}
   */
  _leftChild(index) {
    return 2 * index + 1;
  }

  /**
   * Obtiene el índice del hijo derecho
   * @param {number} index
   * @returns {number}
   */
  _rightChild(index) {
    return 2 * index + 2;
  }

  /**
   * Intercambia dos elementos en el heap
   * @param {number} i
   * @param {number} j
   */
  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * Inserta un nuevo elemento en el heap
   * @param {Object} element - Elemento a insertar {userId, priority, profile}
   */
  insert(element) {
    this.heap.push(element);
    this._heapifyUp(this.heap.length - 1);
  }

  /**
   * Reorganiza el heap hacia arriba después de una inserción
   * @param {number} index
   */
  _heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this._parent(index);
      
      // Si el elemento actual tiene mayor prioridad que su padre, intercambiar
      if (this.heap[index].priority > this.heap[parentIndex].priority) {
        this._swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Extrae el elemento con mayor prioridad
   * @returns {Object|null}
   */
  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }
    
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);
    
    return max;
  }

  /**
   * Reorganiza el heap hacia abajo después de una extracción
   * @param {number} index
   */
  _heapifyDown(index) {
    const length = this.heap.length;
    
    while (true) {
      let largest = index;
      const left = this._leftChild(index);
      const right = this._rightChild(index);
      
      if (left < length && this.heap[left].priority > this.heap[largest].priority) {
        largest = left;
      }
      
      if (right < length && this.heap[right].priority > this.heap[largest].priority) {
        largest = right;
      }
      
      if (largest !== index) {
        this._swap(index, largest);
        index = largest;
      } else {
        break;
      }
    }
  }

  /**
   * Obtiene el elemento con mayor prioridad sin extraerlo
   * @returns {Object|null}
   */
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  /**
   * Verifica si el heap está vacío
   * @returns {boolean}
   */
  isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * Obtiene el tamaño del heap
   * @returns {number}
   */
  size() {
    return this.heap.length;
  }

  /**
   * Limpia el heap
   */
  clear() {
    this.heap = [];
  }

  /**
   * Convierte el heap en un array ordenado (mayor a menor prioridad)
   * Nota: Esta operación destruye el heap
   * @returns {Array}
   */
  toSortedArray() {
    const sorted = [];
    
    while (!this.isEmpty()) {
      sorted.push(this.extractMax());
    }
    
    return sorted;
  }

  /**
   * Obtiene todos los elementos sin modificar el heap
   * @returns {Array}
   */
  getAll() {
    return [...this.heap];
  }

  /**
   * Construye un heap a partir de un array
   * @param {Array} array - Array de elementos
   */
  buildHeap(array) {
    this.heap = [...array];
    
    // Comenzar desde el último nodo no-hoja y hacer heapify down
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this._heapifyDown(i);
    }
  }

  /**
   * Muestra una representación visual del heap
   * @returns {string}
   */
  visualize() {
    if (this.isEmpty()) {
      return 'Heap vacío';
    }

    let result = '\nMax-Heap (Cola de Prioridad):\n';
    result += '═══════════════════════════════════════\n';
    
    const height = Math.floor(Math.log2(this.heap.length)) + 1;
    let index = 0;
    
    for (let level = 0; level < height && index < this.heap.length; level++) {
      const nodesInLevel = Math.min(Math.pow(2, level), this.heap.length - index);
      const spaces = ' '.repeat(Math.pow(2, height - level - 1) - 1);
      
      result += spaces;
      
      for (let i = 0; i < nodesInLevel && index < this.heap.length; i++) {
        const node = this.heap[index];
        const nodeStr = `[${node.userId}:${node.priority}]`;
        result += nodeStr;
        
        if (i < nodesInLevel - 1) {
          result += ' '.repeat(Math.pow(2, height - level) - nodeStr.length);
        }
        
        index++;
      }
      
      result += '\n';
    }
    
    result += '═══════════════════════════════════════\n';
    return result;
  }
}

export default MaxHeap;
