import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { appFunctionsActions } from '../../store';

export { Functions };

function Functions() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);
    const { appFunctions: functions } = useSelector(x => x.appFunctions);

    useEffect(() => {
        console.log(functions);
        console.log(appFunctionsActions);
        dispatch(appFunctionsActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="adminUsers">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Hi {user?.username}!</h5>
                <p>This is an example Admin Page</p>
                <small>
                    <select className="form-select">
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="20">20</option>
                    </select>
                </small>
            </div>
            {functions.length &&
                <ul className="list-group">
                    {functions.map(func =>
                        <li className="list-group-item" key={func.id}>
                            <div className="card">
                                <img className="card-img-top" src='/logo192.png' alt={func.name} />
                                <div className="card-body" title={func.name}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{func.name}</h5>
                                        <small>
                                            <button className="btn-secondary" onClick={() => console.log("I will EDIT User:", func.id)}>🎨 Edit</button>
                                            <button className="btn-danger" onClick={() => console.log("I will DELETE User:", func.id)} title="Delete Book">❌ Delete</button>
                                        </small>
                                    </div>
                                    <p className="mb-0">🆔 {func.id}</p>
                                    <small>Author: {func.authorId}</small>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            }
            {functions.loading && <div className="spinner-border spinner-border-sm"></div>}
            {functions.error && <div className="text-danger">Error loading users: {functions.error.message}</div>}
        </div >
    );
}