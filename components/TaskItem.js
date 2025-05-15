import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

const TaskItem = ({ task, onDelete, onToggle }) => {
    const formattedDate = new Date(task.date).toLocaleString('uk-UA', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={onToggle}>
                <FontAwesome5
                    name={task.isCompleted ? 'check-square' : 'square'}
                    size={32}
                    color={task.isCompleted ? 'green' : '#888'}
                />
            </TouchableOpacity>

            <View style={styles.info}>
                <Text style={styles.title}>{task.title}</Text>
                <Text>{task.description}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>

            <TouchableOpacity style={styles.bin} onPress={onDelete}>
                <AntDesign name="delete" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    info: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    date: {
        color: '#888',
        fontSize: 12,
    },
    bin: {
        backgroundColor: '#e53a35',
        padding: 8,
        borderRadius: 8,
    }
});

export default TaskItem;
