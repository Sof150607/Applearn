import type { Difficulty, Question, TimeOption } from '../types';

export const timeOptions: { value: TimeOption; label: string; questions: number }[] = [
  { value: 'mucho', label: 'Mucho tiempo', questions: 15 },
  { value: 'medio', label: 'Medio tiempo', questions: 10 },
  { value: 'poco', label: 'Poco tiempo', questions: 10 }
];

export const difficultyOptions: Difficulty[] = ['fácil', 'medio', 'difícil'];

export const questionBank: Question[] = [
  { id: 1, difficulty: 'fácil', prompt: '¿Qué ayuda a mantener la atención al estudiar?', options: ['Hacer descansos cortos', 'Estudiar de noche sin parar', 'Usar redes sociales'], answer: 'Hacer descansos cortos', hint: 'Busca una estrategia de ritmo de estudio.' },
  { id: 2, difficulty: 'fácil', prompt: '¿Cuál es una práctica útil para estudiar mejor?', options: ['Leer sin plan', 'Hacer resúmenes', 'Escuchar música fuerte'], answer: 'Hacer resúmenes', hint: 'Organizar ideas es clave.' },
  { id: 3, difficulty: 'fácil', prompt: '¿Qué reduce las distracciones?', options: ['Silenciar notificaciones', 'Mantener el móvil visible', 'Abrir muchas pestañas'], answer: 'Silenciar notificaciones', hint: 'Piensa en eliminar interrupciones.' },
  { id: 4, difficulty: 'fácil', prompt: '¿Qué favorece la concentración?', options: ['Planificar el tiempo', 'Dejar todo para después', 'Estudiar con hambre'], answer: 'Planificar el tiempo', hint: 'La organización ayuda a enfocarse.' },
  { id: 5, difficulty: 'fácil', prompt: '¿Qué significa “mind-wandering”?', options: ['Pensar en otra cosa mientras estudias', 'Leer más rápido', 'Dormir temprano'], answer: 'Pensar en otra cosa mientras estudias', hint: 'Es una distracción interna.' },
  { id: 6, difficulty: 'medio', prompt: 'Cuando respondes bien dos veces seguido, el sistema debe:', options: ['Aumentar dificultad', 'Pedir pausa', 'Cambiar tema'], answer: 'Aumentar dificultad', hint: 'Busca un reto mayor si vas bien.' },
  { id: 7, difficulty: 'medio', prompt: 'Si fallas varias preguntas, lo ideal es:', options: ['Ofrecer apoyo', 'Ignorar el error', 'Acelerar más'], answer: 'Ofrecer apoyo', hint: 'El sistema debe ayudar, no frustrar.' },
  { id: 8, difficulty: 'medio', prompt: '¿Cuál es una señal de baja atención?', options: ['Respuestas lentas y dudas', 'Foco claro en el contenido', 'Leer sin cometer errores'], answer: 'Respuestas lentas y dudas', hint: 'Los retrasos suelen indicar distracción.' },
  { id: 9, difficulty: 'medio', prompt: '¿Qué hace un buen sistema adaptativo?', options: ['Ajusta preguntas según desempeño', 'Presenta siempre lo mismo', 'Elimina retroalimentación'], answer: 'Ajusta preguntas según desempeño', hint: 'Personalización es la clave.' },
  { id: 10, difficulty: 'medio', prompt: '¿Qué mejora la retención de información?', options: ['Revisar lo aprendido', 'Leer una sola vez rápido', 'Abrir muchas apps'], answer: 'Revisar lo aprendido', hint: 'La revisión refuerza el recuerdo.' },
  { id: 11, difficulty: 'difícil', prompt: '¿Qué combina la solución propuesta?', options: ['AI adaptativa, atención y emoción', 'Solo contenido fijo', 'Solo seguimiento de tiempo'], answer: 'AI adaptativa, atención y emoción', hint: 'Piensa en los tres pilares del problema.' },
  { id: 12, difficulty: 'difícil', prompt: '¿Qué representa la vigilancia de la atención?', options: ['Detectar cuándo se pierde foco', 'Aumentar distractores', 'Eliminar toda interacción'], answer: 'Detectar cuándo se pierde foco', hint: 'No es castigar, es interpretar señales.' },
  { id: 13, difficulty: 'difícil', prompt: '¿Cuál es el riesgo de un sistema adaptativo mal diseñado?', options: ['Manipulación o sobrecarga', 'Mejora de aprendizaje', 'Más claridad'], answer: 'Manipulación o sobrecarga', hint: 'Piensa en cuidado ético.' },
  { id: 14, difficulty: 'difícil', prompt: '¿Qué aporta el feedback inmediato?', options: ['Permite corregir rápido', 'Genera más confusión', 'Hace el estudio más lento'], answer: 'Permite corregir rápido', hint: 'La respuesta rápida es positiva.' },
  { id: 15, difficulty: 'difícil', prompt: '¿Qué es una intervención adaptativa útil?', options: ['Simplificar contenido si hay errores', 'Ignorar fallos y seguir igual', 'Aumentar presión sin apoyo'], answer: 'Simplificar contenido si hay errores', hint: 'El sistema debe bajar la carga cuando hay problemas.' }
];

export const pickQuestion = (difficulty: Difficulty, usedIds: number[]) => {
  const pool = questionBank.filter((question) => question.difficulty === difficulty && !usedIds.includes(question.id));
  if (pool.length > 0) return pool[Math.floor(Math.random() * pool.length)];
  const fallback = questionBank.filter((question) => !usedIds.includes(question.id));
  return fallback[Math.floor(Math.random() * fallback.length)];
};
