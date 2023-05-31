import React from 'react';
import { useAppSelector } from '../hooks/redux';

const Profile = () => {
    const user = useAppSelector((state) => state.userReducer.user);

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <ul>
                    <li>
                        Username: <span>{user.username}</span>
                    </li>
                    <li>
                        Profile type: <span>{user.roles}</span>
                    </li>
                </ul>
            )}
            {!user && <div>Loading user details...</div>}
        </div>
    );
};

export default Profile;
