import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
    const { id, name, description, price, imageUrl } = product;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, imageUrl }));
    };

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {description}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>{price} грн</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddToCart}
                    >
                        <Text style={styles.buttonText}>Додати до кошика</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        lineHeight: 16,
        color: '#666',
        marginBottom: 12,
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#3498db',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default ProductCard;