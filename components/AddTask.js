import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';

const AddTask = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) {
            alert('Будь ласка, заповніть назву та опис.');
            return;
        }

        const newTask = {
            title: title.trim(),
            description: description.trim(),
            date: date.getTime(),
            isCompleted: false,
        };

        onAdd(newTask);
        setTitle('');
        setDescription('');
        setDate(new Date());
    };

    const formatDateUA = (d) =>
        d.toLocaleString('uk-UA', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Назва"
                placeholderTextColor="#777"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Опис"
                placeholderTextColor="#777"
                value={description}
                onChangeText={setDescription}
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={[styles.input, {color: '#777'}]}>
                    Виберіть дату та час: {formatDateUA(date)}
                </Text>
            </TouchableOpacity>

            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                }}
                onCancel={() => setOpen(false)}
                mode="datetime"
                locale="uk"
                minimumDate={new Date()}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>ДОДАТИ НАГАДУВАННЯ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    input: {
        fontSize: 16,
        backgroundColor: '#fff',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#2296f3',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddTask;
