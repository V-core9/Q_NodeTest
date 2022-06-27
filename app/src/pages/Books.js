import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { bookActions } from '../store';

export { Books };

function Books() {
    const dispatch = useDispatch();
    const { books } = useSelector(x => x.books);

    useEffect(() => {
        dispatch(bookActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h3>Public Books Listing:</h3>
            {books.length &&
                <ul>
                    {books.map(book =>
                        <li key={book.id}>
                            <h4>{book.title}</h4>
                            <p>AuthorID: {book.authorId}</p>
                        </li>
                    )}
                </ul>
            }
            {books.loading && <div className="spinner-border spinner-border-sm"></div>}
            {books.error && <div className="text-danger">Error loading books: {books.error.message}</div>}
        </div>
    );
}