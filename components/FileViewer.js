import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';

const FileViewer = ({ route, navigation }) => {
    const { filePath, fileName } = route.params;
    const [fileContent, setFileContent] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadFileContent = async () => {
            try {
                const content = await FileSystem.readAsStringAsync(filePath);
                setFileContent(content);
                setEditedContent(content);
                setIsLoading(false);
            } catch (error) {
                console.error('Error reading file:', error);
                Alert.alert('Помилка', 'Не вдалося зчитати вміст файлу');
                navigation.goBack();
            }
        };

        loadFileContent();
    }, [filePath]);

    const saveChanges = async () => {
        setIsLoading(true);
        try {
            await FileSystem.writeAsStringAsync(filePath, editedContent);
            setFileContent(editedContent);
            setIsEditing(false);
            Alert.alert('Успіх', 'Файл успішно збережено');
            navigation.goBack({ updated: true });
        } catch (error) {
            console.error('Error saving file:', error);
            Alert.alert('Помилка', 'Не вдалося зберегти зміни до файлу');
        } finally {
            setIsLoading(false);
        }
    };

    const cancelEditing = () => {
        setEditedContent(fileContent);
        setIsEditing(false);
    };

    const renderButtons = () => {
        if (isEditing) {
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelEditing}>
                        <MaterialIcons name="cancel" size={20} color="white" />
                        <Text style={styles.buttonText}>Скасувати</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveChanges}>
                        <MaterialIcons name="save" size={20} color="white" />
                        <Text style={styles.buttonText}>Зберегти</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => setIsEditing(true)}
                    >
                        <MaterialIcons name="edit" size={20} color="white" />
                        <Text style={styles.buttonText}>Редагувати</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Завантаження...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.fileInfoContainer}>
                <Text style={styles.fileName}>{fileName}</Text>
            </View>

            {isEditing ? (
                <TextInput
                    style={styles.editorInput}
                    multiline
                    value={editedContent}
                    onChangeText={setEditedContent}
                />
            ) : (
                <ScrollView style={styles.viewerContainer}>
                    <Text style={styles.fileContentText}>{fileContent}</Text>
                </ScrollView>
            )}

            <View style={styles.actionContainer}>
                {renderButtons()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
    },
    fileInfoContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 1,
    },
    fileName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewerContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    fileContentText: {
        fontSize: 16,
        lineHeight: 22,
    },
    editorInput: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 22,
    },
    actionContainer: {
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flex: 1,
        margin: 5,
    },
    editButton: {
        backgroundColor: '#2196F3',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
    cancelButton: {
        backgroundColor: '#757575',
    },
    buttonText: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold',
    },
});

export default FileViewer;