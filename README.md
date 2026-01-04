Surval Sport | Performance & Precision Web Project
Este proyecto es una plataforma web de alto rendimiento desarrollada para Surval Sport, un taller mecánico especializado en tren delantero, suspensión y frenos de alta gama. El sitio combina una identidad visual premium (basada en el concepto "SP") con una lógica de reserva y gestión de datos avanzada (conceptos "Surval Sport").

🚀 Características Principales
Diseño Mobile-First: Optimizado para una experiencia fluida en smartphones, tablets y desktops.

Estética "SP": Paleta de colores en negro profundo y oro (#D4AF37), tipografía deportiva Exo 2 y efectos de glassmorphism.

Lógica de Reserva Dinámica: Sistema inteligente de selección de vehículos que filtra modelos según la marca seleccionada.

Integración con WhatsApp: Generación automática de mensajes estructurados para facilitar la conversión de clientes.

Sección de Reseñas: Integración visual de opiniones de Google para generar confianza y prueba social.

Galería Estilo Instagram: Espacio preparado para exhibir trabajos realizados con un diseño de cuadrícula moderna.

🛠️ Tecnologías Utilizadas
El proyecto fue desarrollado utilizando tecnologías web estándar (Vanilla Stack) para garantizar ligereza, velocidad de carga y facilidad de mantenimiento:

HTML5: Estructura semántica para SEO y accesibilidad.

CSS3: Diseño responsivo mediante Flexbox y CSS Grid, uso de variables y animaciones personalizadas.

JavaScript (ES6+): Lógica dinámica para el filtrado de vehículos, manejo de estados del formulario y animaciones de scroll (Intersection Observer).

📁 Estructura del Proyecto
Bash

/surval-sport
│
├── /assets           # Logotipos, imágenes de servicios y galería
├── /css
│   └── styles.css    # Estilos globales y breakpoints responsive
├── /js
│   └── app.js        # Lógica de vehículos, menú y WhatsApp
└── index.html        # Archivo principal del sitio
🔧 Configuración y Uso
Para visualizar el proyecto localmente:

Clona o descarga este repositorio.

Asegúrate de que la estructura de carpetas se mantenga intacta (especialmente la carpeta /assets).

Abre el archivo index.html en cualquier navegador moderno.

(Opcional) Utiliza una extensión como Live Server en VS Code para ver los cambios en tiempo real.

📈 Lógica de Negocio Aplicada
El formulario de contacto no permite el envío de datos incompletos. Al hacer clic en "Solicitar Turno", el script valida que:

Se haya seleccionado un servicio.

Se haya elegido una marca, un modelo y un año.

Solo entonces, redirige al usuario a WhatsApp con un mensaje pre-cargado:

"Hola Surval Sport! 👋 Quiero un turno para: Alineación y Balanceo. Vehículo: Ford Focus (2022)"

✒️ Créditos
Cliente: Surval Sport - Mendoza, Argentina.

Desarrollo: Nicolas Aguirres
