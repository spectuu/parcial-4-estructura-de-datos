/**
 * Ejemplo simple de uso del sistema Conecta-DS
 * Para ejecutar: node src/examples/simpleExample.js
 */

import SocialNetwork from '../core/SocialNetwork.js';

console.log('\n EJEMPLO SIMPLE DE USO - CONECTA-DS\n');
console.log('═'.repeat(60));

// 1. Crear instancia de la red social
const red = new SocialNetwork();

// 2. Crear algunos usuarios
console.log('\n Creando usuarios...\n');
red.crearPerfil('USER001', 'Ana García', 25, 'F');
red.crearPerfil('USER002', 'Carlos Ruiz', 28, 'M');
red.crearPerfil('USER003', 'María López', 26, 'F');
red.crearPerfil('USER004', 'Pedro Sánchez', 30, 'M');
red.crearPerfil('USER005', 'Laura Torres', 24, 'F');

// 3. Crear amistades
console.log('\n Creando amistades...\n');
red.generarLazo('USER001', 'USER002', 5);  // Ana y Carlos son mejores amigos
red.generarLazo('USER001', 'USER003', 4);  // Ana y María son buenas amigas
red.generarLazo('USER002', 'USER004', 3);  // Carlos conoce a Pedro
red.generarLazo('USER003', 'USER005', 5);  // María y Laura son mejores amigas

// 4. Ver perfil de un usuario
console.log('\n Perfil de Ana García:\n');
red.visualizarArbolAmigos('USER001');

// 5. Generar sugerencias para Ana
console.log('\n Sugerencias de amigos para Ana:\n');
console.log('═'.repeat(60));
console.log('Ana tiene como mejores amigos a:');
console.log('  • Carlos (★★★★★) → Carlos conoce a Pedro');
console.log('  • María (★★★★☆) → María es mejor amiga de Laura');
console.log('\nPor lo tanto, las sugerencias priorizadas serán:');
console.log('  1. Laura - Alta prioridad (amiga de su buena amiga María)');
console.log('  2. Pedro - Alta prioridad (amigo de su mejor amigo Carlos)');
console.log('═'.repeat(60));

red.mostrarSugerencias('USER001', {}, 5);

// 6. Ver estadísticas
console.log('\n Estadísticas de la red:\n');
red.mostrarEstadisticas();

console.log('Ejemplo completado!\n');
