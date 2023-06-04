import { useAppSelector } from '../hooks/redux';
import Page from './Page';

const Profile = () => {
    const user = useAppSelector((state) => state.userReducer.user);

    return (
        <Page title='Profile'>
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
        </Page>
    );
};

export default Profile;
