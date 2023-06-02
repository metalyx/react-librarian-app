import { useAppSelector } from '../../hooks/redux';
import { Navigate, redirect } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from './LoginForm';

interface iLogin {
    registration?: boolean;
    successReg?: boolean;
}

const Login: React.FC<iLogin> = ({ registration, successReg }) => {
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
                    {!registration && (
                        <h1 className='text-center'>Library login</h1>
                    )}
                    {registration && (
                        <h1 className='text-center'>Registration</h1>
                    )}
                    <LoginForm
                        registration={registration}
                        successReg={successReg}
                    />
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
