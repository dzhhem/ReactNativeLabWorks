import { View, Text, Image, StyleSheet } from 'react-native';

export default function NewsCard({ title, date, text }) {
    return (
        <View style={styles.newsItem}>
            <Image source={require('../assets/img/no-image.jpg')} style={styles.imagePlaceholder} />
            <View>
                <Text style={styles.newsTitle}>{title}</Text>
                <Text style={styles.newsDate}>{date}</Text>
                <Text style={styles.newsText}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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