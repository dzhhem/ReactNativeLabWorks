import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllOrders } from '../redux/ordersSlice';
import OrderItem from '../components/OrderItem';

const OrdersScreen = ({ navigation }) => {
    const orders = useSelector(selectAllOrders);

    const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (orders.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>У вас ще немає замовлень</Text>
                <TouchableOpacity
                    style={styles.shopButton}
                    onPress={() => navigation.navigate('Shop', { screen: 'Products' })}
                >
                    <Text style={styles.shopButtonText}>Перейти до каталогу</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Історія замовлень</Text>
            <FlatList
                data={sortedOrders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderItem order={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    list: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    shopButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    shopButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default OrdersScreen;