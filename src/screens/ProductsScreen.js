import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectAllProducts, selectProductsStatus, selectProductsError } from '../redux/productsSlice';
import ProductCard from '../components/ProductCard';

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductsStatus);
    const error = useSelector(selectProductsError);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.loadingText}>Завантаження товарів...</Text>
            </View>
        );
    }

    if (status === 'failed') {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Помилка: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Каталог товарів</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductCard product={item} />}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginHorizontal: 20,
    },
});

export default ProductsScreen;