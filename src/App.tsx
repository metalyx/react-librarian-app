import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Books from './components/Books';
import Admin from './components/Admin';
import Profile from './components/Profile';
import { useAppDispatch } from './hooks/redux';
import { userSlice } from './store/reducers/UserSlice';
import { getUserIdFromToken } from './helpers/getUserIdFromToken';
import { getUserInfo } from './helpers/getUserInfo';
import { setToken } from './utils/Axios';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const { logIn, setUser } = userSlice.actions;

    useEffect(() => {
        (async () => {
            const userId = await getUserIdFromToken();

            if (userId === null) {
                setIsLoading(false);
                return navigate('/login');
            }

            const token = window.localStorage.getItem('token') as string;
            setToken(token);

            const userInfo = await getUserInfo();

            dispatch(setUser(userInfo));
            dispatch(logIn());
            setIsLoading(false);

            if (location.pathname === '/login') {
                return navigate('/');
            }
        })();
    }, []);

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
                <Layout>
                    <Routes>
                        <Route
                            path='/login'
                            element={<Login />}
                        />
                        <Route
                            path='/registrationSuccess'
                            element={<Login successReg />}
                        />
                        <Route
                            path='/registration'
                            element={<Login registration />}
                        />
                        <Route
                            path='/'
                            element={<Home />}
                        />
                        <Route
                            path='/books'
                            element={<Books />}
                        />
                        <Route
                            path='/profile'
                            element={<Profile />}
                        />
                        <Route
                            path='/admin'
                            element={<Admin />}
                        />
                    </Routes>
                </Layout>
            )}
        </>
    );
};

export default App;
