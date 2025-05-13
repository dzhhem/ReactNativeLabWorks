import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { useGameContext } from '../context/GameContext';
import TaskItem from '../components/TaskItem';

const TasksScreen = () => {
    const { tasks, score } = useGameContext();

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.scoreText}>Рахунок: {score}</Text>
                <Text style={styles.progressText}>
                    Прогрес: {completedTasks}/{totalTasks} завдань
                </Text>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TaskItem task={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6200EE',
        marginBottom: 4
    },
    progressText: {
        fontSize: 16,
        color: '#666',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default TasksScreen;