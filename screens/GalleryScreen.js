import { View, StyleSheet, FlatList } from 'react-native';

const data = new Array(12).fill(null).map((_, i) => ({ id: i.toString() }));

export default function GalleryScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={() => <View style={styles.imageBox} />}
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
    imageBox: {
        width: '45%',
        aspectRatio: 1.50,
        backgroundColor: '#eee',
        margin: '2.5%',
        borderRadius: 6,
    },
});