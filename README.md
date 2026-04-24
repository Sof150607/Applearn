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
- `src/App.tsx` - Lógica principal, flujo de navegación y adaptabilidad.
- `src/index.css` - Estilos base globales.
- `src/App.css` - Estilos específicos del prototipo.

## Tecnologías usadas

- React 18
- TypeScript
- Vite

## Instalación y ejecución

1. Abrir terminal en `c:\Users\juanf\Documents\Applearn`
2. Ejecutar:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir la URL que indique Vite en el navegador.

## Objetivo del prototipo

El prototipo simula un sistema de aprendizaje adaptativo que apoya el foco estudiantil mediante:

- reducción de distracciones externas e internas,
- ajuste dinámico de dificultad,
- retroalimentación inmediata,
- apoyo motivacional y de progresión.

Esta versión está pensada como un prototipo low-fi funcional que sirve para validar el flujo central de selección, respuesta y adaptación.
