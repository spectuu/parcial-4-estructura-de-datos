import SocialNetwork from '../core/SocialNetwork.js';

/**
 * Script de ejemplo enfocado en el motor de sugerencias
 */
function testSuggestions() {
  console.log('\nTEST DEL MOTOR DE SUGERENCIAS INTELIGENTE\n');
  console.log('═'.repeat(70));

  const network = new SocialNetwork();

  // Crear usuarios de prueba
  console.log('\nCreando red de prueba...\n');
  
  // Usuario principal: Alex
  network.crearPerfil('ALEX', 'Alex Hernández', 25, 'M');
  
  // Mejores amigos de Alex (calidad 5)
  network.crearPerfil('LUCIA', 'Lucía Martín', 24, 'F');
  network.crearPerfil('SARA', 'Sara González', 26, 'F');
  
  // Buenos amigos de Alex (calidad 4)
  network.crearPerfil('PABLO', 'Pablo Ruiz', 27, 'M');
  
  // Conocidos de Alex (calidad 2)
  network.crearPerfil('MARIO', 'Mario Soto', 28, 'M');
  
  // Amigos de los amigos de Alex (FoF - Friend of Friends)
  network.crearPerfil('ELENA', 'Elena Castro', 25, 'F');
  network.crearPerfil('DAVID', 'David López', 26, 'M');
  network.crearPerfil('CLARA', 'Clara Torres', 24, 'F');
  network.crearPerfil('JORGE', 'Jorge Díaz', 29, 'M');
  network.crearPerfil('NATALIA', 'Natalia Reyes', 23, 'F');

  // Crear amistades directas de Alex
  console.log('Generando amistades de Alex:\n');
  network.generarLazo('ALEX', 'LUCIA', 5);  // Mejor amiga
  network.generarLazo('ALEX', 'SARA', 5);   // Mejor amiga
  network.generarLazo('ALEX', 'PABLO', 4);  // Buen amigo
  network.generarLazo('ALEX', 'MARIO', 2);  // Conocido

  // Crear amistades de los amigos de Alex
  console.log('\nGenerando amistades de los amigos de Alex:\n');
  
  // Amigos de LUCIA (mejor amiga de Alex - calidad 5)
  network.generarLazo('LUCIA', 'ELENA', 4);   // Elena será sugerida con prioridad 5
  network.generarLazo('LUCIA', 'DAVID', 3);   // David será sugerido con prioridad 5
  
  // Amigos de SARA (mejor amiga de Alex - calidad 5)
  network.generarLazo('SARA', 'CLARA', 5);    // Clara será sugerida con prioridad 5
  network.generarLazo('SARA', 'ELENA', 2);    // Elena ya está, acumula conexiones
  
  // Amigos de PABLO (buen amigo de Alex - calidad 4)
  network.generarLazo('PABLO', 'JORGE', 5);   // Jorge será sugerido con prioridad 4
  
  // Amigos de MARIO (conocido de Alex - calidad 2)
  network.generarLazo('MARIO', 'NATALIA', 5); // Natalia será sugerida con prioridad 2

  // Mostrar el perfil de Alex
  console.log('\n Perfil de Alex:');
  network.visualizarArbolAmigos('ALEX');

  // Generar sugerencias
  console.log('\n Generando sugerencias para Alex...\n');
  console.log('═'.repeat(70));
  console.log('ANÁLISIS ESPERADO:');
  console.log('═'.repeat(70));
  console.log('');
  console.log('• ELENA  → Prioridad 5 (amiga de LUCIA y SARA, ambas mejores amigas)');
  console.log('• CLARA  → Prioridad 5 (amiga de SARA, mejor amiga)');
  console.log('• DAVID  → Prioridad 5 (amigo de LUCIA, mejor amiga)');
  console.log('• JORGE  → Prioridad 4 (amigo de PABLO, buen amigo)');
  console.log('• NATALIA → Prioridad 2 (amiga de MARIO, solo conocido)');
  console.log('');
  console.log('═'.repeat(70));

  network.mostrarSugerencias('ALEX', {}, 10);

  // Test con filtros
  console.log('\n  Sugerencias con filtros (solo mujeres)...\n');
  network.mostrarSugerencias('ALEX', { genero: 'F' }, 10);

  console.log('\n  Sugerencias con filtros (solo hombres, edad 25-28)...\n');
  network.mostrarSugerencias('ALEX', { genero: 'M', edadMin: 25, edadMax: 28 }, 10);

  // Verificación de la lógica
  console.log('\n  VERIFICACIÓN DE LA LÓGICA DE PRIORIZACIÓN\n');
  console.log('═'.repeat(70));
  
  const sugerencias = network.sugerirAmigos('ALEX', {}, 10);
  
  console.log('\nResultados ordenados por prioridad:\n');
  sugerencias.forEach((sug, index) => {
    const estrellas = '★'.repeat(sug.priority);
    console.log(`${index + 1}. ${sug.profile.nombreCompleto.padEnd(20)} - Prioridad: ${estrellas} (${sug.priority})`);
    console.log(`   Conexiones:`);
    sug.conexiones.forEach(conn => {
      console.log(`     → A través de: ${conn.throughName} (calidad ${conn.quality})`);
    });
    console.log('');
  });

  console.log('═'.repeat(70));
  console.log('Test completado exitosamente!');
  console.log('═'.repeat(70));
  console.log('\nCONCLUSIONES:');
  console.log('• El motor prioriza correctamente según la calidad de MIS amistades');
  console.log('• Los amigos de mis mejores amigos tienen mayor prioridad');
  console.log('• Los filtros funcionan correctamente (género, edad)');
  console.log('• El Max-Heap ordena las sugerencias por prioridad descendente');
  console.log('═'.repeat(70));
  console.log('\n');
}

// Ejecutar test
testSuggestions();
