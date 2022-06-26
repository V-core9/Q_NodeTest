import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { bookActions } from '../store';

export { Books };

function Books() {
    const dispatch = useDispatch();
    const { user } = useSelector(x => x.auth);
    const { books } = useSelector(x => x.books);

    useEffect(() => {
        dispatch(bookActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hi {user?.email}!</h1>
            <h3>Books from secure api end point:</h3>
            {books.length &&
                <ul>
                    {books.map(user =>
                        <li key={user.id}>{user.email} {user.isAdmin}</li>
                    )}
                </ul>
            }
            {books.loading && <div className="spinner-border spinner-border-sm"></div>}
            {books.error && <div className="text-danger">Error loading books: {books.error.message}</div>}
        </div>
    );
}