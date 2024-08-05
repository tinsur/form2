import {useState} from 'react';
import {initialState} from "./Utils/const";
import * as yup from 'yup';

const validateAndGetErrorMessage = (schema, value) => {
    let errorMessage = null;

    try {
        schema.validateSync(value,{abortEarly:false});
    } catch ({errors}) {
        errorMessage = errors
            .reduce((message, error) => message + error + '\n', '')
            .trim();
    }

    return errorMessage;
};


const loginChangeSchema = yup.string()
    .matches(/^[a-zA-Zа-яА-Я0-9_]*$/, 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание')
    .max(20, 'Неверный логин. Должно быть не больше 20 символов');

const loginBlurSchema = yup.string()
    .min(3, 'Неверный логин. Должно быть не меньше 3 символов');

const emailBlurSchema = yup.string()
    .email('Некорректная почта')
    .required('Поле обязательно для заполнения');

const passwordBlurSchema = yup.string()
     .max(10, 'Не более 10 символов')
         .min(6, 'Не менее 6 символов')

const confirmPasswordBlurSchema = yup.string()
     .max(10, 'Не более 10 символов')
         .min(6, 'Не менее 6 символов')
.oneOf([yup.ref('passwordBlurSchema')], 'Пароли не совпадают')



export const useStore = () => {
    const [state, setState] = useState(initialState);

    return {
        getState: state,
        updateState: (fieldName, event) => {
            let errorObj = state.error;
            let fieldValue = event.target.value.trim();
            let errorMessage = null;

            switch (fieldName) {
                case 'login':
                    errorMessage = validateAndGetErrorMessage(loginChangeSchema, fieldValue);
                    if (event.type === 'blur') {
                        errorMessage = validateAndGetErrorMessage(loginBlurSchema, fieldValue);
                    }
                    (errorMessage) ? errorObj[fieldName] = errorMessage : delete errorObj[fieldName];
                    break;
                    case 'email':
                    if (event.type === 'blur') {
                        errorMessage = validateAndGetErrorMessage(emailBlurSchema, fieldValue);
                        (errorMessage) ? errorObj[fieldName] = errorMessage : delete errorObj[fieldName];
                    }
                    break;
                    case 'password':
                    if (event.type === 'blur') {
                        errorMessage = validateAndGetErrorMessage(passwordBlurSchema, fieldValue);
                        (errorMessage) ? errorObj[fieldName] = errorMessage : delete errorObj[fieldName];
                    }
                    break;
                     case 'confirmPassword':
                    if (event.type === 'blur') {
                        errorMessage = validateAndGetErrorMessage(confirmPasswordBlurSchema, fieldValue);
                        (errorMessage) ? errorObj[fieldName] = errorMessage : delete errorObj[fieldName];
                    }
                    break;

            }

            setState({...state, [fieldName]: fieldValue, error: errorObj});
        },

    };
};