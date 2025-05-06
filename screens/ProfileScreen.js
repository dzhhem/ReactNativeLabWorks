import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Реєстрація</Text>

            <Text style={styles.label}>Електронна пошта</Text>
            <TextInput style={styles.input} keyboardType="email-address" />

            <Text style={styles.label}>Пароль</Text>
            <TextInput style={styles.input} secureTextEntry={true} />

            <Text style={styles.label}>Пароль (ще раз)</Text>
            <TextInput style={styles.input} secureTextEntry={true} />

            <Text style={styles.label}>Прізвище</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Ім’я</Text>
            <TextInput style={styles.input} />

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
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 2,
        padding: 10,
        marginBottom: 10,
    },
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