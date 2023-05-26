import { useAppSelector } from './redux';

const useGetAuth = () => {
    const { isLoggedIn } = useAppSelector((state) => state.userReducer);

    return isLoggedIn;
};

export default useGetAuth;
