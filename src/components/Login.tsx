import { useAppSelector } from '../hooks/redux';
import { Navigate, redirect } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from './LoginForm';

const Login = () => {
    const { isLoggedIn } = useAppSelector((state) => state.userReducer);

    useEffect(() => {
        if (isLoggedIn) {
            redirect('/');
        }
    }, []);

    return (
        <>
            {!isLoggedIn && (
                <div>
                    {/* <button onClick={mockAdminLogin}>Login as Admin</button>
                    <button onClick={mockUserLogin}>Login as User</button> */}
                    <h1 className='text-center'>Library login</h1>
                    <LoginForm />
                </div>
            )}
            {isLoggedIn && (
                <Navigate
                    to='/'
                    replace
                />
            )}
        </>
    );
};

export default Login;
