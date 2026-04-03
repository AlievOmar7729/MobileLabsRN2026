export const TASK_DEFINITIONS = [
  {
    id: 'tap-ten',
    title: 'Зробити 10 кліків',
    description: 'Натиснути на об’єкт 10 разів.',
    getProgress: ({ stats }) => stats.taps,
    target: 10,
  },
  {
    id: 'double-five',
    title: 'Зробити подвійний клік 5 разів',
    description: 'Використати подвійне натискання для 5 подвійних кліків.',
    getProgress: ({ stats }) => stats.doubleTaps,
    target: 5,
  },
  {
    id: 'hold-three-seconds',
    title: 'Утримувати об’єкт 3 секунди',
    description: 'Використати довге натискання щонайменше 3 секунди.',
    getProgress: ({ stats }) => (stats.longPressCompleted ? 1 : 0),
    target: 1,
  },
  {
    id: 'drag-once',
    title: 'Перетягнути об’єкт',
    description: 'Перемістити об’єкт по екрану.',
    getProgress: ({ stats }) => stats.drags,
    target: 1,
  },
  {
    id: 'fling-right',
    title: 'Зробити свайп вправо',
    description: 'Виконати швидкий свайп вправо.',
    getProgress: ({ stats }) => stats.swipeRight,
    target: 1,
  },
  {
    id: 'fling-left',
    title: 'Зробити свайп вліво',
    description: 'Виконати швидкий свайп вліво.',
    getProgress: ({ stats }) => stats.swipeLeft,
    target: 1,
  },
  {
    id: 'pinch-once',
    title: 'Змінити розмір об’єкта',
    description: 'Збільшити або зменшити об’єкт за допомогою масштабування.',
    getProgress: ({ stats }) => stats.pinches,
    target: 1,
  },
  {
    id: 'score-hundred',
    title: 'Отримати 100 очок',
    description: 'Набрати щонайменше 100 очок у лічильнику.',
    getProgress: ({ score }) => score,
    target: 100,
  },
  {
    id: 'all-gestures',
    title: 'Використати всі типи жестів',
    description: 'Зробити tap, double tap, long press, drag, обидва свайпи та pinch.',
    getProgress: ({ stats }) =>
      [
        stats.taps > 0,
        stats.doubleTaps > 0,
        stats.longPressCompleted,
        stats.drags > 0,
        stats.swipeRight > 0,
        stats.swipeLeft > 0,
        stats.pinches > 0,
      ].filter(Boolean).length,
    target: 7,
  },
];

export function evaluateTasks(gameState) {
  return TASK_DEFINITIONS.map((task) => {
    const progress = task.getProgress(gameState);
    const completed = progress >= task.target;

    return {
      ...task,
      progress,
      completed,
    };
  });
}
