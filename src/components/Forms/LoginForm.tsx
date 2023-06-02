import React, { useEffect, useState } from 'react';
import { userSlice } from '../../store/reducers/UserSlice';
import { useAppDispatch } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/BASE_URL';
import { setToken } from '../../utils/Axios';
import Input from '../input/Input';
import Button from '../Buttons/Button';
import ErrorSpan from '../error-span/ErrorSpan';

interface iErrors {
    login: string;
    password: string;
    invalidCredentials: string;
}

interface iLoginForm {
    registration?: boolean;
    successReg?: boolean;
}

const LoginForm: React.FC<iLoginForm> = ({ registration, successReg }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<iErrors>({
        login: '',
        password: '',
        invalidCredentials: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const { logIn } = userSlice.actions;
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isValidForm = (): boolean => {
        let errorCounter = 0;
        if (login.trim().length <= 0) {
            setErrors((prevState: iErrors) => ({
                ...prevState,
                login: 'Login cannot be empty',
            }));
            errorCounter += 1;
        } else {
            setErrors((prevState: iErrors) => ({
                ...prevState,
                login: '',
            }));
        }

        if (password.length <= 3) {
            setErrors((prevState: iErrors) => ({
                ...prevState,
                password: 'Password cannot be less than 4 characters',
            }));
            errorCounter += 1;
        } else {
            setErrors((prevState: iErrors) => ({
                ...prevState,
                password: '',
            }));
        }

        if (errorCounter > 0) {
            return false;
        } else {
            return true;
        }
    };

    const signIn = async () => {
        const isValid = isValidForm();

        if (!isValid) {
            return;
        }

        if (errors.login.length > 0 || errors.password.length > 0) {
            return;
        } else {
            setIsLoading(true);
            await serverLogin();
            setIsLoading(false);
        }
    };

    const handleRegister = async () => {
        const isValid = isValidForm();

        if (!isValid) {
            return;
        }

        if (errors.login.length > 0 || errors.password.length > 0) {
            return;
        } else {
            setIsLoading(true);
            await serverRegistration();
            setIsLoading(false);
        }
    };

    const serverRegistration = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}api/auth/registration`,
                {
                    username: login,
                    password,
                }
            );

            if (response.status >= 200 && response.status <= 299) {
                setErrors({
                    invalidCredentials: '',
                    login: '',
                    password: '',
                });
                return navigate('/registrationSuccess');
            }
        } catch (e: any) {
            setErrors({
                ...errors,
                invalidCredentials: e.response.data.message,
            });
        }
    };

    const serverLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}api/auth/login`, {
                username: login,
                password,
            });

            if (response.status >= 400 && response.status < 500) {
                setErrors({
                    ...errors,
                    invalidCredentials: 'Invalid login or password',
                });
            } else if (response.status > 500) {
                setErrors({
                    ...errors,
                    invalidCredentials:
                        'Server error, please try again later...',
                });
            } else {
                unsetErrors();

                const token = response.data.token;
                setToken(token);
                window.localStorage.setItem('token', token);

                dispatch(logIn());
            }
        } catch (e: any) {
            setErrors({
                ...errors,
                invalidCredentials: e.response?.data?.message,
            });
        }
    };

    const handleNeedAccount = () => {
        return navigate('/registration');
    };

    const handleBackToLogin = () => {
        return navigate('/login');
    };

    const unsetErrors = () => {
        setErrors({
            invalidCredentials: '',
            login: '',
            password: '',
        });
    };

    useEffect(() => {
        unsetErrors();
    }, [registration, successReg]);

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                {successReg && (
                    <div className='text-white p-2 bg-green-600 mt-4'>
                        Successful registration
                    </div>
                )}
                <div className='flex gap-4 my-6 justify-center'>
                    <div className='flex flex-col gap-2 justify-center'>
                        <label htmlFor='loginField'>Login</label>
                        <label htmlFor='passwordField'>Password</label>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Input
                            id='loginField'
                            type='text'
                            value={login}
                            onChange={setLogin}
                            isValid={errors.login.length === 0}
                        />

                        <Input
                            id='passwordField'
                            type='password'
                            value={password}
                            onChange={setPassword}
                            isValid={errors.password.length === 0}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <ErrorSpan isVisible={!!errors.login}>
                        {errors.login}
                    </ErrorSpan>
                    <ErrorSpan isVisible={!!errors.password}>
                        {errors.password}
                    </ErrorSpan>
                    <ErrorSpan isVisible={!!errors.invalidCredentials}>
                        {errors.invalidCredentials}
                    </ErrorSpan>
                    {!registration && (
                        <>
                            <Button
                                type='button'
                                disabled={isLoading}
                                onClick={signIn}
                            >
                                Sign In
                            </Button>
                            <Button
                                type='button'
                                disabled={isLoading}
                                onClick={handleNeedAccount}
                            >
                                Don't have an account?
                            </Button>
                        </>
                    )}

                    {registration && (
                        <>
                            <Button
                                type='button'
                                disabled={isLoading}
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                            <Button
                                type='button'
                                disabled={isLoading}
                                onClick={handleBackToLogin}
                            >
                                Already have an account?
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
