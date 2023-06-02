import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { userSlice } from '../store/reducers/UserSlice';
import { getUserInfo } from '../helpers/getUserInfo';
const liStyles = `font-semibold text-lg cursor-pointer hover:opacity-[0.5]`;

const Navbar = () => {
    const { user, isLoggedIn } = useAppSelector((state) => state.userReducer);
    const { logOut, setUser } = userSlice.actions;
    const dispatch = useAppDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const loginOut = () => {
        window.localStorage.removeItem('token');
        dispatch(logOut());
        navigate('/login');
    };

    useEffect(() => {
        (async () => {
            if (!user) {
                const userInfo = await getUserInfo();
                dispatch(setUser(userInfo));
            }
        })();
    }, []);

    return (
        <>
            {isLoggedIn && (
                <div className='flex items-center justify-center bg-orange-300 w-[100%] absolute top-0 left-0 h-[50px]'>
                    <nav className='w-[100%] px-24 flex items-center justify-between'>
                        <ul className='w-[100%] flex gap-24 items-center  border-dashed border-2 border-indigo-600'>
                            <li
                                className={`${liStyles} ${
                                    location.pathname === '/' && '!font-bold'
                                }`}
                            >
                                <Link to='/'>Home</Link>
                            </li>
                            <li
                                className={`${liStyles} ${
                                    location.pathname === '/books' &&
                                    '!font-bold'
                                }`}
                            >
                                <Link to='/books'>Books</Link>
                            </li>
                            <li
                                className={`${liStyles} ${
                                    location.pathname === '/profile' &&
                                    '!font-bold'
                                }`}
                            >
                                <Link to='/profile'>Profile</Link>
                            </li>
                            {user?.roles.find(
                                (role) => role === 'LIBRARIAN'
                            ) && (
                                <li
                                    className={`${liStyles} ${
                                        location.pathname === '/bookings' &&
                                        '!font-bold'
                                    }`}
                                >
                                    <Link to='/bookings'>Bookings</Link>
                                </li>
                            )}
                            {user?.roles.find((role) => role === 'ADMIN') && (
                                <>
                                    <li
                                        className={`${liStyles} ${
                                            location.pathname === '/admin' &&
                                            '!font-bold'
                                        }`}
                                    >
                                        <Link to='/admin'>Admin</Link>
                                    </li>
                                    <li
                                        className={`${liStyles} ${
                                            location.pathname === '/bookings' &&
                                            '!font-bold'
                                        }`}
                                    >
                                        <Link to='/bookings'>Bookings</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        <button
                            className='bg-transparent w-[70px] p-0'
                            onClick={loginOut}
                        >
                            Log out
                        </button>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Navbar;
