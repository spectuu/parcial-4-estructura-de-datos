# 📁 Estructura del Proyecto Conecta-DS

```
conecta-ds/
│
├── 📄 package.json                    # Configuración del proyecto Node.js
├── 📄 .gitignore                      # Archivos a ignorar en Git
│
├── 📚 DOCUMENTACIÓN
│   ├── 📄 README.md                   # Documentación principal completa
│   ├── 📄 GUIA_RAPIDA.md             # Guía de inicio rápido
│   ├── 📄 COMANDOS_API.md            # Referencia completa de API
│   └── 📄 RESUMEN_TECNICO.md         # Detalles técnicos y algoritmos
│
├── 📂 src/                            # Código fuente
│   │
│   ├── 📂 core/                       # Núcleo del sistema
│   │   └── 📄 SocialNetwork.js       # Clase principal de la red social
│   │                                   └─ Gestión de perfiles
│   │                                   └─ Gestión de amistades
│   │                                   └─ Motor de sugerencias
│   │                                   └─ Carga de archivos CSV
│   │                                   └─ Estadísticas y visualización
│   │
│   ├── 📂 dataStructures/             # Estructuras de datos
│   │   ├── 📄 HashTable.js           # Tabla Hash con encadenamiento
│   │   │                               └─ Función hash djb2
│   │   │                               └─ Manejo de colisiones
│   │   │                               └─ Redimensionamiento dinámico
│   │   │                               └─ Operaciones CRUD
│   │   │
│   │   └── 📄 MaxHeap.js             # Cola de Prioridad Máxima
│   │                                   └─ Binary Max-Heap
│   │                                   └─ Insert, ExtractMax, Peek
│   │                                   └─ Heapify Up/Down
│   │                                   └─ Ordenamiento por prioridad
│   │
│   ├── 📂 models/                     # Modelos de datos
│   │   └── 📄 UserProfile.js         # Modelo de perfil de usuario
│   │                                   └─ Propiedades del usuario
│   │                                   └─ Lista de amigos (Map)
│   │                                   └─ Operaciones de amistad
│   │                                   └─ Serialización JSON
│   │
│   ├── 📂 examples/                   # Ejemplos de uso
│   │   ├── 📄 simpleExample.js       # Ejemplo básico y simple
│   │   └── 📄 testSuggestions.js     # Test del motor de sugerencias
│   │
│   └── 📄 main.js                     # Aplicación principal
│                                       └─ Demostración completa
│                                       └─ Carga de datos CSV
│                                       └─ Ejemplos de todas las funcionalidades
│
└── 📂 data/                           # Datos de prueba
    ├── 📄 usuarios.csv                # 20 usuarios de ejemplo
    └── 📄 amistades.csv               # 32 relaciones de amistad

```

## 📊 Estadísticas del Proyecto

### Archivos de Código
- **Total de archivos .js:** 7
- **Líneas de código:** ~1,400+
- **Archivos de documentación:** 4
- **Archivos de datos:** 2

### Distribución de Código

| Archivo | Líneas | Propósito |
|---------|--------|-----------|
| SocialNetwork.js | ~470 | Lógica principal del sistema |
| HashTable.js | ~190 | Estructura de datos - Tabla Hash |
| MaxHeap.js | ~200 | Estructura de datos - Max-Heap |
| UserProfile.js | ~170 | Modelo de datos de usuario |
| main.js | ~200 | Aplicación de demostración |
| testSuggestions.js | ~150 | Pruebas del motor |
| simpleExample.js | ~70 | Ejemplo simple |

## 🎯 Componentes Principales

### 1. Core (Núcleo)
```
SocialNetwork
├── HashTable de perfiles
├── Métodos de gestión
├── Motor de sugerencias
└── Utilidades de visualización
```

### 2. Data Structures (Estructuras)
```
HashTable                MaxHeap
├── Hash Function       ├── Insert
├── Chaining            ├── ExtractMax
├── Insert              ├── Peek
├── Search              └── Heapify
├── Delete              
└── Resize              
```

### 3. Models (Modelos)
```
UserProfile
├── userId
├── nombreCompleto
├── edad
├── genero
└── amigos (Map)
    └── friendId -> calidad
```

## 🔄 Flujo de Datos

```
CSV Files
    ↓
cargarPerfiles() / cargarAmistades()
    ↓
HashTable (Perfiles)
    ↓
UserProfile.amigos (Map)
    ↓
sugerirAmigos()
    ↓
MaxHeap (Priorización)
    ↓
Sugerencias Ordenadas
```

## 📝 Archivos de Configuración

### package.json
- Nombre del proyecto: `conecta-ds`
- Tipo: `module` (ES6 modules)
- Scripts:
  - `start`: Ejecuta main.js
  - `test`: Ejecuta testSuggestions.js

### .gitignore
- `node_modules/`
- Archivos de sistema
- Logs y temporales

## 📚 Documentación

### README.md (Completo)
- Descripción del proyecto
- Arquitectura
- Estructuras de datos
- Instalación y uso
- API Reference
- Ejemplos
- Casos de uso

### GUIA_RAPIDA.md
- Inicio rápido
- Comandos básicos
- Ejemplos simples
- Solución de problemas

### COMANDOS_API.md
- Referencia completa de API
- Todos los métodos
- Parámetros y retornos
- Ejemplos de uso
- Estructuras de datos

### RESUMEN_TECNICO.md
- Detalles de implementación
- Algoritmos
- Complejidad computacional
- Principios aplicados
- Posibles extensiones

## 💾 Datos de Prueba

### usuarios.csv
- 20 usuarios de ejemplo
- Diversidad de edades (22-31 años)
- Mezcla de géneros
- IDs secuenciales (U001-U020)

### amistades.csv
- 32 relaciones bidireccionales
- Calidades variadas (1-5)
- Red conectada
- Ejemplos de FoF (Friends of Friends)

## 🚀 Puntos de Entrada

### 1. Aplicación Principal
```bash
npm start
# Demostración completa de todas las funcionalidades
```

### 2. Test de Sugerencias
```bash
npm test
# Verificación del motor de sugerencias
```

### 3. Ejemplo Simple
```bash
node src/examples/simpleExample.js
# Ejemplo básico para comenzar
```

## 🎨 Características Implementadas

### ✅ Requerimientos Funcionales
- [x] Tabla Hash para perfiles
- [x] Gestión de perfiles (CRUD)
- [x] Carga masiva desde CSV
- [x] Conexiones de amistad bidireccionales
- [x] Calidad de amistad (1-5)
- [x] Visualización de árbol de amigos
- [x] Motor de sugerencias FoF
- [x] Max-Heap para priorización
- [x] Priorización inteligente
- [x] Filtros (género, edad)

### ✅ Características Adicionales
- [x] Estadísticas completas
- [x] Múltiples ejemplos de uso
- [x] Documentación exhaustiva
- [x] Mensajes de error claros
- [x] Salida formateada
- [x] Validaciones robustas
- [x] Código modular
- [x] JSDoc en todos los métodos

## 🔧 Tecnologías Utilizadas

- **Lenguaje:** JavaScript (ES6+)
- **Runtime:** Node.js >= 14.0.0
- **Módulos:** ES6 Modules (import/export)
- **Estructuras:** Map, Set (nativos de JS)
- **File System:** fs (Node.js)
- **Path:** path (Node.js)

## 📈 Complejidad de Operaciones

| Operación | Mejor Caso | Caso Promedio | Peor Caso |
|-----------|-----------|---------------|-----------|
| Crear perfil | O(1) | O(1) | O(n)* |
| Buscar perfil | O(1) | O(1) | O(n)* |
| Crear amistad | O(1) | O(1) | O(1) |
| Sugerencias | O(A×F×log S) | O(A×F×log S) | O(A×F×log S) |
| Cargar CSV | O(N) | O(N) | O(N) |

*En caso de colisión total (muy raro)

## 🎓 Conceptos Aplicados

- ✓ Tabla Hash
- ✓ Manejo de colisiones (Chaining)
- ✓ Heap Binario (Max-Heap)
- ✓ Grafos (representación implícita)
- ✓ BFS (2 niveles - FoF)
- ✓ Cola de Prioridad
- ✓ Map/Dictionary
- ✓ Algoritmos de ordenamiento

## 📞 Uso del Proyecto

1. **Desarrollo:** Código completo y modificable
2. **Aprendizaje:** Ejemplos y documentación
3. **Demostración:** Casos de uso reales
4. **Referencia:** Implementación de estructuras de datos
5. **Base:** Para extensiones futuras

---

**Proyecto completado y listo para usar! 🎉**

Para comenzar: `npm start`
