import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, clearCart } from '../redux/cartSlice';
import { setUserData, selectUserData } from '../redux/userSlice';
import { createOrder, selectOrdersStatus } from '../redux/ordersSlice';
import { validateCheckoutForm } from '../utils/validation';

const CheckoutScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectCartTotalAmount);
    const userData = useSelector(selectUserData);
    const orderStatus = useSelector(selectOrdersStatus);

    const [formData, setFormData] = useState({
        name: userData.name || '',
        email: userData.email || '',
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (cartItems.length === 0) {
            navigation.navigate('Cart');
        }
    }, [cartItems, navigation]);

    const handleSubmit = () => {
        const errors = validateCheckoutForm(formData);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});

        dispatch(setUserData({
            name: formData.name,
            email: formData.email
        }));

        const orderData = {
            items: cartItems,
            totalAmount: totalAmount,
            customer: {
                name: formData.name,
                email: formData.email
            }
        };

        dispatch(createOrder(orderData))
            .unwrap()
            .then(() => {
                dispatch(clearCart());

                Alert.alert(
                    "Замовлення оформлено",
                    "Ваше замовлення успішно створено. Дякуємо за покупку!",
                    [
                        {
                            text: "Переглянути замовлення",
                            onPress: () => navigation.navigate('Orders')
                        },
                        {
                            text: "До каталогу",
                            onPress: () => navigation.navigate('Products')
                        }
                    ]
                );
            })
            .catch((error) => {
                Alert.alert("Помилка", `Не вдалося створити замовлення: ${error}`);
            });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Оформлення замовлення</Text>

            <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Інформація про покупця</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ім'я</Text>
                    <TextInput
                        style={[styles.input, formErrors.name && styles.inputError]}
                        value={formData.name}
                        onChangeText={(text) => setFormData({...formData, name: text})}
                        placeholder="Введіть ваше ім'я"
                    />
                    {formErrors.name && (
                        <Text style={styles.errorText}>{formErrors.name}</Text>
                    )}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, formErrors.email && styles.inputError]}
                        value={formData.email}
                        onChangeText={(text) => setFormData({...formData, email: text})}
                        placeholder="Введіть ваш email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {formErrors.email && (
                        <Text style={styles.errorText}>{formErrors.email}</Text>
                    )}
                </View>
            </View>

            <View style={styles.orderSummary}>
                <Text style={styles.sectionTitle}>Сума замовлення</Text>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Загальна сума:</Text>
                    <Text style={styles.summaryAmount}>{totalAmount} грн</Text>
                </View>
                <Text style={styles.items}>
                    {cartItems.length} {cartItems.length === 1 ? 'товар' :
                    cartItems.length < 5 ? 'товари' : 'товарів'} у кошику
                </Text>
            </View>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={orderStatus === 'loading'}
            >
                {orderStatus === 'loading' ? (
                    <ActivityIndicator color="white" size="small" />
                ) : (
                    <Text style={styles.submitButtonText}>Підтвердити замовлення</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Повернутися до каталогу</Text>
            </TouchableOpacity>
        </ScrollView>
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
    formContainer: {
        backgroundColor: 'white',
        margin: 16,
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    inputError: {
        borderColor: '#e74c3c',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 14,
        marginTop: 4,
    },
    orderSummary: {
        backgroundColor: 'white',
        margin: 16,
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 18,
    },
    summaryAmount: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    items: {
        fontSize: 14,
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#27ae60',
        marginHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        alignItems: 'center',
        marginVertical: 16,
        padding: 12,
    },
    backButtonText: {
        color: '#3498db',
        fontSize: 16,
    },
});

export default CheckoutScreen;