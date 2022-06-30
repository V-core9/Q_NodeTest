import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NewBookModal } from '../components';

import { myBooksActions } from '../store';

export { MyBooks };

function MyBooks() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);
    const { myBooks } = useSelector(x => x.myBooks);


    useEffect(() => {
        dispatch(myBooksActions.getMyBooks());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="myBooks">
            <nav className="navbar navbar-expand">
                <div className="navbar-nav">
                    <h1>{user?.username} Books:</h1>
                    <div className="btn-group" role="group">
                        <button className="btn-primary" onClick={() => dispatch(myBooksActions.toggleNewModal())}>Create New ➕</button>
                    </div>
                </div>
            </nav>
            {myBooks.length &&
                <ul className="list-group">
                    {myBooks.map(book =>
                        <li className="list-group-item" key={book.id}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{book.title}</h5>
                                <small>
                                    <button className="btn-secondary" onClick={() => console.log("I will open edit book!")}>🎨 Edit</button>
                                    <button className="btn-danger" onClick={() => dispatch(myBooksActions.deleteBook({ id: book.id }))} title="Delete Book">❌ Delete</button>
                                </small>
                            </div>
                            <p className="mb-1">{book.description}</p>
                            <small>ID: {book.id}</small>
                        </li>
                    )}
                </ul>
            }
            {myBooks.loading && <div className="spinner-border spinner-border-sm"></div>}
            {myBooks.error && <div className="text-danger">Error loading MyBooks: {myBooks.error.message}</div>}
            <NewBookModal />
        </div>
    );
}