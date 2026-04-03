import React, { createContext, useContext, useMemo, useState } from 'react';
import { evaluateTasks } from './tasks';

const GameContext = createContext(null);

const initialStats = {
  taps: 0,
  doubleTaps: 0,
  longPressCompleted: false,
  drags: 0,
  swipeLeft: 0,
  swipeRight: 0,
  pinches: 0,
};

export function GameProvider({ children, themeMode, setThemeMode }) {
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState(initialStats);
  const [activity, setActivity] = useState('Спробуйте будь-який жест, щоб розпочати гру.');

  const addScore = (amount, message, statKey) => {
    setScore((current) => current + amount);
    if (message) {
      setActivity(message);
    }
    if (statKey) {
      setStats((current) => ({
        ...current,
        [statKey]: current[statKey] + 1,
      }));
    }
  };

  const markLongPressCompleted = (amount, durationMs) => {
    setScore((current) => current + amount);
    setActivity(`Довге натискання ${Number(durationMs / 1000).toFixed(1)} с принесло ${amount} очок.`);
    setStats((current) => ({
      ...current,
      longPressCompleted: current.longPressCompleted || durationMs >= 3000,
    }));
  };

  const markDrag = () => {
    setScore((current) => current + 3);
    setActivity('Об’єкт перетягнуто. Drag bonus: +3 очки.');
    setStats((current) => ({
      ...current,
      drags: current.drags + 1,
    }));
  };

  const resetProgress = () => {
    setScore(0);
    setStats(initialStats);
    setActivity('Прогрес скинуто. Можна починати заново.');
  };

  const gameState = { score, stats };
  const tasks = useMemo(() => evaluateTasks(gameState), [score, stats]);
  const completedTasks = tasks.filter((task) => task.completed).length;

  const value = useMemo(
    () => ({
      score,
      stats,
      tasks,
      completedTasks,
      activity,
      themeMode,
      setThemeMode,
      addScore,
      markLongPressCompleted,
      markDrag,
      resetProgress,
    }),
    [activity, completedTasks, score, setThemeMode, stats, tasks, themeMode],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }

  return context;
}
