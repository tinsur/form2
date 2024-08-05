import React, {useState} from 'react';

import styles from './App.module.css';
import {useStore} from './useStore.js';
import FieldInputForm from "./FieldInputForm";
import {useForm} from "react-hook-form";
import FieldInputFormForHookForm from "./FieldInputFormForHookForm";


const sendFormData = (formData) => {
    console.log(formData);
};


function App() {
    //для YUP
    const {getState, updateState} = useStore();
    const onSubmit = (event) => {
        event.preventDefault();

        sendFormData(getState);
    };
    const {email, password, confirmPassword, login, error} = getState;

    //для HookForm
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues: {
            login: '',
        },
    });
    const rulesErrors = {
        required: {value: true, message: 'Поле обязательно для заполнения'},
        login: {
            minLength: {value: 3, message: 'Неверный логин. Должно быть не меньше 3 символов'},
            maxLength: {value: 20, message: 'Неверный логин. Должно быть не больше 20 символов'},

        },
        email: {
            pattern: {
                value: (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                message: 'Некорректная почта',
            },
        },
        password: {
            minLength: {value: 6, message: 'Не менее 6 символов'},

        },
        confirmPassword: {
            minLength: {value: 6, message: 'Не менее 6 символов'},
            pattern: password,
            validate: (value) => {
                return value === watch('password') || 'Пароли не совпадают'
            }
        },
    }

    const massegeErrors = {
        login: errors.login?.message,
        email: errors.email?.message,
        password: errors.password?.message,
        confirmPassword: errors.confirmPassword?.message,
    }


    const propsInput = {
        login: {
            type: 'text',
            field: 'login',
            placeholder: "Логин",
            rulesErrors: rulesErrors,
            massegeErrors: massegeErrors,
            register: register,
        },
        email: {
            type: 'email',
            field: 'email',
            placeholder: 'Почта',
            rulesErrors: rulesErrors,
            massegeErrors: massegeErrors,
            register: register,
        },
        password: {
            type: 'password',
            field: 'password',
            placeholder: 'Пароль',
            rulesErrors: rulesErrors,
            massegeErrors: massegeErrors,
            register: register,
        },
        confirmPassword: {
            type: 'password',
            field: 'confirmPassword',
            placeholder: 'Подтвердите пароль',
            rulesErrors: rulesErrors,
            massegeErrors: massegeErrors,
            register: register,
        },
    };
    const onSubmitFormHook = (data) => console.log('onSubmitFormHook', data)

    return (
        <div className={styles.app}>
            <div>
                <div className={styles.title}>Форма для Yup</div>
                {<form onSubmit={onSubmit} className={styles.formTop}>
                    <FieldInputForm name="login" type='text' placeholder="Логин" value={login} onChangeState={updateState} error={error} onBlurState={updateState}/>
                    <FieldInputForm name="email" type='email' placeholder="Почта" value={email} onChangeState={updateState} error={error} onBlurState={updateState}/>
                    <FieldInputForm name="password" type='password' placeholder="Пароль" value={password} onChangeState={updateState} error={error} onBlurState={updateState}/>
                    <FieldInputForm name="confirmPassword" type='password' placeholder="Подтвердите пароль" value={confirmPassword} onChangeState={updateState} error={error} onBlurState={updateState}/>

                    <button type="submit" disabled={Object.keys(error).length}>Зарегистрироваться</button>

                </form>}
            </div>

            <div>

                <div className={styles.title}>Форма для React Hook Form</div>

                <form onSubmit={handleSubmit(onSubmitFormHook)} className={styles.formTop}>

                    <FieldInputFormForHookForm {...propsInput.login}/>
                    <FieldInputFormForHookForm {...propsInput.email}/>
                    <FieldInputFormForHookForm {...propsInput.password}/>
                    <FieldInputFormForHookForm {...propsInput.confirmPassword}/>

                    <button type="submit" disabled={Object.keys(errors).length}>Зарегистрироваться</button>

                </form>
            </div>


        </div>
    );
}

export default App;
