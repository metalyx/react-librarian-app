import React from 'react';
import { iUser } from '../../models/iUser';

interface iAllUsers {
    users: iUser[];
}

const AllUsers: React.FC<iAllUsers> = ({ users }) => {
    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.username}>
                        <div>
                            Username: <span>{user.username}</span>
                        </div>
                        <div>
                            Roles: <span>{user.roles}</span>
                        </div>
                        <div>
                            Booked: <span>[{user.booked ?? ''}]</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllUsers;
