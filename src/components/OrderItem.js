import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderItem = ({ order }) => {
    const { id, date, items, totalAmount } = order;

    const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Kyiv',
    });

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.orderId}>№{id.slice(-6)}</Text>
            </View>
            <View style={styles.details}>
                <Text>Товарів: <Text style={styles.bold}>{totalItems} шт.</Text></Text>
                <Text style={styles.amount}>Сума: <Text style={styles.bold}>{totalAmount} грн</Text></Text>
            </View>
            <View style={styles.itemsList}>
                {items.map((item, index) => (
                    <Text key={index} style={styles.item}>
                        {item.name} - {item.quantity} шт. x {item.price} грн
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    orderId: {
        fontSize: 14,
        color: '#666',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    bold: {
        fontWeight: 'bold',
        color: '#333',
    },
    amount: {
        fontSize: 14,
    },
    itemsList: {
        paddingTop: 5,
    },
    item: {
        fontSize: 13,
        color: '#555',
        marginBottom: 3,
    },
});

export default OrderItem;