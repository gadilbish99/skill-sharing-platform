import * as EmailValidator from 'email-validator';

const MAX_TEXT_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 10;
const MAX_EMAIL_LENGTH = 20;
const MIN_LENGTH = 0;

const nameTranslation = {
    firstName: "Name",
    lastName: "Name",
    email: "Email",
    password: "Password"
};

const ACCEPTED_RESULT = {
    canAddInput: true,
    resultMsg: ''
};

const UNDEFINED_RESULT = {
    canAddInput: false,
    resultMsg: 'Undefined'
};

const TOO_LONG_RESULT = {
    canAddInput: false,
    resultMsg: 'Too Long'
};

const INVALID_EMAIL_RESULT = {
    canAddInput: true,
    resultMsg: 'Email is invalid'
};

function isRequired(text, key) {
    if (text.length <= MIN_LENGTH)
        return `${nameTranslation[key]} is required`;
    else
        return '';
}

function isValidEmail(text) {
    return EmailValidator.validate(text);
}

export function validateInputChange(text, type) {
    if (typeof text === 'undefined' || typeof type === 'undefined') 
        return UNDEFINED_RESULT;
    else if (type === 'text' && text.length <= MAX_TEXT_LENGTH)
        return ACCEPTED_RESULT;
    else if (type === 'password' && text.length <= MAX_PASSWORD_LENGTH)
        return ACCEPTED_RESULT;
    else if (type === 'email' && text.length <= MAX_EMAIL_LENGTH) {
        if (isValidEmail(text))
            return ACCEPTED_RESULT;
        else
            return INVALID_EMAIL_RESULT;
    }
    else
        return TOO_LONG_RESULT; 
}

export function performFinalValidation(data) {
    let entries = Object.entries(data);
    let newWarning = entries.map(([key, value]) => {
      return {key: key, value: isRequired(value, key)};
    }).reduce((dict, entry) => ({...dict, [entry.key]: entry.value}), {});

    if (newWarning.email === '' && !isValidEmail(data.email))
        newWarning = {...newWarning, email: 'Email is invalid'};

    return {
        isValid: Object.values(newWarning).every(value => value === ''),
        newWarning: newWarning
    };
}