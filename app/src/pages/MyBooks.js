import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../store';

export { MyBooks };

function MyBooks() {
    const dispatch = useDispatch();
    const { user } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);

    useEffect(() => {
        dispatch(userActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hi {user?.email}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            <h3>Users from secure api end point:</h3>
            {users.length &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.email} {user.isAdmin}</li>
                    )}
                </ul>
            }
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
        </div>
    );
}