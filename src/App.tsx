import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Books from './components/Books';
import Admin from './components/Admin';
import Profile from './components/Profile';
import Axios from './utils/Axios';
import { useAppDispatch } from './hooks/redux';
import { userSlice } from './store/reducers/UserSlice';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { logIn, setUser } = userSlice.actions;

    useEffect(() => {
        (async () => {
            const token = window.localStorage.getItem('token');

            if (!token) {
                setIsLoading(false);
                return navigate('/login');
            }

            try {
                const response = await Axios.post('/api/auth/checkToken', {
                    token,
                });

                setIsLoading(false);
                if (response.status >= 400) {
                    return navigate('/login');
                } else {
                    // remember userInfo and user role
                    // dispatch(setUser({
                    //     name: 'No user name',
                    //     email: 'No email',
                    //     id:
                    // }))
                    dispatch(logIn());
                }
            } catch (e) {
                setIsLoading(false);
                return navigate('/login');
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
                    </Routes>{' '}
                </Layout>
            )}
        </>
    );
};

export default App;
