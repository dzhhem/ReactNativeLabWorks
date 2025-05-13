import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useGameContext } from '../context/GameContext';
import Counter from '../components/Counter';
import ClickableObject from '../components/ClickableObject';

const GameScreen = () => {
    const { score } = useGameContext();

    return (
        <SafeAreaView style={styles.container}>
            <Counter score={score} />

            <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>
                    Взаємодійте з об'єктом використовуючи різні жести:
                </Text>
                <Text style={styles.instructionItem}>• Клік - 1 очко</Text>
                <Text style={styles.instructionItem}>• Подвійний клік - 2 очка</Text>
                <Text style={styles.instructionItem}>• Утримання (3 сек) - 5 очок</Text>
                <Text style={styles.instructionItem}>• Свайп вліво/вправо - випадкові очки</Text>
                <Text style={styles.instructionItem}>• Масштабування - 3 очка</Text>
            </View>

            <ClickableObject />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    instructionContainer: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    instructionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    instructionItem: {
        fontSize: 14,
        marginBottom: 4,
    },
});

export default GameScreen;