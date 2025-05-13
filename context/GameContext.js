import React, { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Зробити 10 кліків', completed: false, progress: 0, target: 10, type: 'tap' },
        { id: 2, title: 'Зробити подвійний клік 5 разів', completed: false, progress: 0, target: 5, type: 'doubleTap' },
        { id: 3, title: 'Утримувати об\'єкт 3 секунди', completed: false, progress: 0, target: 1, type: 'longPress' },
        { id: 4, title: 'Перетягнути об\'єкт', completed: false, progress: 0, target: 1, type: 'pan' },
        { id: 5, title: 'Зробити свайп вправо', completed: false, progress: 0, target: 1, type: 'flingRight' },
        { id: 6, title: 'Зробити свайп вліво', completed: false, progress: 0, target: 1, type: 'flingLeft' },
        { id: 7, title: 'Змінити розмір об\'єкта', completed: false, progress: 0, target: 1, type: 'pinch' },
        { id: 8, title: 'Отримати 100 очок', completed: false, progress: 0, target: 100, type: 'score' }
    ]);

    useEffect(() => {
        const scoreTask = tasks.find(task => task.type === 'score');
        if (scoreTask && !scoreTask.completed) {
            const updatedTasks = tasks.map(task => {
                if (task.type === 'score') {
                    const newProgress = Math.min(score, task.target);
                    const completed = newProgress >= task.target;
                    return { ...task, progress: newProgress, completed };
                }
                return task;
            });
            setTasks(updatedTasks);
        }
    }, [score]);

    const updateTaskProgress = (type) => {
        const updatedTasks = tasks.map(task => {
            if (task.type === type && !task.completed) {
                const newProgress = Math.min(task.progress + 1, task.target);
                const completed = newProgress >= task.target;
                return { ...task, progress: newProgress, completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const addPoints = (points) => {
        setScore(prevScore => prevScore + points);
    };

    return (
        <GameContext.Provider
            value={{
                score,
                tasks,
                addPoints,
                updateTaskProgress,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};