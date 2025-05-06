import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import LabeledInput from '../components/LabeledInput';
import { commonStyles } from "../styles/commonStyles";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Реєстрація</Text>

            <LabeledInput label="Електронна пошта" keyboardType="email-address" />
            <LabeledInput label="Пароль" secureTextEntry />
            <LabeledInput label="Пароль (ще раз)" secureTextEntry />
            <LabeledInput label="Прізвище" />
            <LabeledInput label="Ім’я" />

            <TouchableHighlight
                style={styles.button}
                underlayColor="#005ac1"
                onPress={() => alert("Зареєстровано")}
            >
                <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    ...commonStyles,
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        height: 38,
        backgroundColor: '#0073ff',
        marginTop: 14,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
});