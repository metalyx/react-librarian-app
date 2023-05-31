import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { getUsersInfo } from '../helpers/getUsersInfo';
import AllUsers from './admin/AllUsers';
import { iUser } from '../models/iUser';

const Admin = () => {
    const userInfo = useAppSelector((state) => state.userReducer.user);
    const [isPermissionDenied, setPermissionDenied] = useState(false);

    const [users, setUsers] = useState<iUser[]>([]);
    const [adminView, setAdminView] = useState<React.ReactElement | null>(null);

    useEffect(() => {
        if (userInfo) {
            if (userInfo.roles.find((role) => role === 'ADMIN') === undefined) {
                setPermissionDenied(true);
            }
        }
    }, [userInfo]);

    const handleShowUsers = async () => {
        if (users.length === 0) {
            const allUsers = await getUsersInfo();
            setUsers(allUsers);
        }

        setAdminView(<AllUsers users={users} />);
    };

    return (
        <div>
            <h1>Admin menu</h1>
            {!userInfo && <div>Checking permissions...</div>}
            {isPermissionDenied && (
                <div className='text-red-600'>Permission denied.</div>
            )}
            {!isPermissionDenied && (
                <div>
                    <div className='flex gap-4'>
                        <button onClick={handleShowUsers}>
                            Show All Users
                        </button>
                        <button>Button</button>
                        <button>Button</button>
                        <button>Button</button>
                        <button>Button</button>
                        <button>Button</button>
                    </div>
                    <div>{adminView}</div>
                </div>
            )}
        </div>
    );
};

export default Admin;
