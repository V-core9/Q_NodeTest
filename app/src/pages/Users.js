import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../store';

export { Users };

function Users() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);
    const { users } = useSelector(x => x.users);

    useEffect(() => {
        dispatch(userActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hi {user?.username}!</h1>
            <p>This is an example Admin Page</p>
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