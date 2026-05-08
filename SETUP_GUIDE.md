# Guía para compartir el proyecto con compañeros

Esta guía te ayuda a configurar correctamente el proyecto para compartir con tus compañeros.

## ¿Qué NO debes compartir?

❌ **Archivo `.env`** - Contiene tu clave de API personal
❌ **Carpeta `node_modules/`** - Se genera automáticamente
❌ **Carpeta `dist/`** - Se genera al compilar

Estos archivos/carpetas ya están en `.gitignore` así que no serán commiteados.

## ¿Qué SÍ debes compartir?

✅ Todo el código fuente (carpetas `src/`, `backend/`)
✅ Archivos de configuración (`vite.config.ts`, `tsconfig.json`, `package.json`)
✅ Archivo `.env.example` (con instrucciones)
✅ Este archivo `README.md`
✅ El archivo `.gitignore`

## Instrucciones para tus compañeros

Cuando tus compañeros clonan/descargan el proyecto:

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar la clave de API
- Copiar `.env.example` a `.env`
- Obtener una clave de Google Gemini en https://ai.google.dev/
- Agregar la clave al archivo `.env`:
  ```
  VITE_GOOGLE_API_KEY=tu_clave_aqui
  ```

### 3. Ejecutar el proyecto
```bash
npm run dev
```

Esto automáticamente inicia tanto el frontend como el backend.

### 4. Acceder a la aplicación
Abrir http://localhost:4173 en el navegador

## Si algo no funciona

### "Backend error: API Key not configured"
- Verifica que el archivo `.env` exista
- Verifica que `VITE_GOOGLE_API_KEY` tenga un valor válido
- Reinicia el servidor (`Ctrl+C` y `npm run dev` nuevamente)

### "Backend not responding"
- Verifica que `npm run dev` esté ejecutándose (debería mostrar dos procesos: frontend y backend)
- Si solo ves el frontend, el backend falló. Revisa la consola para ver el error
- Verifica que el puerto 3001 no esté siendo usado

### "Preguntas no se generan"
- Abre las Developer Tools del navegador (F12)
- Ve a la pestaña Console para ver los mensajes de error
- Verifica que la clave de API sea válida

## Estructura del proyecto

```
Applearn/
├── src/                 # Código de React
│   ├── pages/          # Páginas de la app
│   ├── components/     # Componentes reutilizables
│   ├── context/        # Context API para estado global
│   └── ...
├── backend/            # Servidor Node.js + Express
│   ├── server.js       # Servidor principal
│   └── README.md       # Documentación del backend
├── package.json        # Dependencias del proyecto
├── .env.example        # Variables de entorno (ejemplo)
├── .gitignore          # Archivos ignorados por git
└── README.md           # Documentación principal
```

## Para desplegar en producción

Si vas a desplegar la aplicación en un servidor:

1. Compilar el frontend:
   ```bash
   npm run build
   ```

2. La carpeta `dist/` contiene el frontend compilado

3. El backend debe desplegarse en un servidor separado (Heroku, AWS, etc.)

4. Configurar las variables de entorno en el servidor:
   - `VITE_GOOGLE_API_KEY`: Tu clave de Gemini
   - `BACKEND_PORT`: Puerto donde corre el backend

5. Actualizar `VITE_BACKEND_URL` en el frontend para apuntar al servidor de backend en producción

## Preguntas frecuentes

**P: ¿Necesito una clave de API diferente para cada compañero?**
R: No, pueden compartir la misma clave. Sin embargo, es recomendable que cada uno tenga la suya para control y límites de uso.

**P: ¿Puedo desplegar el frontend y backend en el mismo servidor?**
R: Sí, pero deberías usar un servidor web (Nginx) como proxy inverso.

**P: ¿Qué pasa si no tengo la clave de API?**
R: La app generará preguntas de ejemplo (fallback) cuando falle la API, pero no serán personalizadas.

**P: ¿Puedo cambiar el puerto del backend?**
R: Sí, establece `BACKEND_PORT=nuevopuerto` en el `.env` y también actualiza `VITE_BACKEND_URL`.

## Support

Si encuentras problemas que no están aquí listados, verifica:
1. La consola del navegador (F12 > Console)
2. Los logs del terminal donde corre `npm run dev`
3. El archivo `.env` está correctamente configurado
