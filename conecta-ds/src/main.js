import SocialNetwork from './core/SocialNetwork.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Función principal de demostración del sistema Conecta-DS
 */
async function main() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                   ║');
  console.log('║                  SIMULACIÓN DE RED SOCIAL "CONECTA-DS"            ║');
  console.log('║                                                                   ║');
  console.log('║        Sistema de Gestión de Perfiles y Sugerencias Inteligentes  ║');
  console.log('║                                                                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  console.log('\n');

  // Crear instancia de la red social
  const network = new SocialNetwork();

  // ===================================================================
  // SECCIÓN 1: CARGA MASIVA DE DATOS
  // ===================================================================
  console.log(' PASO 1: Cargando perfiles desde archivo CSV...\n');
  
  const usuariosPath = path.join(__dirname, '../data/usuarios.csv');
  network.cargarPerfiles(usuariosPath);

  console.log('\n PASO 2: Cargando amistades desde archivo CSV...\n');
  
  const amistadesPath = path.join(__dirname, '../data/amistades.csv');
  network.cargarAmistades(amistadesPath);

  // ===================================================================
  // SECCIÓN 2.1: COMPONENTES CONECTADOS (WQU)
  // ===================================================================
  console.log('\n PASO 2.1: Verificando componentes conectados (WQU)...\n');
  console.log('  ¿U001 y U010 están conectados? ->',
    network.estanConectados('U001', 'U010'));
  console.log('  Tamaño del componente de U001 ->',
    network.tamanoComponente('U001'));
  console.log('  Número total de componentes ->',
    network.componentesTotales());

  // ===================================================================
  // SECCIÓN 2: ESTADÍSTICAS GENERALES
  // ===================================================================
  console.log('\n PASO 3: Mostrando estadísticas de la red social...\n');
  network.mostrarEstadisticas();

  // ===================================================================
  // SECCIÓN 3: BÚSQUEDA Y VISUALIZACIÓN DE PERFILES
  // ===================================================================
  console.log('\n PASO 4: Buscando y visualizando perfiles específicos...\n');
  
  const ana = network.buscarPerfil('U001');
  if (ana) {
    console.log(`\n✓ Perfil encontrado: ${ana.toString()}`);
  }

  console.log('\n Visualizando el árbol de amigos de Ana García...');
  network.visualizarArbolAmigos('U001');

  // ===================================================================
  // SECCIÓN 4: CREACIÓN MANUAL DE PERFILES Y AMISTADES
  // ===================================================================
  console.log('\n PASO 5: Creando nuevos perfiles manualmente...\n');
  
  network.crearPerfil('U021', 'Daniela Moreno Vázquez', 24, 'F');
  network.crearPerfil('U022', 'Ricardo Campos Silva', 27, 'M');
  network.crearPerfil('U023', 'Valentina Ruiz Herrera', 25, 'F');

  console.log('\n Generando nuevas amistades...\n');
  
  network.generarLazo('U001', 'U021', 5); // Ana es mejor amiga de Daniela
  network.generarLazo('U021', 'U022', 4); // Daniela es buena amiga de Ricardo
  network.generarLazo('U021', 'U023', 3); // Daniela conoce a Valentina

  // ===================================================================
  // SECCIÓN 5.1: COMPONENTES CONECTADOS (WQU) tras nuevas amistades
  // ===================================================================
  console.log('\n PASO 5.1: Conectividad tras nuevas amistades (WQU)...\n');
  console.log('  ¿U001 y U023 están conectados? ->',
    network.estanConectados('U001', 'U023'));
  console.log('  Tamaño del componente de U001 ->',
    network.tamanoComponente('U001'));
  console.log('  Número total de componentes ->',
    network.componentesTotales());

  // ===================================================================
  // SECCIÓN 5: MOTOR DE SUGERENCIAS INTELIGENTES
  // ===================================================================
  console.log('\n PASO 6: Generando sugerencias de amigos inteligentes...\n');
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  EJEMPLO 1: Sugerencias para Ana García (sin filtros)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  network.mostrarSugerencias('U001', {}, 5);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  EJEMPLO 2: Sugerencias para Carlos López (solo mujeres)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  network.mostrarSugerencias('U002', { genero: 'F' }, 5);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  EJEMPLO 3: Sugerencias para María (edad 25-30)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  network.mostrarSugerencias('U003', { edadMin: 25, edadMax: 30 }, 5);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  EJEMPLO 4: Sugerencias para Juan (hombres de 25-30 años)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  network.mostrarSugerencias('U004', { genero: 'M', edadMin: 25, edadMax: 30 }, 5);

  // ===================================================================
  // SECCIÓN 6: DEMOSTRACIÓN DE PRIORIZACIÓN
  // ===================================================================
  console.log('\n PASO 7: Demostrando la lógica de priorización...\n');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  EXPLICACIÓN DEL ALGORITMO DE PRIORIZACIÓN');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');
  console.log('  El motor de sugerencias prioriza "amigos de mis MEJORES amigos"');
  console.log('  basándose en la calidad de MIS amistades directas, no en las de');
  console.log('  mis amigos.');
  console.log('');
  console.log('  Ejemplo:');
  console.log('  • Si soy "Mejor Amigo" (★★★★★) de Ana');
  console.log('  • Y Ana es "Conocida" (★) de Pedro');
  console.log('  → Pedro será sugerido con PRIORIDAD ALTA (5)');
  console.log('    porque es amigo de MI mejor amiga');
  console.log('');
  console.log('  • Si soy "Conocido" (★) de Roberto');
  console.log('  • Y Roberto es "Mejor Amigo" (★★★★★) de Luis');
  console.log('  → Luis será sugerido con PRIORIDAD BAJA (1)');
  console.log('    porque Roberto no es de mis mejores amigos');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');

  // ===================================================================
  // SECCIÓN 7: OPERACIONES ADICIONALES
  // ===================================================================
  console.log('\n\nPASO 8: Demostrando operaciones adicionales...\n');
  
  console.log(' Visualizando perfil detallado de un usuario nuevo:');
  network.visualizarArbolAmigos('U021');

  console.log('  Eliminando un lazo de amistad...\n');
  network.eliminarLazo('U001', 'U006');

  console.log('\n Eliminando un perfil...\n');
  network.eliminarPerfil('U023');

  // ===================================================================
  // SECCIÓN 8: ESTADÍSTICAS FINALES
  // ===================================================================
  console.log('\n PASO 9: Estadísticas finales de la red social...\n');
  network.mostrarEstadisticas();

  // ===================================================================
  // CONCLUSIÓN
  // ===================================================================
  console.log('\n╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                     ║');
  console.log('║                      DEMOSTRACIÓN COMPLETADA                        ║');
  console.log('║                                                                     ║');
  console.log('║     El sistema Conecta-DS ha demostrado todas sus funcionalidades.  ║');
  console.log('║                                                                     ║');
  console.log('║  ✓ Gestión de perfiles con Tabla Hash                               ║');
  console.log('║  ✓ Conexiones de amistad bidireccionales                            ║');
  console.log('║  ✓ Motor de sugerencias con Max-Heap                                ║');
  console.log('║  ✓ Priorización inteligente (amigos de mejores amigos)              ║');
  console.log('║  ✓ Filtros avanzados (género, edad)                                 ║');
  console.log('║  ✓ Carga masiva desde archivos CSV                                  ║');
  console.log('║  ✓ Visualización de árboles de amistad                              ║');
  console.log('║                                                                     ║');
  console.log('╚═════════════════════════════════════════════════════════════════════╝');
  console.log('\n');
}

// Ejecutar la función principal
main().catch(console.error);
