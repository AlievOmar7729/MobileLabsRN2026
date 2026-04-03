import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';

export default function ProfileScreen() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        lastName: '',
        firstName: '',
    });

    const [errors, setErrors] = useState({});

    function validate() {
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = 'Введіть електронну пошту';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Невірний формат пошти';
        }

        if (!form.password) {
            newErrors.password = 'Введіть пароль';
        } else if (form.password.length < 6) {
            newErrors.password = 'Пароль мінімум 6 символів';
        }

        if (!form.passwordConfirm) {
            newErrors.passwordConfirm = 'Підтвердіть пароль';
        } else if (form.password !== form.passwordConfirm) {
            newErrors.passwordConfirm = 'Паролі не співпадають';
        }

        if (!form.lastName.trim()) newErrors.lastName = 'Введіть прізвище';
        if (!form.firstName.trim()) newErrors.firstName = 'Введіть ім\'я';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit() {
        if (validate()) {
            alert(`Реєстрація успішна!\nВітаємо, ${form.firstName} ${form.lastName}!`);
        }
    }

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

            <Text style={styles.heading}>Реєстрація</Text>

            <Text style={styles.label}>Прізвище</Text>
            <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                placeholder="Введіть прізвище"
                value={form.lastName}
                onChangeText={v => handleChange('lastName', v)}
            />
            {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

            <Text style={styles.label}>Ім'я</Text>
            <TextInput
                style={[styles.input, errors.firstName && styles.inputError]}
                placeholder="Введіть ім'я"
                value={form.firstName}
                onChangeText={v => handleChange('firstName', v)}
            />
            {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

            <Text style={styles.label}>Електронна пошта</Text>
            <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="example@email.com"
                value={form.email}
                onChangeText={v => handleChange('email', v)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Пароль</Text>
            <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Мінімум 6 символів"
                value={form.password}
                onChangeText={v => handleChange('password', v)}
                secureTextEntry
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Text style={styles.label}>Пароль ще раз</Text>
            <TextInput
                style={[styles.input, errors.passwordConfirm && styles.inputError]}
                placeholder="Повторіть пароль"
                value={form.passwordConfirm}
                onChangeText={v => handleChange('passwordConfirm', v)}
                secureTextEntry
            />
            {errors.passwordConfirm && <Text style={styles.error}>{errors.passwordConfirm}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>ЗАРЕЄСТРУВАТИСЯ</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flexGrow: 1,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
        color: '#222',
    },
    inputError: {
        borderColor: '#E74C3C',
    },
    error: {
        color: '#E74C3C',
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        backgroundColor: '#4A90D9',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});