# Applearn

## Descripción del prototipo

Este proyecto es un prototipo de una aplicación de estudio adaptativa diseñada para ayudar a estudiantes universitarios a mantener el foco, gestionar el tiempo y mejorar la retención durante sesiones de estudio.

La app utiliza un flujo de preguntas con adaptación de dificultad basada en el desempeño del usuario y permite elegir un objetivo de tiempo y una dificultad inicial. Está construida con **Vite + React + TypeScript**.

## Funcionalidades incluidas

- Pantalla de bienvenida con acceso al flujo de estudio.
- Configuración de sesión con selección de:
  - Tiempo disponible: *Mucho tiempo*, *Medio tiempo*, *Poco tiempo*.
  - Dificultad: *Fácil*, *Medio*, *Difícil*.
- Modo de estudio con:
  - Pregunta actual y opciones de respuesta.
  - Campo de texto para ingresar la respuesta.
  - Evaluación inmediata.
  - Feedback adaptativo con pista y cambio de dificultad según resultado.
- Resumen final con resultados de la sesión y porcentaje de aciertos.
- Navegación interna entre pantallas.

## Cómo funciona la adaptación

- Si la respuesta es correcta, se incrementa la dificultad en el siguiente paso.
- Si la respuesta es incorrecta, se simplifica el siguiente contenido.
- El número de preguntas depende de la opción de tiempo seleccionada:
  - *Mucho tiempo*: 15 preguntas
  - *Medio tiempo*: 10 preguntas
  - *Poco tiempo*: 10 preguntas

## Estructura del proyecto

- `package.json` - Dependencias y scripts del proyecto.
- `vite.config.ts` - Configuración de Vite.
- `tsconfig.json` - Configuración de TypeScript.
- `index.html` - Entrada principal del proyecto.
- `src/main.tsx` - Renderiza la app en React.
- `src/App.tsx` - Lógica de autenticación, navegación y layout principal.
- `src/layout/AppLayout.tsx` - Componente de layout que incluye encabezado y barra de navegación.
- `src/components/Navbar.tsx` - Navegación principal entre secciones.
- `src/pages/LoginPage.tsx` - Pantalla de autenticación.
- `src/pages/DashboardPage.tsx` - Página principal con resumen y tarjetas de estado.
- `src/pages/StudyPage.tsx` - Página de sesiones de estudio adaptativas.
- `src/pages/ProgressPage.tsx` - Página de progreso y métricas.
- `src/pages/ProfilePage.tsx` - Página de perfil de usuario.
- `src/data/questions.ts` - Banco de preguntas y lógica de selección adaptativa.
- `src/types/index.ts` - Tipos compartidos de la aplicación.
- `src/assets/apple-logo.svg` - Logo/mascota de la app.
- `src/index.css` - Estilos base globales.
- `src/App.css` - Estilos de la interfaz y componentes de la app.
- `src/vite-env.d.ts` - Declaraciones de tipos adicionales para Vite.

## Tecnologías usadas

- React 18
- TypeScript
- Vite

## Instalación y ejecución

### Requisitos previos
- Node.js v16 o superior instalado ([descargar aquí](https://nodejs.org/))
- npm v8 o superior
- Una clave de API de Google Gemini ([obtenerla aquí](https://ai.google.dev/))

### Pasos de instalación

1. **Clonar o descargar el proyecto:**
   ```bash
   cd Applearn
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**

   - Copiar el archivo `.env.example` a `.env`:
     
     **Windows (PowerShell):**
     ```powershell
     Copy-Item .env.example .env
     ```
     
     **macOS/Linux (Terminal):**
     ```bash
     cp .env.example .env
     ```

   - Editar el archivo `.env` y agregar tu clave de Google Gemini:
     ```
     VITE_GOOGLE_API_KEY=tu_clave_aqui
     VITE_BACKEND_URL=http://localhost:3001
     ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   
   Esto iniciará automáticamente:
   - **Frontend:** http://localhost:4173
   - **Backend:** http://localhost:3001

5. **Acceder a la aplicación:**
   - Abre tu navegador y ve a http://localhost:4173
   - Inicia sesión con cualquier correo y contraseña (ej: usuario@test.com)

### Parar el servidor
- Presiona `Ctrl+C` en la terminal donde corre `npm run dev`

### Compilación para producción
```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados listos para deploy.

## Configuración en producción

Para desplegar la aplicación en producción:

1. Generar el build:
   ```bash
   npm run build
   ```

2. Desplegar el backend (en un servidor como Heroku, AWS, etc.):
   - Asegúrate que la variable de entorno `VITE_GOOGLE_API_KEY` esté configurada en el servidor
   - El backend debe estar accesible desde el frontend

3. Configurar la variable `VITE_BACKEND_URL` en el frontend para apuntar a tu backend en producción

## Arquitectura

La aplicación está dividida en dos partes:

### Frontend (Vite + React + TypeScript)
- Interfaz de usuario responsive
- Gestión de estado con Context API
- Comunicación con el backend para generar preguntas

### Backend (Node.js + Express)
- Proxy seguro para la API de Google Gemini
- Manejo de CORS
- Validación de parámetros
- Lógica centralizada de llamadas a IA

## Solución de problemas

### "Error: Backend not responding"
- Asegúrate que el backend esté corriendo (`npm run dev`)
- Verifica que el puerto 3001 no esté siendo usado por otra aplicación
- Revisa la consola del backend para ver mensajes de error

### "Error: API Key not configured"
- Verifica que el archivo `.env` exista
- Asegúrate que `VITE_GOOGLE_API_KEY` tenga tu clave de API válida
- El backend debe poder leer la variable de entorno

### "Error: CORS policy"
- Esto ocurre si el backend no está corriendo
- Verifica que `VITE_BACKEND_URL` en el `.env` sea correcto

### Las preguntas no se generan
- Verifica en la consola del navegador (F12) qué error específico hay
- Revisa los logs del backend para más detalles
- Asegúrate que tu clave de API de Google Gemini sea válida

## Contribuciones

Este es un proyecto de prototipo. Para compartir con compañeros:
1. Asegúrate de NO incluir el archivo `.env` (ya está en `.gitignore`)
2. Proporciona el archivo `.env.example` con instrucciones claras
3. Comparte también estas instrucciones de README

## Objetivo del prototipo

El prototipo simula un sistema de aprendizaje adaptativo que apoya el foco estudiantil mediante:

- reducción de distracciones externas e internas,
- ajuste dinámico de dificultad,
- retroalimentación inmediata,
- apoyo motivacional y de progresión.

Esta versión está pensada como un prototipo low-fi funcional que sirve para validar el flujo central de selección, respuesta y adaptación.
