# 📋 Guía de Comandos y API

## 🚀 Comandos de Ejecución

### Ejecutar aplicación principal
```bash
npm start
# o
node src/main.js
```

### Ejecutar test de sugerencias
```bash
npm test
# o
node src/examples/testSuggestions.js
```

### Ejecutar ejemplo simple
```bash
node src/examples/simpleExample.js
```

---

## 🔧 API de la Clase SocialNetwork

### Constructor

```javascript
import SocialNetwork from './src/core/SocialNetwork.js';
const network = new SocialNetwork();
```

---

### Gestión de Perfiles

#### `crearPerfil(userId, nombreCompleto, edad, genero)`
Crea un nuevo perfil de usuario.

**Parámetros:**
- `userId` (string): ID único del usuario
- `nombreCompleto` (string): Nombre completo
- `edad` (number): Edad del usuario
- `genero` (string): 'M', 'F', u 'Otro'

**Retorna:** `boolean` - true si se creó exitosamente

**Ejemplo:**
```javascript
network.crearPerfil('U001', 'Ana García', 25, 'F');
```

---

#### `buscarPerfil(userId)`
Busca un perfil por su ID.

**Parámetros:**
- `userId` (string): ID del usuario a buscar

**Retorna:** `UserProfile | null`

**Ejemplo:**
```javascript
const perfil = network.buscarPerfil('U001');
if (perfil) {
  console.log(perfil.nombreCompleto);
}
```

---

#### `eliminarPerfil(userId)`
Elimina un perfil del sistema.

**Parámetros:**
- `userId` (string): ID del usuario a eliminar

**Retorna:** `boolean`

**Ejemplo:**
```javascript
network.eliminarPerfil('U001');
```

---

#### `cargarPerfiles(filePath)`
Carga perfiles masivamente desde un archivo CSV.

**Formato CSV:**
```csv
userId,nombreCompleto,edad,genero
U001,Ana García,25,F
U002,Carlos López,28,M
```

**Parámetros:**
- `filePath` (string): Ruta del archivo CSV

**Retorna:** `number` - Número de perfiles cargados

**Ejemplo:**
```javascript
const count = network.cargarPerfiles('./data/usuarios.csv');
console.log(`${count} perfiles cargados`);
```

---

### Gestión de Amistades

#### `generarLazo(userIdA, userIdB, calidad)`
Crea una amistad bidireccional entre dos usuarios.

**Parámetros:**
- `userIdA` (string): ID del primer usuario
- `userIdB` (string): ID del segundo usuario
- `calidad` (number): Calidad de la amistad (1-5)
  - 5: Mejores amigos ★★★★★
  - 4: Buenos amigos ★★★★☆
  - 3: Amigos ★★★☆☆
  - 2: Conocidos ★★☆☆☆
  - 1: Apenas conocidos ★☆☆☆☆

**Retorna:** `boolean`

**Ejemplo:**
```javascript
network.generarLazo('U001', 'U002', 5);  // Mejores amigos
network.generarLazo('U001', 'U003', 3);  // Amigos
```

---

#### `eliminarLazo(userIdA, userIdB)`
Elimina una amistad bidireccional.

**Parámetros:**
- `userIdA` (string): ID del primer usuario
- `userIdB` (string): ID del segundo usuario

**Retorna:** `boolean`

**Ejemplo:**
```javascript
network.eliminarLazo('U001', 'U002');
```

---

#### `cargarAmistades(filePath)`
Carga amistades masivamente desde un archivo CSV.

**Formato CSV:**
```csv
userA,userB,calidad
U001,U002,5
U001,U003,4
```

**Parámetros:**
- `filePath` (string): Ruta del archivo CSV

**Retorna:** `number` - Número de amistades cargadas

**Ejemplo:**
```javascript
const count = network.cargarAmistades('./data/amistades.csv');
```

---

### Motor de Sugerencias

#### `sugerirAmigos(userId, filtros, limite)`
Genera sugerencias de amigos priorizadas.

**Parámetros:**
- `userId` (string): ID del usuario
- `filtros` (Object, opcional): Objeto con filtros
  - `genero` (string): 'M' o 'F'
  - `edadMin` (number): Edad mínima
  - `edadMax` (number): Edad máxima
- `limite` (number, opcional): Número máximo de sugerencias (default: 10)

**Retorna:** `Array` de sugerencias ordenadas por prioridad

**Ejemplos:**
```javascript
// Sin filtros
const sugerencias = network.sugerirAmigos('U001');

// Solo mujeres
const mujeres = network.sugerirAmigos('U001', { genero: 'F' });

// Rango de edad
const jovenes = network.sugerirAmigos('U001', { 
  edadMin: 20, 
  edadMax: 30 
});

// Combinado
const resultado = network.sugerirAmigos('U001', {
  genero: 'M',
  edadMin: 25,
  edadMax: 30
}, 5);
```

---

#### `mostrarSugerencias(userId, filtros, limite)`
Muestra sugerencias formateadas en consola.

**Parámetros:** Igual que `sugerirAmigos()`

**Ejemplo:**
```javascript
network.mostrarSugerencias('U001', { genero: 'F' }, 5);
```

---

### Visualización y Estadísticas

#### `visualizarArbolAmigos(userId)`
Muestra el árbol de amigos de un usuario.

**Parámetros:**
- `userId` (string): ID del usuario

**Ejemplo:**
```javascript
network.visualizarArbolAmigos('U001');
```

---

#### `mostrarEstadisticas()`
Muestra estadísticas generales de la red social.

**Ejemplo:**
```javascript
network.mostrarEstadisticas();
```

---

#### `getEstadisticas()`
Obtiene estadísticas como objeto.

**Retorna:** `Object` con:
- `totalUsuarios` (number)
- `totalAmistades` (number)
- `promedioAmigos` (string)
- `maxAmigos` (number)
- `usuarioMasPopular` (string)
- `usuarioMenosSocial` (string)

**Ejemplo:**
```javascript
const stats = network.getEstadisticas();
console.log(`Total usuarios: ${stats.totalUsuarios}`);
```

---

#### `getAllProfiles()`
Obtiene todos los perfiles.

**Retorna:** `Array<UserProfile>`

**Ejemplo:**
```javascript
const perfiles = network.getAllProfiles();
perfiles.forEach(p => console.log(p.nombreCompleto));
```

---

## 🎨 API de la Clase UserProfile

### Propiedades
- `userId` (string): ID único
- `nombreCompleto` (string): Nombre completo
- `edad` (number): Edad
- `genero` (string): Género
- `amigos` (Map): Map de amigos con calidad

### Métodos Principales

#### `addAmigo(friendId, calidad)`
```javascript
profile.addAmigo('U002', 5);
```

#### `removeAmigo(friendId)`
```javascript
profile.removeAmigo('U002');
```

#### `esAmigoDe(friendId)`
```javascript
if (profile.esAmigoDe('U002')) {
  console.log('Son amigos');
}
```

#### `getAmigosIds()`
```javascript
const ids = profile.getAmigosIds();
// ['U002', 'U003', 'U004']
```

#### `getAmigosConCalidad()`
```javascript
const amigos = profile.getAmigosConCalidad();
// [{ friendId: 'U002', calidad: 5 }, ...]
```

#### `getNumeroAmigos()`
```javascript
const num = profile.getNumeroAmigos();
```

#### `toString()`
```javascript
console.log(profile.toString());
// "Ana García (ID: U001, Edad: 25, Género: F, Amigos: 3)"
```

#### `toJSON()`
```javascript
const json = profile.toJSON();
console.log(JSON.stringify(json, null, 2));
```

---

## 📊 Estructura de Objetos

### Sugerencia
```javascript
{
  userId: 'U005',
  profile: UserProfile,
  priority: 5,
  conexiones: [
    {
      through: 'U002',
      throughName: 'Carlos López',
      quality: 5
    }
  ]
}
```

### Estadísticas
```javascript
{
  totalUsuarios: 20,
  totalAmistades: 32,
  promedioAmigos: "3.20",
  maxAmigos: 4,
  usuarioMasPopular: "Ana García",
  usuarioMenosSocial: "Pedro Sánchez"
}
```

---

## 🔍 Ejemplos Completos

### Ejemplo 1: Setup Básico
```javascript
import SocialNetwork from './src/core/SocialNetwork.js';

const red = new SocialNetwork();

// Cargar datos
red.cargarPerfiles('./data/usuarios.csv');
red.cargarAmistades('./data/amistades.csv');

// Ver estadísticas
red.mostrarEstadisticas();
```

### Ejemplo 2: Gestión Manual
```javascript
const red = new SocialNetwork();

// Crear usuarios
red.crearPerfil('A', 'Ana', 25, 'F');
red.crearPerfil('B', 'Bob', 28, 'M');
red.crearPerfil('C', 'Carla', 26, 'F');

// Crear amistades
red.generarLazo('A', 'B', 5);
red.generarLazo('B', 'C', 4);

// Sugerencias
red.mostrarSugerencias('A');
```

### Ejemplo 3: Filtros Avanzados
```javascript
// Solo mujeres entre 22 y 28 años
red.mostrarSugerencias('U001', {
  genero: 'F',
  edadMin: 22,
  edadMax: 28
}, 10);
```

### Ejemplo 4: Procesamiento Programático
```javascript
const sugerencias = red.sugerirAmigos('U001', {}, 20);

sugerencias.forEach(sug => {
  console.log(`${sug.profile.nombreCompleto} - Prioridad: ${sug.priority}`);
  
  sug.conexiones.forEach(conn => {
    console.log(`  Conectado por: ${conn.throughName}`);
  });
});
```

---

## ⚠️ Manejo de Errores

El sistema lanza errores en estos casos:
- Calidad de amistad fuera de rango (1-5)
- Usuario intenta ser amigo de sí mismo
- Usuario no encontrado
- Archivo CSV no válido

**Ejemplo de manejo:**
```javascript
try {
  red.generarLazo('U001', 'U002', 10);  // Error: calidad fuera de rango
} catch (error) {
  console.error(error.message);
}
```

---

## 💡 Tips y Mejores Prácticas

1. **Cargar datos en orden:** Primero perfiles, luego amistades
2. **IDs únicos:** Asegúrate que los UserID sean únicos
3. **Calidad consistente:** Usa la misma escala en todo el sistema
4. **Filtros opcionales:** Todos los filtros son opcionales
5. **Límites razonables:** Para sugerencias, usa límites entre 5-20

---

## 📚 Referencias Rápidas

| Operación | Método | Complejidad |
|-----------|--------|-------------|
| Crear perfil | `crearPerfil()` | O(1) |
| Buscar perfil | `buscarPerfil()` | O(1) |
| Crear amistad | `generarLazo()` | O(1) |
| Sugerencias | `sugerirAmigos()` | O(A×F×log S) |
| Cargar N perfiles | `cargarPerfiles()` | O(N) |

---

Para más detalles, consulta:
- `README.md` - Documentación completa
- `RESUMEN_TECNICO.md` - Detalles técnicos
- `GUIA_RAPIDA.md` - Inicio rápido
