const handleLogin = () => {
    if (validateEmailInput() && validatePasswordInput()) {
        alert('Login successfully');
        return true;
    }

    return false;
}

const validateEmailInput = () => {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailValue = emailInput.value.trim();

    if (!minLength(emailValue, 1)) {
        setErrorMessage(emailError, "*Please enter your email address.");
        return false;
    } else if (!isValidEmail(emailValue)) {
        setErrorMessage(emailError, "*Please enter a valid email address.");
        return false;
    } else {
        clearErrorMessage(emailError);
    }

    return true;
}

const validatePasswordInput = () => {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const passwordValue = passwordInput.value;

    if (!minLength(passwordValue, 6)) {
        setErrorMessage(passwordError, "*Your password cannot be less than 6 characters");
        return false;
    } else {
        clearErrorMessage(passwordError);
    }

    return true;
}

const setErrorMessage = (element, message) => {
    element.innerHTML = message;
    element.style.opacity = "1";
    element.style.transition = "150ms";
}

const clearErrorMessage = (element) => {
    element.style.opacity = "0";
    element.style.transition = "150ms";
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const minLength = (value, length) => {
    return value.length >= length;
}