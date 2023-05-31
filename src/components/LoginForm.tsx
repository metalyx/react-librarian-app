import React, { useState } from 'react';
import { userSlice } from '../store/reducers/UserSlice';
import { useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';
import { setToken } from '../utils/Axios';

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

    const { logIn, setUser } = userSlice.actions;
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isValidForm = (): boolean => {
        if (login.trim().length <= 0) {
            setErrors((prevState: iErrors) => ({
                ...prevState,
                login: 'Login cannot be empty',
            }));
            return false;
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
            return false;
        } else {
            setErrors((prevState: iErrors) => ({
                ...prevState,
                password: '',
            }));
        }

        return true;
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
                setErrors({
                    ...errors,
                    invalidCredentials: '',
                });

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
                        <input
                            id='loginField'
                            type='text'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className={`bg-slate-300 rounded p-1 font-bold ${
                                errors.login.length > 0
                                    ? 'border-solid border-2 border-red-600'
                                    : ''
                            }`}
                        />
                        <input
                            id='passwordField'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`bg-slate-300 rounded p-1 font-bold ${
                                errors.password.length > 0
                                    ? 'border-solid border-2 border-red-600'
                                    : ''
                            }`}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    {errors.login && (
                        <span className='font-bold text-red-600'>
                            {errors.login}
                        </span>
                    )}
                    {errors.password && (
                        <span className='font-bold text-red-600'>
                            {errors.password}
                        </span>
                    )}
                    {errors.invalidCredentials && (
                        <span className='font-bold text-red-600'>
                            {errors.invalidCredentials}
                        </span>
                    )}
                    {!registration && (
                        <button
                            type='button'
                            className={`border-dashed border-2 border-indigo-600 hover:border-solid ${
                                isLoading ? 'opacity-[0.5]' : ''
                            }`}
                            disabled={isLoading}
                            onClick={signIn}
                        >
                            Sign In
                        </button>
                    )}
                    {!registration && (
                        <button
                            type='button'
                            className={`border-dashed border-2 border-indigo-600 hover:border-solid ${
                                isLoading ? 'opacity-[0.5]' : ''
                            }`}
                            disabled={isLoading}
                            onClick={handleNeedAccount}
                        >
                            Don't have an account?
                        </button>
                    )}
                    {registration && (
                        <button
                            type='button'
                            className={`border-dashed border-2 border-indigo-600 hover:border-solid ${
                                isLoading ? 'opacity-[0.5]' : ''
                            }`}
                            disabled={isLoading}
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    )}
                    {registration && (
                        <button
                            type='button'
                            className={`border-dashed border-2 border-indigo-600 hover:border-solid ${
                                isLoading ? 'opacity-[0.5]' : ''
                            }`}
                            disabled={isLoading}
                            onClick={handleBackToLogin}
                        >
                            Already have an account?
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
