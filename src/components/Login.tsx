import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { userSlice } from '../store/reducers/UserSlice';
import { iUser } from '../models/iUser';
import { Navigate, redirect } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const { isLoggedIn } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const { logIn, setUser } = userSlice.actions;

    useEffect(() => {
        if (isLoggedIn) {
            redirect('/');
        }
    }, []);

    const mockAdminLogin = () => {
        const mockAdmin: iUser = {
            id: 1,
            name: 'Administrator',
            email: 'admin@mylibrary.com',
            isAdmin: true,
        };
        dispatch(setUser(mockAdmin));
        dispatch(logIn());
    };

    const mockUserLogin = () => {
        const mockUser: iUser = {
            id: 2,
            name: 'User',
            email: 'user@mylibrary.com',
            isAdmin: false,
        };
        dispatch(setUser(mockUser));
        dispatch(logIn());
    };

    return (
        <>
            {!isLoggedIn && (
                <div>
                    <button onClick={mockAdminLogin}>Login as Admin</button>
                    <button onClick={mockUserLogin}>Login as User</button>
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
