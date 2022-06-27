import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { myBooksActions } from '../store';

export { MyBooks };

function MyBooks() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);
    const { myBooks, newModalShow } = useSelector(x => x.myBooks);


    useEffect(() => {
        dispatch(myBooksActions.getMyBooks());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="myBooks">
            <nav className="navbar navbar-expand">
                <div className="navbar-nav">
                    <h1>{user?.username} Books:</h1>
                    <button onClick={() => dispatch(myBooksActions.toggleNewModal())}>Create New ➕</button>
                </div>
            </nav>
            {myBooks.length &&
                <ul>
                    {myBooks.map(book =>
                        <li key={book.id}>{book.title}</li>
                    )}
                </ul>
            }
            {myBooks.loading && <div className="spinner-border spinner-border-sm"></div>}
            {myBooks.error && <div className="text-danger">Error loading users: {myBooks.error.message}</div>}
            {newModalShow && <h2>SHOWING NEW MODAL</h2>}
        </div>
    );
}