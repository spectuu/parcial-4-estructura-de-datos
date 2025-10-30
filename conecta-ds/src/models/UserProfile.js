/**
 * Clase que representa un perfil de usuario en la red social
 */
class UserProfile {
  /**
   * @param {string} userId - ID único del usuario
   * @param {string} nombreCompleto - Nombre completo del usuario
   * @param {number} edad - Edad del usuario
   * @param {string} genero - Género del usuario (M/F/Otro)
   */
  constructor(userId, nombreCompleto, edad, genero) {
    this.userId = userId;
    this.nombreCompleto = nombreCompleto;
    this.edad = edad;
    this.genero = genero;
    
    // Estructura interna para almacenar amigos directos
    // Map: friendId -> calidad de amistad (1-5)
    this.amigos = new Map();
  }

  /**
   * Añade un amigo a la lista de amigos del usuario
   * @param {string} friendId - ID del amigo
   * @param {number} calidad - Calidad de la amistad (1-5)
   * @returns {boolean}
   */
  addAmigo(friendId, calidad) {
    if (calidad < 1 || calidad > 5) {
      throw new Error('La calidad de amistad debe estar entre 1 y 5');
    }
    
    if (friendId === this.userId) {
      throw new Error('Un usuario no puede ser amigo de sí mismo');
    }
    
    this.amigos.set(friendId, calidad);
    return true;
  }

  /**
   * Elimina un amigo de la lista
   * @param {string} friendId - ID del amigo a eliminar
   * @returns {boolean}
   */
  removeAmigo(friendId) {
    return this.amigos.delete(friendId);
  }

  /**
   * Obtiene la calidad de amistad con un usuario específico
   * @param {string} friendId - ID del amigo
   * @returns {number|null} - Calidad de amistad o null si no son amigos
   */
  getCalidadAmistad(friendId) {
    return this.amigos.get(friendId) || null;
  }

  /**
   * Verifica si es amigo de un usuario
   * @param {string} friendId - ID del usuario a verificar
   * @returns {boolean}
   */
  esAmigoDe(friendId) {
    return this.amigos.has(friendId);
  }

  /**
   * Obtiene la lista de IDs de todos sus amigos
   * @returns {Array<string>}
   */
  getAmigosIds() {
    return Array.from(this.amigos.keys());
  }

  /**
   * Obtiene la lista de amigos con su calidad
   * @returns {Array<{friendId: string, calidad: number}>}
   */
  getAmigosConCalidad() {
    const amigosArray = [];
    
    for (let [friendId, calidad] of this.amigos) {
      amigosArray.push({ friendId, calidad });
    }
    
    return amigosArray;
  }

  /**
   * Obtiene el número total de amigos
   * @returns {number}
   */
  getNumeroAmigos() {
    return this.amigos.size;
  }

  /**
   * Obtiene una representación en string del perfil
   * @returns {string}
   */
  toString() {
    return `${this.nombreCompleto} (ID: ${this.userId}, Edad: ${this.edad}, Género: ${this.genero}, Amigos: ${this.getNumeroAmigos()})`;
  }

  /**
   * Obtiene el perfil en formato JSON
   * @returns {Object}
   */
  toJSON() {
    return {
      userId: this.userId,
      nombreCompleto: this.nombreCompleto,
      edad: this.edad,
      genero: this.genero,
      amigos: Array.from(this.amigos.entries()).map(([friendId, calidad]) => ({
        friendId,
        calidad
      })),
      numeroAmigos: this.getNumeroAmigos()
    };
  }

  /**
   * Crea un perfil desde un objeto JSON
   * @param {Object} json - Objeto con los datos del perfil
   * @returns {UserProfile}
   */
  static fromJSON(json) {
    const profile = new UserProfile(
      json.userId,
      json.nombreCompleto,
      json.edad,
      json.genero
    );
    
    if (json.amigos && Array.isArray(json.amigos)) {
      for (let amigo of json.amigos) {
        profile.addAmigo(amigo.friendId, amigo.calidad);
      }
    }
    
    return profile;
  }

  /**
   * Obtiene una descripción detallada del perfil con amigos
   * @returns {string}
   */
  getDescripcionDetallada() {
    let descripcion = `\n═══════════════════════════════════════\n`;
    descripcion += `  PERFIL DE USUARIO\n`;
    descripcion += `═══════════════════════════════════════\n`;
    descripcion += `  ID:     ${this.userId}\n`;
    descripcion += `  Nombre: ${this.nombreCompleto}\n`;
    descripcion += `  Edad:   ${this.edad} años\n`;
    descripcion += `  Género: ${this.genero}\n`;
    descripcion += `  Amigos: ${this.getNumeroAmigos()}\n`;
    descripcion += `═══════════════════════════════════════\n`;
    
    if (this.getNumeroAmigos() > 0) {
      descripcion += `  LISTA DE AMIGOS:\n`;
      descripcion += `───────────────────────────────────────\n`;
      
      const amigosOrdenados = this.getAmigosConCalidad()
        .sort((a, b) => b.calidad - a.calidad);
      
      for (let { friendId, calidad } of amigosOrdenados) {
        const estrellas = '★'.repeat(calidad) + '☆'.repeat(5 - calidad);
        descripcion += `  ${friendId.padEnd(15)} ${estrellas} (${calidad})\n`;
      }
      
      descripcion += `═══════════════════════════════════════\n`;
    }
    
    return descripcion;
  }
}

export default UserProfile;
