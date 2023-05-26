import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Books from './components/Books';
import Admin from './components/Admin';
import Profile from './components/Profile';

const App = () => {
    return (
        <BrowserRouter>
            {/* <Layout>
                <Routes>
                    <Route
                        path='/login'
                        element={<Login />}
                    />
                    <Route
                        path='/'
                        element={
                            <RequireAuth redirectTo='/login'>
                                <Home />
                            </RequireAuth>
                        }
                    />
                </Routes>{' '}
            </Layout> */}
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
        </BrowserRouter>
    );
};

export default App;
