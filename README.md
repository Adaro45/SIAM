# SIAM
# Sistema de Gestión de Proyectos - Tesis

## Descripción del Proyecto

Este proyecto es parte de la **tesis** para la creación del Sistema de Información Ambiental (SIAM) del Centro de Estudios Ambientales de Cienfuegos(CEAC), Cuba. La aplicación desarrollada es una **plataforma web** para la gestión y visualización de proyectos ambientales, enfocada en ofrecer una interfaz intuitiva para investigadores y administradores del centro. 

El sistema facilita la creación, actualización, y seguimiento de proyectos por parte de los usuarios, además de gestionar la asignación de investigadores y roles en cada uno de ellos.

## Características Principales

- **Gestión de proyectos**: Creación, edición y eliminación de proyectos.
- **Investigadores**: Los investigadores pueden pertenecer a varios proyectos y algunos pueden actuar como "Jefe de Proyecto".
- **Roles diferenciados**:
  - **Investigadores**: Tienen acceso extendido a los detalles de los proyectos.
  - **Usuarios normales**: Acceso limitado a un resumen de los proyectos.
  - **Administrador**: Controla toda la plataforma y los permisos, pero no participa en los proyectos.
- **Autenticación**: Login y control de acceso para diferentes tipos de usuarios.
- **Visualización en mapas**: Uso de mapas interactivos para ubicar proyectos relevantes.

## Tecnologías Utilizadas

### **Frontend**
- **React**: Framework utilizado para la creación de la interfaz de usuario.
- **Vite**: Herramienta para el desarrollo rápido de aplicaciones React.
- **React-Leaflet**: Biblioteca para visualización de mapas interactivos.

### **Backend**
- **Python**: Lenguaje de programación utilizado para el desarrollo del backend.
- **Django**: Framework para el desarrollo del backend del proyecto.
- **Django Rest Framework**: Extensión de Django para la creación de APIs RESTful.
- **PostgreSQL**: Base de datos relacional utilizada para gestionar la información.
- **GeoServer**: Heramienta para trabajar con datos geoespaciales.

### **Testing**
- **Pytest**: Herramienta para pruebas en el backend.
- **Jest**: Biblioteca para pruebas en el frontend.

### **CI/CD**
- **GitHub Actions / GitLab CI**: Automatización del despliegue y testing continuo.

## Instalación y Ejecución

### Requisitos Previos
- Python 3.x
- Node.js y npm
- PostgreSQL
- GeoServer

### Configuración del Backend
1. Clona el repositorio:
   ```bash
   git clone (https://github.com/Adaro45/SIAM.git)
