# Moodboard Builder

Alejandro Alvarez - Diseñador Web / UX / UI
Javier Quesada - UX/UI Product Designer

## Descripción del proyecto

Moodboard Builder es una aplicación web que permite a diseñadores, fotógrafos y creativos crear y organizar colecciones visuales de inspiración. Facilita la recopilación de referencias visuales en un espacio digital centralizado, pudiendo editar, organizar y compartir estas colecciones.

## Evolución del desarrollo

El proyecto se desarrolló en tres fases principales:

1. **Base HTML/CSS**: Creación de la estructura visual y experiencia de usuario.
2. **Implementación de JavaScript**: Adición de interactividad y gestión básica de imágenes.
3. **Transformación a SPA/PWA**: Reestructuración completa como aplicación Vue.js con funcionalidades avanzadas.

## Tecnologías utilizadas

- **Framework**: Vue.js 3
- **Gestión de estado**: Vuex
- **Almacenamiento local**: localStorage + vuex-persistedstate
- **Enrutamiento**: Vue Router
- **PWA**: Service Workers para funcionalidad offline
- **Estilos**: CSS puro sin frameworks externos
- **Manipulación de imágenes**: Canvas API para compresión y optimización

## Funcionalidades principales

- Creación y gestión de múltiples moodboards
- Carga de imágenes mediante:
  - Arrastrar y soltar (drag and drop)
  - Selección de archivos locales
  - URLs externas
- Edición de información (título, imagen de portada)
- Organización visual mediante drag and drop
- Visualización ampliada de imágenes (lightbox)
- Compartición mediante links
- Funcionamiento offline (PWA)

## Retos técnicos superados

- **Limitaciones de almacenamiento**: Implementación de compresión de imágenes para reducir el tamaño hasta un 70% sin perder calidad.
- **Gestión de estado compleja**: Solución de conflictos entre métodos locales y acciones de Vuex mediante mapeo de acciones.
- **Funcionalidad offline**: Configuración de Service Workers para permitir el uso sin conexión.
- **Validación de imágenes**: Sistema de verificación de URLs con retroalimentación para el usuario.

## Arquitectura del proyecto

La aplicación se estructura en componentes reutilizables que facilitan su mantenimiento:

- **Componentes UI**: ImageCard, MoodboardCard, modales
- **Gestión de estado centralizada**: Patrón Flux con Vuex
- **Vistas principales**: Home, detalle de moodboard, creación

## Instalación y uso

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run serve`
4. Para build de producción: `npm run build`

## Próximas mejoras

- Sincronización en la nube
- Colaboración en tiempo real
- Categorización por etiquetas
- Integración con plataformas de diseño

---
