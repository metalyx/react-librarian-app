import React, { useState } from 'react';
import Axios from '../utils/Axios';
import { userSlice } from '../store/reducers/UserSlice';
import { useAppDispatch } from '../hooks/redux';

interface iErrors {
    login: string;
    password: string;
    invalidCredentials: string;
}

const LoginForm = () => {
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

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (login.trim().length <= 0) {
            setErrors((prevState: iErrors) => ({
                ...prevState,
                login: 'Login cannot be empty',
            }));
            return;
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
            return;
        } else {
            setErrors((prevState: iErrors) => ({
                ...prevState,
                password: '',
            }));
        }

        if (errors.login.length > 0 || errors.password.length > 0) {
            return;
        } else {
            setIsLoading(true);
            await serverLogin();
            setIsLoading(false);
        }
    };

    const serverLogin = async () => {
        try {
            const response = await Axios.post('/api/auth/login', {
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

                window.localStorage.setItem('token', token);
                console.log('SUCESS');
                dispatch(logIn());
            }
        } catch (e: any) {
            console.log(e);
            setErrors({
                ...errors,
                invalidCredentials: e.response.data.message,
            });
        }
    };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            <form onSubmit={signIn}>
                <div className='flex gap-4 my-8 justify-center'>
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
                    <button
                        type='submit'
                        className={`border-dashed border-2 border-indigo-600 hover:border-solid ${
                            isLoading ? 'opacity-[0.5]' : ''
                        }`}
                        disabled={isLoading}
                    >
                        Sign In
                    </button>
                    <button
                        type='button'
                        className={`border-dashed border-2 border-indigo-600 hover:border-solid ${
                            isLoading ? 'opacity-[0.5]' : ''
                        }`}
                        disabled={isLoading}
                    >
                        Don't have an account?
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
