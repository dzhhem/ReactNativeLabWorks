import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, clearCart } from '../redux/cartSlice';
import CartItem from '../components/CartItem';

const CartScreen = ({ navigation }) => {
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectCartTotalAmount);
    const dispatch = useDispatch();

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            navigation.navigate('Shop', { screen: 'Checkout' });
        }
    };

    if (cartItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Ваш кошик порожній</Text>
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
            <Text style={styles.title}>Кошик</Text>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CartItem item={item} />}
                contentContainerStyle={styles.list}
            />

            <View style={styles.summary}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Загальна сума:</Text>
                    <Text style={styles.summaryAmount}>{totalAmount} грн</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.clearButton]}
                        onPress={() => dispatch(clearCart())}
                    >
                        <Text style={styles.clearButtonText}>Очистити кошик</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.checkoutButton]}
                        onPress={handleCheckout}
                    >
                        <Text style={styles.checkoutButtonText}>Оформити замовлення</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    summary: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 18,
    },
    summaryAmount: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButton: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        marginRight: 10,
    },
    clearButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    checkoutButton: {
        flex: 2,
        backgroundColor: '#3498db',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
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

export default CartScreen;