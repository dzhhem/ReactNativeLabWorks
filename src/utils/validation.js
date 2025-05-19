export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateName = (name) => {
    return name && name.trim().length >= 3;
};

export const validateCheckoutForm = (formData) => {
    const errors = {};

    if (!validateName(formData.name)) {
        errors.name = "Ім'я повинно містити щонайменше 3 символи";
    }

    if (!validateEmail(formData.email)) {
        errors.email = "Введіть коректний email";
    }

    return errors;
};