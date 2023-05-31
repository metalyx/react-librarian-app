import React from 'react';
import { iUser } from '../../models/iUser';

interface iAllUsers {
    users: iUser[];
}

const AllUsers: React.FC<iAllUsers> = ({ users }) => {
    return (
        <div>
            <ul className='my-4'>
                {users.map((user) => (
                    <li
                        key={user.username}
                        className='border-solid p-2 border border-black-600'
                    >
                        <div>
                            ID: <span>{user._id}</span>
                        </div>
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
