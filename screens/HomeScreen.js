import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const data = new Array(12).fill(null).map((_, i) => ({
    id: i.toString(),
    title: 'Заголовок новини',
    date: 'Дата новини',
    text: 'Короткий текст новини',
}));

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Новини</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.newsItem}>
                        <Image source={require('../assets/img/no-image.jpg')} style={styles.imagePlaceholder} />
                        <View>
                            <Text style={styles.newsTitle}>{item.title}</Text>
                            <Text style={styles.newsDate}>{item.date}</Text>
                            <Text style={styles.newsText}>{item.text}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 18,
    },
    newsItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    imagePlaceholder: {
        resizeMode: 'cover',
        width: 80,
        height: 80,
        marginRight: 12,
    },
    newsTitle: {
        fontWeight: 500,
        fontSize: 18,
    },
    newsDate: {
        color: '#bbb',
        fontSize: 14,
    },
    newsText: {
        color: '#444',
        fontSize: 16,
    }
});