import { useSelector, useDispatch } from 'react-redux';

import { myBooksActions } from '../store';

import { NewBookForm } from '.';

const { toggleNewModal } = myBooksActions;


export function NewBookModal() {

    const dispatch = useDispatch();
    const { newModalShow } = useSelector(x => x.myBooks);

    if (!newModalShow) return '';

    return (
        <div id="exampleModalLive" className="modal fade show" role="dialog" aria-labelledby="exampleModalLiveLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <NewBookForm />
                </div>
            </div>
        </div>
    )
}