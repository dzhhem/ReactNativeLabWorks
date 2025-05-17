import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
    ActivityIndicator
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { formatSize } from '../utils/format';

const FileManager = ({ navigation }) => {
    const [currentPath, setCurrentPath] = useState(FileSystem.documentDirectory + 'AppData/');
    const [directoryContent, setDirectoryContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [modalType, setModalType] = useState('folder');
    const [memoryStats, setMemoryStats] = useState({
        total: 0,
        free: 0,
        used: 0
    });

    useFocusEffect(
        React.useCallback(() => {
            loadDirectoryContent();
        }, [currentPath])
    );

    const loadDirectoryContent = async () => {
        setIsLoading(true);
        try {
            const content = await FileSystem.readDirectoryAsync(currentPath);

            const contentWithInfo = await Promise.all(
                content.map(async (item) => {
                    const itemPath = currentPath + item;
                    const info = await FileSystem.getInfoAsync(itemPath);
                    return {
                        name: item,
                        path: itemPath,
                        isDirectory: info.isDirectory,
                        size: info.size,
                        modificationTime: info.modificationTime,
                    };
                })
            );

            contentWithInfo.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });

            setDirectoryContent(contentWithInfo);
        } catch (error) {
            console.error('Error loading directory content:', error);
            Alert.alert('Помилка', 'Не вдалося завантажити вміст директорії');
        } finally {
            setIsLoading(false);
        }
    };

    const loadMemoryStats = async () => {
        try {
            const totalDiskCapacity = await FileSystem.getTotalDiskCapacityAsync();
            const freeDiskStorage = await FileSystem.getFreeDiskStorageAsync();

            setMemoryStats({
                total: totalDiskCapacity,
                free: freeDiskStorage,
                used: totalDiskCapacity - freeDiskStorage
            });
        } catch (error) {
            console.error('Error loading memory stats:', error);
        }
    };

    useEffect(() => {
        loadDirectoryContent();
        loadMemoryStats();
    }, [currentPath]);

    const handleItemPress = async (item) => {
        if (item.isDirectory) {
            setCurrentPath(item.path + '/');
        } else {
            navigation.navigate('FileViewer', {
                filePath: item.path,
                fileName: item.name
            });
        }
    };

    const handleItemLongPress = async (item) => {
        if (item.isDirectory) {
            return null;
        } else {
            navigation.navigate('FileDetails', {
                fileInfo: item
            });
        }
    };

    const handleGoBack = () => {
        if (currentPath !== FileSystem.documentDirectory + 'AppData/') {
            const pathParts = currentPath.split('/');
            pathParts.pop();
            pathParts.pop();
            const parentPath = pathParts.join('/') + '/';
            setCurrentPath(parentPath);
        }
    };

    const createNewFolder = async () => {
        if (!newFolderName.trim()) {
            Alert.alert('Помилка', 'Ім\'я папки не може бути порожнім');
            return;
        }

        try {
            const folderPath = currentPath + newFolderName;
            const folderInfo = await FileSystem.getInfoAsync(folderPath);

            if (folderInfo.exists) {
                Alert.alert('Помилка', 'Папка з такою назвою вже існує');
                return;
            }

            await FileSystem.makeDirectoryAsync(folderPath);
            setModalVisible(false);
            setNewFolderName('');
            loadDirectoryContent();
        } catch (error) {
            console.error('Error creating folder:', error);
            Alert.alert('Помилка', 'Не вдалося створити папку');
        }
    };

    const createNewFile = async () => {
        if (!newFileName.trim()) {
            Alert.alert('Помилка', 'Ім\'я файлу не може бути порожнім');
            return;
        }

        const hasExtension = (name) => {
            const parts = name.split('.');
            return parts.length > 1 && parts[parts.length - 1].trim().length > 0;
        };

        const fileName = hasExtension(newFileName) ? newFileName : `${newFileName}.txt`;

        try {
            const filePath = currentPath + fileName;
            const fileInfo = await FileSystem.getInfoAsync(filePath);

            if (fileInfo.exists) {
                Alert.alert('Помилка', 'Файл з такою назвою вже існує');
                return;
            }

            await FileSystem.writeAsStringAsync(filePath, fileContent);
            setModalVisible(false);
            setNewFileName('');
            setFileContent('');
            loadDirectoryContent();
        } catch (error) {
            console.error('Error creating file:', error);
            Alert.alert('Помилка', 'Не вдалося створити файл');
        }
    };

    const handleDelete = (item) => {
        Alert.alert(
            'Підтвердження',
            `Ви впевнені, що хочете видалити ${item.isDirectory ? 'папку' : 'файл'} "${item.name}"?`,
            [
                {
                    text: 'Скасувати',
                    style: 'cancel'
                },
                {
                    text: 'Видалити',
                    onPress: async () => {
                        try {
                            await FileSystem.deleteAsync(item.path);
                            loadDirectoryContent();
                        } catch (error) {
                            console.error('Error deleting item:', error);
                            Alert.alert('Помилка', 'Не вдалося видалити елемент');
                        }
                    },
                    style: 'destructive'
                }
            ]
        );
    };

    const getFormattedPath = () => {
        const basePath = FileSystem.documentDirectory + 'AppData/';
        const relativePath = currentPath.substring(basePath.length);
        return relativePath ? `AppData/${relativePath}` : 'AppData/';
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.itemContent} onPress={() => handleItemPress(item)} onLongPress={() => handleItemLongPress(item)}>
                <MaterialIcons
                    name={item.isDirectory ? 'folder' : 'insert-drive-file'}
                    size={24}
                    color={item.isDirectory ? '#FFD700' : '#9E9E9E'}
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    {!item.isDirectory && (
                        <Text style={styles.itemInfo}>{formatSize(item.size)}</Text>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item)}>
                <MaterialIcons name="delete" size={28} color="red" />
            </TouchableOpacity>
        </View>
    );

    const renderModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>
                        {modalType === 'folder' ? 'Створити нову папку' : 'Створити новий файл'}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder={modalType === 'folder' ? 'Назва папки' : 'Назва файлу'}
                        value={modalType === 'folder' ? newFolderName : newFileName}
                        onChangeText={modalType === 'folder' ? setNewFolderName : setNewFileName}
                    />

                    {modalType === 'file' && (
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Вміст файлу"
                            multiline
                            numberOfLines={4}
                            value={fileContent}
                            onChangeText={setFileContent}
                        />
                    )}

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => {
                                setModalVisible(false);
                                setNewFolderName('');
                                setNewFileName('');
                                setFileContent('');
                            }}
                        >
                            <Text style={styles.buttonText}>Скасувати</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonCreate]}
                            onPress={modalType === 'folder' ? createNewFolder : createNewFile}
                        >
                            <Text style={styles.buttonText}>Створити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <View style={styles.memoryStatsContainer}>
                <Text style={styles.memoryStatsTitle}>Статистика використання пам'яті:</Text>
                <Text>Загальний обсяг: {formatSize(memoryStats.total)}</Text>
                <Text>Вільний простір: {formatSize(memoryStats.free)}</Text>
                <Text>Зайнятий простір: {formatSize(memoryStats.used)}</Text>
            </View>

            <View style={styles.pathContainer}>
                <Text style={styles.pathText}>Поточний шлях: {getFormattedPath()}</Text>
                {currentPath !== FileSystem.documentDirectory + 'AppData/' && (
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <MaterialIcons name="arrow-upward" size={16} color="black" />
                        <Text style={styles.backButtonText}>Вгору</Text>
                    </TouchableOpacity>
                )}
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <FlatList
                    data={directoryContent}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.path}
                    style={styles.list}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Ця папка порожня</Text>
                    }
                />
            )}

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.folderButton]}
                    onPress={() => {
                        setModalType('folder');
                        setModalVisible(true);
                    }}
                >
                    <MaterialIcons name="create-new-folder" size={24} color="white" />
                    <Text style={styles.actionButtonText}>Нова папка</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.fileButton]}
                    onPress={() => {
                        setModalType('file');
                        setModalVisible(true);
                    }}
                >
                    <MaterialIcons name="note-add" size={24} color="white" />
                    <Text style={styles.actionButtonText}>Новий файл</Text>
                </TouchableOpacity>
            </View>

            {renderModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    memoryStatsContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 12,
        elevation: 1,
    },
    memoryStatsTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pathContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 12,
        elevation: 1,
    },
    pathText: {
        flex: 1,
        fontSize: 14,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    backButtonText: {
        marginLeft: 5,
    },
    list: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    emptyText: {
        textAlign: 'center',
        margin: 20,
        color: '#757575',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDetails: {
        marginLeft: 10,
        flex: 1,
    },
    itemName: {
        fontSize: 16,
    },
    itemInfo: {
        fontSize: 12,
        color: '#757575',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flex: 1,
        margin: 5,
    },
    folderButton: {
        backgroundColor: '#4CAF50',
    },
    fileButton: {
        backgroundColor: '#2196F3',
    },
    actionButtonText: {
        color: 'white',
        marginLeft: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonCancel: {
        backgroundColor: '#757575',
    },
    buttonCreate: {
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FileManager;