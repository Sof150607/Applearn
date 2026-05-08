# Backend - API Proxy

Este es el servidor backend de la aplicación Applearn. Actúa como un proxy seguro para las llamadas a la API de Google Gemini.

## ¿Por qué un backend?

- **Seguridad**: La clave de API de Google Gemini nunca se expone al cliente
- **CORS**: Maneja correctamente los headers de CORS
- **Procesamiento centralizado**: La lógica de comunicación con la IA está en un lugar

## Requisitos

- Node.js v16 o superior
- La variable de entorno `VITE_GOOGLE_API_KEY` debe estar configurada con una clave válida de Google Gemini

## Instalación

Las dependencias del backend se instalan automáticamente cuando ejecutas `npm install` en la raíz del proyecto.

## Ejecución

### En desarrollo (desde la raíz del proyecto)
```bash
npm run dev
```

Esto ejecutará:
- Frontend en http://localhost:4173
- Backend en http://localhost:3001

### Ejecutar solo el backend
```bash
npm run dev:backend
```

El backend estará disponible en http://localhost:3001

## Endpoints disponibles

### GET `/api/health`
Verifica que el backend esté corriendo.

**Respuesta:**
```json
{
  "status": "Backend running successfully"
}
```

### POST `/api/generate-questions`
Genera preguntas usando la API de Google Gemini.

**Parámetros requeridos:**
```json
{
  "topic": "string",
  "numQuestions": "number",
  "difficulty": "fácil | medio | difícil"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "questions": [
    {
      "id": "string",
      "prompt": "string",
      "options": ["string", "string", "string", "string"],
      "answer": "A | B | C | D",
      "difficulty": "string",
      "hint": "string"
    }
  ],
  "rawResponse": "string"
}
```

**Respuesta de error:**
```json
{
  "error": "string",
  "details": "string"
}
```

## Configuración

El backend lee la clave de API de la variable de entorno `VITE_GOOGLE_API_KEY` definida en el archivo `.env`.

### Variables de entorno

- `VITE_GOOGLE_API_KEY`: Clave de API de Google Gemini (requerida)
- `BACKEND_PORT`: Puerto en el que corre el servidor (por defecto: 3001)
- `NODE_ENV`: Entorno (development, production)

## Troubleshooting

### "Port 3001 already in use"
Cambia el puerto en la variable de entorno `BACKEND_PORT`:
```bash
BACKEND_PORT=3002 npm run dev:backend
```

### "API Key not configured"
- Verifica que el archivo `.env` exista
- Asegúrate que `VITE_GOOGLE_API_KEY` esté configurado con una clave válida

### "Cannot find module"
Las dependencias no están instaladas. Ejecuta:
```bash
npm install
```

## Development

### Agregar nuevos endpoints
1. Crea una ruta en `server.js`
2. Pruébala localmente
3. Actualiza el frontend para usar el nuevo endpoint

### Logs
El backend imprime logs en la consola indicando:
- Inicio del servidor
- Solicitudes recibidas
- Respuestas de Gemini
- Errores
