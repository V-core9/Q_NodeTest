import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { myBooksActions } from '../store';

export { MyBooks };

function MyBooks() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);
    const myBooks = useSelector(x => x.myBooks.myBooks);


    useEffect(() => {
        dispatch(myBooksActions.getMyBooks());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>{user?.username} Books:</h1>
            <h3>Books from secure api end point:</h3>
            {myBooks.length &&
                <ul>
                    {myBooks.map(book =>
                        <li key={book.id}>{book.title}</li>
                    )}
                </ul>
            }
            {myBooks.loading && <div className="spinner-border spinner-border-sm"></div>}
            {myBooks.error && <div className="text-danger">Error loading users: {myBooks.error.message}</div>}
        </div>
    );
}