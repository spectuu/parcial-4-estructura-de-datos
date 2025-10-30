# HECHO POR NICOLAS AGUDELO MESA Y SANTIAGO ANDRES MARTINEZ LORA


# 🌐 Conecta-DS - Simulación de Red Social

Sistema completo de simulación de red social con motor de sugerencias inteligente basado en estructuras de datos avanzadas.

## 📋 Descripción del Proyecto

**Conecta-DS** es una simulación de red social que implementa:

- ✅ **Gestión eficiente de perfiles** usando Tabla Hash
- ✅ **Conexiones de amistad bidireccionales** con niveles de calidad (1-5 estrellas)
- ✅ **Motor de sugerencias inteligente** que prioriza "amigos de mis mejores amigos"
- ✅ **Filtros avanzados** por género y rango de edad
- ✅ **Carga masiva de datos** desde archivos CSV
- ✅ **Visualización** de árboles de amistad en consola

## 🏗️ Arquitectura del Proyecto

```
conecta-ds/
├── src/
│   ├── core/
│   │   └── SocialNetwork.js       # Clase principal del sistema
│   ├── dataStructures/
│   │   ├── HashTable.js           # Tabla Hash con encadenamiento
│   │   └── MaxHeap.js             # Cola de prioridad máxima
│   ├── models/
│   │   └── UserProfile.js         # Modelo de perfil de usuario
│   ├── examples/
│   │   └── testSuggestions.js     # Test del motor de sugerencias
│   └── main.js                    # Aplicación principal
├── data/
│   ├── usuarios.csv               # Datos de usuarios
│   └── amistades.csv              # Datos de amistades
├── package.json
└── README.md
```

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js >= 14.0.0

### Pasos de Instalación

1. **Clonar o descargar el proyecto**

```bash
cd conecta-ds
```

2. **Ejecutar la aplicación principal**

```bash
npm start
```

3. **Ejecutar el test del motor de sugerencias**

```bash
npm test
```

## 📚 Estructuras de Datos Implementadas

### 1. Tabla Hash (Hash Table)

**Archivo:** `src/dataStructures/HashTable.js`

- **Propósito:** Almacenar y gestionar perfiles de usuario eficientemente
- **Técnica de colisión:** Encadenamiento (Chaining)
- **Función hash:** Algoritmo djb2 modificado
- **Redimensionamiento:** Automático cuando el factor de carga > 0.75
- **Complejidad:**
  - Inserción: O(1) promedio
  - Búsqueda: O(1) promedio
  - Eliminación: O(1) promedio

**Métodos principales:**
- `insert(key, value)` - Insertar perfil
- `search(key)` - Buscar perfil por ID
- `delete(key)` - Eliminar perfil
- `getAllProfiles()` - Obtener todos los perfiles
- `getStats()` - Estadísticas de la tabla

### 2. Max-Heap (Cola de Prioridad Máxima)

**Archivo:** `src/dataStructures/MaxHeap.js`

- **Propósito:** Gestionar sugerencias de amigos priorizadas
- **Tipo:** Heap binario máximo
- **Complejidad:**
  - Inserción: O(log n)
  - Extracción máximo: O(log n)
  - Peek (ver máximo): O(1)

**Métodos principales:**
- `insert(element)` - Insertar con prioridad
- `extractMax()` - Extraer elemento de mayor prioridad
- `peek()` - Ver el máximo sin extraer
- `toSortedArray()` - Convertir a array ordenado

### 3. Modelo de Perfil de Usuario

**Archivo:** `src/models/UserProfile.js`

**Estructura interna:**
```javascript
{
  userId: string,
  nombreCompleto: string,
  edad: number,
  genero: string,
  amigos: Map<friendId, calidad>
}
```

**Métodos principales:**
- `addAmigo(friendId, calidad)` - Añadir amigo
- `removeAmigo(friendId)` - Eliminar amigo
- `getCalidadAmistad(friendId)` - Obtener calidad de amistad
- `esAmigoDe(friendId)` - Verificar amistad
- `getAmigosConCalidad()` - Lista de amigos con calidad

## 🎯 Funcionalidades Principales

### 1. Gestión de Perfiles

```javascript
import SocialNetwork from './core/SocialNetwork.js';

const network = new SocialNetwork();

// Crear perfil
network.crearPerfil('U001', 'Ana García', 25, 'F');

// Buscar perfil
const perfil = network.buscarPerfil('U001');

// Eliminar perfil
network.eliminarPerfil('U001');

// Cargar perfiles desde CSV
network.cargarPerfiles('./data/usuarios.csv');
```

### 2. Gestión de Amistades

```javascript
// Generar lazo bidireccional con calidad 1-5
network.generarLazo('U001', 'U002', 5);  // Mejores amigos (★★★★★)
network.generarLazo('U001', 'U003', 3);  // Buenos amigos (★★★☆☆)
network.generarLazo('U001', 'U004', 1);  // Conocidos (★☆☆☆☆)

// Eliminar amistad
network.eliminarLazo('U001', 'U002');

// Cargar amistades desde CSV
network.cargarAmistades('./data/amistades.csv');
```

### 3. Motor de Sugerencias Inteligente

**Lógica de Priorización:**

El sistema sugiere "amigos de amigos" (FoF) priorizando según la **calidad de MIS amistades directas**, no las de mis amigos.

**Ejemplo:**

```
Si YO soy "Mejor Amigo" (★★★★★) de Ana,
y Ana es "Conocida" (★) de Pedro,
→ Pedro será sugerido con PRIORIDAD ALTA (5)
  porque es amigo de MI mejor amiga

Si YO soy "Conocido" (★) de Roberto,
y Roberto es "Mejor Amigo" (★★★★★) de Luis,
→ Luis será sugerido con PRIORIDAD BAJA (1)
  porque Roberto no es de mis mejores amigos
```

**Uso:**

```javascript
// Sin filtros
const sugerencias = network.sugerirAmigos('U001');

// Con filtros
network.mostrarSugerencias('U001', {
  genero: 'F',        // Solo mujeres
  edadMin: 25,        // Edad mínima
  edadMax: 30         // Edad máxima
}, 10);               // Límite de sugerencias
```

**Algoritmo:**

1. Iterar sobre todos los amigos directos de X (Amigo A)
2. Obtener la calidad de amistad Q = calidad(X, A)
3. Iterar sobre todos los amigos de A (Amigo B - FoF)
4. Si B no es X y B no es amigo directo de X:
   - Insertar B en Max-Heap con prioridad Q
5. Aplicar filtros (género, edad)
6. Extraer top N sugerencias del Max-Heap

**Complejidad:** O(A × F × log S)
- A = número de amigos directos
- F = promedio de amigos por amigo
- S = número de sugerencias

### 4. Visualización

```javascript
// Visualizar árbol de amigos
network.visualizarArbolAmigos('U001');

// Ver estadísticas
network.mostrarEstadisticas();
```

## 📊 Formato de Archivos CSV

### usuarios.csv

```csv
userId,nombreCompleto,edad,genero
U001,Ana García Martínez,25,F
U002,Carlos López Ruiz,28,M
U003,María Rodríguez Silva,22,F
```

### amistades.csv

```csv
userA,userB,calidad
U001,U002,5
U001,U003,4
U002,U004,3
```

## 🧪 Ejemplos de Uso

### Ejemplo 1: Uso Básico

```javascript
import SocialNetwork from './core/SocialNetwork.js';

const network = new SocialNetwork();

// Crear usuarios
network.crearPerfil('ALEX', 'Alex Hernández', 25, 'M');
network.crearPerfil('LUCIA', 'Lucía Martín', 24, 'F');
network.crearPerfil('ELENA', 'Elena Castro', 25, 'F');

// Crear amistades
network.generarLazo('ALEX', 'LUCIA', 5);   // Alex ↔ Lucía (★★★★★)
network.generarLazo('LUCIA', 'ELENA', 4);  // Lucía ↔ Elena (★★★★☆)

// Generar sugerencias para Alex
// Elena será sugerida con prioridad 5 (amiga de su mejor amiga Lucía)
network.mostrarSugerencias('ALEX');
```

### Ejemplo 2: Carga Masiva

```javascript
const network = new SocialNetwork();

// Cargar datos desde archivos
network.cargarPerfiles('./data/usuarios.csv');
network.cargarAmistades('./data/amistades.csv');

// Ver estadísticas
network.mostrarEstadisticas();

// Generar sugerencias con filtros
network.mostrarSugerencias('U001', {
  genero: 'F',
  edadMin: 22,
  edadMax: 28
}, 5);
```

### Ejemplo 3: Test Completo

Ver archivo: `src/examples/testSuggestions.js`

```bash
npm test
```

## 🎨 Salida del Programa

```
═══════════════════════════════════════════════════════════════════
  SUGERENCIAS DE AMIGOS PARA: Ana García Martínez
═══════════════════════════════════════════════════════════════════

  1. Ricardo Campos Silva
     ────────────────────────────────────────────────────────────
     ID:        U022
     Edad:      27 años
     Género:    M
     Prioridad: ★★★★★ (5/5)
     Conexión:
       → A través de: Daniela Moreno Vázquez (★5)

  2. Elena Castro Mendez
     ────────────────────────────────────────────────────────────
     ID:        U015
     Edad:      22 años
     Género:    F
     Prioridad: ★★★★☆ (4/5)
     Conexión:
       → A través de: María Rodríguez Silva (★4)

═══════════════════════════════════════════════════════════════════
```

## 🔍 Características Técnicas

### Buenas Prácticas Implementadas

✅ **Modularidad:** Código organizado en módulos ES6  
✅ **Encapsulación:** Métodos privados con prefijo `_`  
✅ **Documentación:** JSDoc en todos los métodos  
✅ **Manejo de errores:** Try-catch y validaciones  
✅ **Separación de responsabilidades:** Cada clase con un propósito único  
✅ **Inmutabilidad:** Uso de const donde es posible  
✅ **Legibilidad:** Nombres descriptivos y código limpio  
✅ **Eficiencia:** Estructuras de datos óptimas para cada operación  

### Complejidad Computacional

| Operación | Complejidad |
|-----------|-------------|
| Crear perfil | O(1) promedio |
| Buscar perfil | O(1) promedio |
| Crear amistad | O(1) |
| Generar sugerencias | O(A × F × log S) |
| Cargar N perfiles | O(N) |

## 📖 API Reference

### SocialNetwork

#### Métodos Principales

- **crearPerfil(userId, nombre, edad, genero)**: Crea un nuevo perfil
- **buscarPerfil(userId)**: Busca un perfil por ID
- **eliminarPerfil(userId)**: Elimina un perfil
- **generarLazo(userA, userB, calidad)**: Crea amistad bidireccional
- **eliminarLazo(userA, userB)**: Elimina amistad
- **cargarPerfiles(filePath)**: Carga perfiles desde CSV
- **cargarAmistades(filePath)**: Carga amistades desde CSV
- **sugerirAmigos(userId, filtros, limite)**: Genera sugerencias
- **mostrarSugerencias(userId, filtros, limite)**: Muestra sugerencias formateadas
- **visualizarArbolAmigos(userId)**: Visualiza árbol de amigos
- **mostrarEstadisticas()**: Muestra estadísticas de la red

## 🎓 Conceptos de Estructuras de Datos Aplicados

1. **Tabla Hash:** Acceso O(1) a perfiles de usuario
2. **Encadenamiento:** Resolución de colisiones
3. **Max-Heap:** Ordenamiento eficiente de sugerencias por prioridad
4. **Map (JavaScript):** Almacenamiento de amistades con lookup O(1)
5. **Grafos implícitos:** Red social como grafo no dirigido ponderado
6. **BFS conceptual:** Exploración de amigos de amigos (2 niveles)

## 🤝 Autor

Proyecto desarrollado para demostrar el uso de estructuras de datos avanzadas en JavaScript.

## 📄 Licencia

MIT License

---

**¡Gracias por usar Conecta-DS!** 🚀

Para más información o reportar problemas, por favor contacta al desarrollador.
