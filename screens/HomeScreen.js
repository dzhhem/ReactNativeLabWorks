import { View, Text, StyleSheet, FlatList } from 'react-native';
import NewsCard from '../components/NewsCard';
import { commonStyles } from '../styles/commonStyles';

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
                    <NewsCard title={item.title} date={item.date} text={item.text} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ...commonStyles,
});