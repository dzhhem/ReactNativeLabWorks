import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import AddTask from '../components/AddTask';
import TaskItem from '../components/TaskItem';

const TodoScreen = () => {
    const [tasks, setTasks] = useState([]);

    const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
    const API_KEY = Constants.expoConfig.extra.oneSignalApiKey;

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const stored = await AsyncStorage.getItem('tasks');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    parsed.sort((a, b) => a.date - b.date);
                    setTasks(parsed);
                }
            } catch (err) {
                console.error('Failed to load tasks:', err);
            }
        };

        loadTasks();
    }, []);

    const scheduleNotification = async (task) => {
        const url = 'https://api.onesignal.com/notifications?c=push';
        const externalId = await AsyncStorage.getItem('externalId');
        const sendAfter = moment(task.date).tz('Europe/Kiev', true).toDate().toISOString();

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Basic ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    app_id: APP_ID,
                    headings: { en: task.title },
                    contents: { en: task.description },
                    send_after: sendAfter,
                    include_external_user_ids: [externalId],
                }),
            });

            const data = await res.json();
            if (data.errors) return false;
            return data.id;
        } catch (err) {
            console.error('Notification error:', err);
            return false;
        }
    };

    const cancelNotification = async (notificationId) => {
        const url = `https://api.onesignal.com/notifications/${notificationId}?app_id=${APP_ID}`;

        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Basic ${API_KEY}`,
                },
            });
            const json = await res.json();
            console.log('Canceled:', json);
        } catch (err) {
            console.error('Failed to cancel notification:', err);
        }
    };

    const saveTasks = async (updated) => {
        await AsyncStorage.setItem('tasks', JSON.stringify(updated));
    };

    const handleAddTask = async (task) => {
        const taskTimestamp = new Date(task.date).getTime();
        const nowTimestamp = Date.now();

        if (taskTimestamp < nowTimestamp) {
            alert('Неможливо створити завдання в минулому!');
            return;
        }

        const notificationId = await scheduleNotification(task);

        if (!notificationId) {
            alert('Не вдалося запланувати сповіщення!');
            return;
        }

        const newTask = { id: notificationId, ...task };
        const updated = [newTask, ...tasks].sort((a, b) => a.date - b.date);
        setTasks(updated);
        await saveTasks(updated);
    };

    const handleDeleteTask = async (id) => {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            await cancelNotification(task.id);
        }
        const updated = tasks.filter((t) => t.id !== id);
        setTasks(updated);
        await saveTasks(updated);
    };

    const toggleTaskCompletion = async (id) => {
        let updated = tasks.map((t) =>
            t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        );

        const updatedTask = updated.find((t) => t.id === id);

        if (updatedTask.isCompleted) {
            await cancelNotification(updatedTask.id);
        } else {
            const now = Date.now();
            if (updatedTask.date < now) {
                alert('Час терміну виконання завдання вже минув, сповіщення не буде заплановано!');
            } else {
                const newNotificationId = await scheduleNotification(updatedTask);
                if (newNotificationId) {
                    updated = updated.map((t) =>
                        t.id === id ? { ...t, id: newNotificationId } : t
                    );
                } else {
                    alert('Не вдалося запланувати сповіщення!');
                }
            }
        }

        setTasks(updated);
        await saveTasks(updated);
    };

    return (
        <>
            <Text style={styles.title}>📝 To-Do Reminder</Text>
            <AddTask onAdd={handleAddTask} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem task={item} onDelete={() => handleDeleteTask(item.id)} onToggle={() => toggleTaskCompletion(item.id)}/>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Немає завдань 📭</Text>
                }
            />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 26,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#777',
        fontWeight: 'bold',
    },
});

export default TodoScreen;
