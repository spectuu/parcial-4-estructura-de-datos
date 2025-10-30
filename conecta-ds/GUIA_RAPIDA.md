# Conecta-DS - Guía de Uso Rápido

## 🚀 Inicio Rápido

### 1. Ejecutar la aplicación completa
```bash
npm start
```

### 2. Ejecutar test del motor de sugerencias
```bash
npm test
```

## 📝 Ejemplos de Código

### Crear una red social simple

```javascript
import SocialNetwork from './src/core/SocialNetwork.js';

const network = new SocialNetwork();

// Crear usuarios
network.crearPerfil('U001', 'Ana García', 25, 'F');
network.crearPerfil('U002', 'Carlos López', 28, 'M');

// Crear amistad
network.generarLazo('U001', 'U002', 5);

// Ver perfil
network.visualizarArbolAmigos('U001');

// Generar sugerencias
network.mostrarSugerencias('U001');
```

### Cargar datos desde archivos

```javascript
// Cargar perfiles
network.cargarPerfiles('./data/usuarios.csv');

// Cargar amistades
network.cargarAmistades('./data/amistades.csv');

// Ver estadísticas
network.mostrarEstadisticas();
```

### Usar filtros en sugerencias

```javascript
// Solo mujeres
network.mostrarSugerencias('U001', { genero: 'F' });

// Rango de edad
network.mostrarSugerencias('U001', { edadMin: 25, edadMax: 30 });

// Combinado
network.mostrarSugerencias('U001', {
  genero: 'M',
  edadMin: 25,
  edadMax: 30
}, 5);
```

## 🎯 Niveles de Calidad de Amistad

- **5 estrellas (★★★★★)**: Mejores amigos
- **4 estrellas (★★★★☆)**: Buenos amigos
- **3 estrellas (★★★☆☆)**: Amigos
- **2 estrellas (★★☆☆☆)**: Conocidos
- **1 estrella (★☆☆☆☆)**: Apenas conocidos

## 📊 Formato de Archivos

### usuarios.csv
```
userId,nombreCompleto,edad,genero
U001,Ana García,25,F
U002,Carlos López,28,M
```

### amistades.csv
```
userA,userB,calidad
U001,U002,5
U002,U003,4
```

## ✨ Características Principales

✅ Tabla Hash con manejo de colisiones  
✅ Max-Heap para sugerencias priorizadas  
✅ Amistades bidireccionales con calidad  
✅ Motor de sugerencias inteligente (FoF)  
✅ Filtros por género y edad  
✅ Carga masiva desde CSV  
✅ Visualización de árboles de amistad  
✅ Estadísticas de la red  

## 🔧 Solución de Problemas

### Error: Cannot find module
- Asegúrate de estar en el directorio correcto
- Verifica que todas las rutas sean correctas

### No se cargan los archivos CSV
- Verifica que los archivos existan en `data/`
- Revisa que el formato sea correcto

## 📞 Ayuda

Para más detalles, consulta el archivo `README.md` completo.
