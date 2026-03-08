# DayTracker

DayTracker es una aplicación web construida con React y Vite diseñada para funcionar como un calendario y rastreador de retos personales personalizable.

## Características Principales

1. **Rastreo Personalizado de Retos**: Permite a los usuarios llevar un seguimiento visual de sus hábitos o metas (como un reto de 30 días, 100 días o un año entero). No está limitado a los típicos 365 días; puedes empezar con una lista vacía o generar la cantidad exacta de días que necesites.
2. **Gestión de Días**: Interfaz donde puedes añadir, editar, eliminar y marcar días como completados a lo largo de tu reto.
3. **Múltiples Plantillas/Pestañas**: Soporta la gestión de varios retos simultáneos utilizando un sistema de pestañas o plantillas (templates).
4. **Diseño "Brutalista" Refinado**: La aplicación cuenta con una estética visual brutalista, pero refinada para ser más compacta, con cuadrículas (grids) y elementos que no dominan visualmente.
5. **Interfaz Completamente en Español**: Todos los textos del sistema, los diálogos personalizados de confirmación y los prompts están diseñados en español.
6. **Contenedores (Docker)**: La aplicación está preparada para ser desplegada en contenedores, lo que facilita montarla en cualquier servidor o entorno local sin complicaciones de configuración usando Docker Compose.

## Tecnologías Utilizadas
- **React** (Componentes Funcionales y Hooks)
- **Vite** (Build tool y servidor de desarrollo)
- **Vanilla CSS** (Diseño brutalista refinado)
- **Docker** & **Docker Compose** (Para fácil despliegue y desarrollo local)

## Cómo empezar

### Desarrollo Local (Node.js)

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Despliegue con Docker

Si tienes Docker y Docker Compose instalados, puedes levantar el proyecto fácilmente:

```bash
docker-compose up -d --build
```

La aplicación estará disponible en `http://localhost:5173`.
