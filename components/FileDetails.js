import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import { formatSize } from '../utils/format';

const FileDetails = ({ route }) => {
    const { fileInfo } = route.params;

    const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();

        const fileTypes = {
            'txt': 'Текстовий файл',
            'pdf': 'PDF документ',
            'doc': 'Word документ',
            'docx': 'Word документ',
            'xls': 'Excel таблиця',
            'xlsx': 'Excel таблиця',
            'ppt': 'PowerPoint презентація',
            'pptx': 'PowerPoint презентація',
            'zip': 'ZIP архів',
            'rar': 'RAR архів',
            'json': 'JSON файл',
            'js': 'JavaScript файл',
            'html': 'HTML файл',
            'css': 'CSS файл',
        };

        return fileTypes[extension] || `Файл ${extension.toUpperCase()}`;
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Невідомо';

        const date = new Date(timestamp * 1000);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Назва файлу:</Text>
                    <Text style={styles.detailValue}>{fileInfo.name}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Тип файлу:</Text>
                    <Text style={styles.detailValue}>{getFileType(fileInfo.name)}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Розмір:</Text>
                    <Text style={styles.detailValue}>{formatSize(fileInfo.size)}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Дата останньої модифікації:</Text>
                    <Text style={styles.detailValue}>{formatDate(fileInfo.modificationTime)}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    detailsCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        elevation: 2,
    },
    detailRow: {
        marginBottom: 15,
    },
    detailLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    detailValue: {
        fontSize: 16,
    },
});

export default FileDetails;