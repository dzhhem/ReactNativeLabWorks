import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';

const CartItem = ({ item }) => {
    const { id, name, price, quantity, imageUrl } = item;
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>{price} грн</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => dispatch(decreaseQuantity(id))}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => dispatch(increaseQuantity(id))}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => dispatch(removeFromCart(id))}
                >
                    <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.totalPrice}>{price * quantity} грн</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 8,
    },
    image: {
        width: 85,
        height: 85,
        marginRight: 10,
    },
    details: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#eee',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 10,
        minWidth: 20,
        textAlign: 'center',
    },
    rightContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: 10,
    },
    removeButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        fontSize: 18,
        color: '#e74c3c',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartItem;