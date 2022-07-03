import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { bookActions } from '../../store';

export { Books };

function Books() {
    const dispatch = useDispatch();
    const { books } = useSelector(x => x.books);

    useEffect(() => {
        dispatch(bookActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="books">
            <h3>Public Books Listing:</h3>
            {books.length &&
                <div className="row">
                    {books.map(book =>
                        <div className="col-sm-6 mb-2" key={book.id}>
                            <div className="card">
                                <img className="card-img-top" src='/logo192.png' alt={book.description} />
                                <div className="card-body" title={book.title}>
                                    <h5 className="card-title">{(book.title.length > 32) ? book.title.slice(0, 32) + '...' : book.title}</h5>
                                    <p>{book.description}</p>
                                    <small>{book.createdAt}</small>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
            {books.loading && <div className="spinner-border spinner-border-sm"></div>}
            {books.error && <div className="text-danger">Error loading books: {books.error.message}</div>}
        </div>
    );
}