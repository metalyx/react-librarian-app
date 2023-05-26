import React from 'react';
import useGetAuth from '../hooks/useGetAuth';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({
    children,
    redirectTo,
}: {
    children: React.ReactElement | null;
    redirectTo?: string;
}) => {
    const isLoogedIn = useGetAuth();

    return isLoogedIn ? children : <Navigate to={redirectTo ?? '/login'} />;
};

export default RequireAuth;
