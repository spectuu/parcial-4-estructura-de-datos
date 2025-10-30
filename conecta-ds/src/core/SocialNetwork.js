import HashTable from '../dataStructures/HashTable.js';
import UserProfile from '../models/UserProfile.js';
import MaxHeap from '../dataStructures/MaxHeap.js';
import fs from 'fs';
import path from 'path';
import UnionFind from '../dataStructures/UnionFind.js';

/**
 * Clase principal
 */
class SocialNetwork {
  constructor() {
    this.profiles = new HashTable();
    this.unionFind = new UnionFind();
  }

  /**
   * Crear un nuevo perfil de usuario
   * @param {string} userId 
   * @param {string} nombreCompleto
   * @param {number} edad
   * @param {string} genero
   * @returns {boolean}
   */
  crearPerfil(userId, nombreCompleto, edad, genero) {
    if (this.profiles.has(userId)) {
      console.warn(`El perfil con ID "${userId}" ya existe`);
      return false;
    }

    const profile = new UserProfile(userId, nombreCompleto, edad, genero);
    this.profiles.insert(userId, profile);
    // Registrar en WQU
    this.unionFind.ensureUser(userId);

    console.log(`Perfil creado: ${profile.toString()}`);
    return true;
  }

  /**
   * Buscar un perfil por UserID
   * @param {string} userId
   * @returns {UserProfile|null}
   */
  buscarPerfil(userId) {
    const profile = this.profiles.search(userId);
    if (!profile) {
      console.warn(`No se encontró el perfil con ID "${userId}"`);
      return null;
    }
    return profile;
  }

  /**
   * Eliminar un perfil del sistema
   * @param {string} userId
   * @returns {boolean}
   */
  eliminarPerfil(userId) {
    const profile = this.profiles.search(userId);
    if (!profile) {
      console.warn(`No se encontró el perfil con ID "${userId}"`);
      return false;
    }

    // Eliminar al usuario de las listas de amigos de sus amigos
    const amigosIds = profile.getAmigosIds();
    for (let amigoId of amigosIds) {
      const amigo = this.profiles.search(amigoId);
      if (amigo) {
        amigo.removeAmigo(userId);
      }
    }

    this.profiles.delete(userId);
    console.log(`Perfil "${userId}" eliminado correctamente`);
    // Nota: Union-Find no soporta eliminación; si lo necesitas, reconstruye WQU.
    return true;
  }

  /**
   * Genera un lazo de amistad bidireccional entre dos usuarios
   * @param {string} userIdA
   * @param {string} userIdB
   * @param {number} calidad
   * @returns {boolean}
   */
  generarLazo(userIdA, userIdB, calidad) {
    if (calidad < 1 || calidad > 5) {
      console.error('La calidad de amistad debe estar entre 1 y 5');
      return false;
    }

    const profileA = this.profiles.search(userIdA);
    const profileB = this.profiles.search(userIdB);

    if (!profileA) {
      console.error(`No se encontró el perfil "${userIdA}"`);
      return false;
    }
    if (!profileB) {
      console.error(`No se encontró el perfil "${userIdB}"`);
      return false;
    }
    if (userIdA === userIdB) {
      console.error('Un usuario no puede ser amigo de sí mismo');
      return false;
    }

    try {
      profileA.addAmigo(userIdB, calidad);
      profileB.addAmigo(userIdA, calidad);

      // Unir componentes en WQU
      this.unionFind.unionById(userIdA, userIdB);

      const estrellas = '★'.repeat(calidad);
      console.log(`Amistad creada: ${userIdA} ↔ ${userIdB} (${estrellas} ${calidad}/5)`);
      return true;
    } catch (error) {
      console.error(`Error al generar lazo: ${error.message}`);
      return false;
    }
  }

  /**
   * Eliminar un lazo de amistad entre dos usuarios
   * @param {string} userIdA
   * @param {string} userIdB
   * @returns {boolean}
   */
  eliminarLazo(userIdA, userIdB) {
    const profileA = this.profiles.search(userIdA);
    const profileB = this.profiles.search(userIdB);

    if (!profileA || !profileB) {
      console.error('Uno o ambos usuarios no existen');
      return false;
    }

    const removedA = profileA.removeAmigo(userIdB);
    const removedB = profileB.removeAmigo(userIdA);

    if (removedA && removedB) {
      console.log(`Amistad eliminada: ${userIdA} ↮ ${userIdB}`);
      return true;
    }

    console.warn('Los usuarios no eran amigos');
    return false;
  }

  /**
   * Cargar perfiles masivamente desde un archivo CSV o TXT
   * Formato: userId,nombreCompleto,edad,genero
   * @param {string} filePath
   * @returns {number}
   */
  cargarPerfiles(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim() !== '');
      let count = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Saltar encabezado si existe
        if (i === 0 && line.toLowerCase().includes('userid')) continue;

        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 4) {
          const [userId, nombreCompleto, edad, genero] = parts;
          if (!this.profiles.has(userId)) {
            const profile = new UserProfile(userId, nombreCompleto, parseInt(edad), genero);
            this.profiles.insert(userId, profile);
            // Registrar en WQU
            this.unionFind.ensureUser(userId);
            count++;
          }
        }
      }

      console.log(`Cargados ${count} perfiles desde "${path.basename(filePath)}"`);
      return count;
    } catch (error) {
      console.error(`Error al cargar perfiles: ${error.message}`);
      return 0;
    }
  }

  /**
   * Cargar relaciones de amistad desde un archivo
   * Formato: userIdA,userIdB,calidad
   * @param {string} filePath
   * @returns {number}
   */
  cargarAmistades(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim() !== '');
      let count = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Saltar encabezado si existe
        if (i === 0 && line.toLowerCase().includes('user')) continue;

        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 3) {
          const [userIdA, userIdB, calidad] = parts;
          if (this.generarLazo(userIdA, userIdB, parseInt(calidad))) {
            count++;
          }
        }
      }

      console.log(`Cargadas ${count} amistades desde "${path.basename(filePath)}"`);
      return count;
    } catch (error) {
      console.error(`Error al cargar amistades: ${error.message}`);
      return 0;
    }
  }

  /**
   * Sugiere amigos para un usuario usando el motor de sugerencias inteligente
   * @param {string} userId - ID del usuario
   * @param {Object} filtros - Filtros opcionales {genero, edadMin, edadMax}
   * @param {number} limite - Número máximo de sugerencias (default: 10)
   * @returns {Array} - Array de sugerencias ordenadas por prioridad
   */
  sugerirAmigos(userId, filtros = {}, limite = 10) {
    const userProfile = this.profiles.search(userId);
    if (!userProfile) {
      console.error(`Usuario "${userId}" no encontrado`);
      return [];
    }

    const maxHeap = new MaxHeap();
    const sugerencias = new Map(); // Para evitar duplicados y acumular prioridades
    const amigosDirectos = new Set(userProfile.getAmigosIds());
    amigosDirectos.add(userId); // Excluir al usuario mismo

    // Iterar sobre todos los amigos directos del usuario
    for (let [amigoId, calidadXA] of userProfile.amigos) {
      const amigoProfile = this.profiles.search(amigoId);
      if (!amigoProfile) continue;

      // Iterar sobre los amigos del amigo (FoF - Friends of Friends)
      for (let [fofId, calidadAB] of amigoProfile.amigos) {
        // Si FoF no es el usuario y no es amigo directo
        if (!amigosDirectos.has(fofId)) {
          const fofProfile = this.profiles.search(fofId);
          if (!fofProfile) continue;

          // Aplicar filtros
          if (filtros.genero && fofProfile.genero !== filtros.genero) continue;
          if (filtros.edadMin && fofProfile.edad < filtros.edadMin) continue;
          if (filtros.edadMax && fofProfile.edad > filtros.edadMax) continue;

          // Prioridad: calidad de X–A (no A–B); acumula por múltiples caminos
          if (sugerencias.has(fofId)) {
            const existing = sugerencias.get(fofId);
            existing.priority = Math.max(existing.priority, calidadXA);
            existing.conexiones.push({
              through: amigoId,
              throughName: amigoProfile.nombreCompleto,
              quality: calidadXA
            });
          } else {
            sugerencias.set(fofId, {
              userId: fofId,
              profile: fofProfile,
              priority: calidadXA,
              conexiones: [{
                through: amigoId,
                throughName: amigoProfile.nombreCompleto,
                quality: calidadXA
              }]
            });
          }
        }
      }
    }

    for (let sugerencia of sugerencias.values()) {
      maxHeap.insert(sugerencia);
    }

    const resultados = [];
    let count = 0;
    while (!maxHeap.isEmpty() && count < limite) {
      resultados.push(maxHeap.extractMax());
      count++;
    }

    // 🔧 Empates: ordenar alfabéticamente por nombre dentro de la misma prioridad
    resultados.sort((a, b) => {
      const byPriority = b.priority - a.priority; // desc
      if (byPriority !== 0) return byPriority;
      return a.profile.nombreCompleto.localeCompare(b.profile.nombreCompleto, 'es');
    });

    return resultados;
  }

  /**
   * Muestra sugerencias de amigos formateadas
   * @param {string} userId
   * @param {Object} filtros
   * @param {number} limite
   */
  mostrarSugerencias(userId, filtros = {}, limite = 10) {
    const userProfile = this.profiles.search(userId);
    if (!userProfile) {
      console.error(`Usuario "${userId}" no encontrado`);
      return;
    }

    console.log(`\n${'═'.repeat(70)}`);
    console.log(`  SUGERENCIAS DE AMIGOS PARA: ${userProfile.nombreCompleto}`);
    console.log(`${'═'.repeat(70)}`);

    const sugerencias = this.sugerirAmigos(userId, filtros, limite);
    if (sugerencias.length === 0) {
      console.log('\n No hay sugerencias disponibles con los filtros aplicados\n');
      return;
    }

    for (let i = 0; i < sugerencias.length; i++) {
      const sug = sugerencias[i];
      const profile = sug.profile;
      const estrellas = '★'.repeat(sug.priority) + '☆'.repeat(5 - sug.priority);
      
      console.log(`\n  ${i + 1}. ${profile.nombreCompleto}`);
      console.log(`     ${'-'.repeat(60)}`);
      console.log(`     ID:        ${profile.userId}`);
      console.log(`     Edad:      ${profile.edad} años`);
      console.log(`     Género:    ${profile.genero}`);
      console.log(`     Prioridad: ${estrellas} (${sug.priority}/5)`);
      console.log(`     Conexión:`);
      for (let conexion of sug.conexiones) {
        console.log(`       → A través de: ${conexion.throughName} (★${conexion.quality})`);
      }
    }

    console.log(`\n${'═'.repeat(70)}\n`);
  }

  /**
   * Obtener estadísticas generales de la red social
   * @returns {Object}
   */
  getEstadisticas() {
    const profiles = this.profiles.getAllProfiles();
    let totalAmistades = 0;
    let maxAmigos = 0;
    let minAmigos = Infinity;
    let usuarioMasPopular = null;
    let usuarioMenosSocial = null;

    for (let profile of profiles) {
      const numAmigos = profile.getNumeroAmigos();
      totalAmistades += numAmigos;
      if (numAmigos > maxAmigos) {
        maxAmigos = numAmigos;
        usuarioMasPopular = profile;
      }
      if (numAmigos < minAmigos) {
        minAmigos = numAmigos;
        usuarioMenosSocial = profile;
      }
    }

    const totalUsuarios = profiles.length;
    const promedioAmigos = totalUsuarios > 0 ? (totalAmistades / totalUsuarios).toFixed(2) : 0;

    return {
      totalUsuarios,
      totalAmistades: totalAmistades / 2, // bidireccionales
      promedioAmigos,
      maxAmigos,
      usuarioMasPopular: usuarioMasPopular ? usuarioMasPopular.nombreCompleto : 'N/A',
      usuarioMenosSocial: usuarioMenosSocial ? usuarioMenosSocial.nombreCompleto : 'N/A'
    };
  }

  /**
   * Muestra estadísticas de la red social
   */
  mostrarEstadisticas() {
    const stats = this.getEstadisticas();
    
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`  ESTADÍSTICAS DE LA RED SOCIAL`);
    console.log(`${'═'.repeat(70)}`);
    console.log(`  Total de usuarios:         ${stats.totalUsuarios}`);
    console.log(`  Total de amistades:        ${stats.totalAmistades}`);
    console.log(`  Promedio de amigos:        ${stats.promedioAmigos}`);
    console.log(`  Máximo de amigos:          ${stats.maxAmigos}`);
    console.log(`  Usuario más popular:       ${stats.usuarioMasPopular}`);
    console.log(`  Usuario menos social:      ${stats.usuarioMenosSocial}`);
    console.log(`${'═'.repeat(70)}\n`);
    
    // Estadísticas de la tabla hash
    const hashStats = this.profiles.getStats();
    console.log(`  ESTADÍSTICAS DE LA TABLA HASH`);
    console.log(`${'═'.repeat(70)}`);
    console.log(`  Tamaño de la tabla:        ${hashStats.size}`);
    console.log(`  Buckets utilizados:        ${hashStats.bucketsUsed}`);
    console.log(`  Factor de carga:           ${hashStats.loadFactor}`);
    console.log(`  Long. promedio de cadena:  ${hashStats.avgChainLength}`);
    console.log(`  Long. máxima de cadena:    ${hashStats.maxChainLength}`);
    console.log(`${'═'.repeat(70)}\n`);
  }

  /**
   * Visualiza el árbol de amigos de un usuario
   * @param {string} userId
   */
  visualizarArbolAmigos(userId) {
    const profile = this.profiles.search(userId);
    if (!profile) {
      console.error(`Usuario "${userId}" no encontrado`);
      return;
    }
    console.log(profile.getDescripcionDetallada());
  }

  /**
   * Obtener todos los perfiles
   * @returns {Array<UserProfile>}
   */
  getAllProfiles() {
    return this.profiles.getAllProfiles();
  }

  // ====== WQU / Componentes Conectados ======
  estanConectados(aId, bId) {
    return this.unionFind.connectedById(aId, bId);
  }
  
  tamanoComponente(aId) {
    return this.unionFind.componentSizeById(aId);
  }
  
  componentesTotales() {
    return this.unionFind.count;
  }
}

export default SocialNetwork;
