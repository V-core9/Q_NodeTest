import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Counter } from '../components';

export { Home };

function Home() {
    return (
        <div>
            <Counter />
        </div>
    );
}