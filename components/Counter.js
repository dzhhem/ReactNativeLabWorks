import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Counter = ({ score }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Рахунок:</Text>
            <Text style={styles.score}>{score}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    label: {
        fontSize: 18,
        color: '#666',
    },
    score: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#6200EE',
    },
});

export default Counter;