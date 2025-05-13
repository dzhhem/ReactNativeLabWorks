import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskItem = ({ task }) => {
    const progressPercentage = (task.progress / task.target) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.progressText}>
                    {task.progress} / {task.target} {task.completed ? '✓' : ''}
                </Text>
            </View>
            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${progressPercentage}%` },
                        task.completed ? styles.completed : {}
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
    progressText: {
        color: '#6200EE',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#6200EE',
    },
    completed: {
        backgroundColor: '#4CAF50',
    }
});

export default TaskItem;