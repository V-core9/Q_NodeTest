import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../store';
let adminNavShow = false;

export { Nav };

function Nav() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    const isAdmin = (!authUser) ? false : (authUser.isAdmin) ? authUser.isAdmin : false;


    // Admin Menu Dropdown Entry:
    let adminMenu;
    if (isAdmin) {
        adminMenu = (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => { adminNavShow = !adminNavShow }} onBlur={() => { adminNavShow = false }}>
                    Admin
                </a>
                <ul className={(adminNavShow == true) ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="navbarScrollingDropdown">
                    <li><NavLink to="/users" className="nav-item nav-link">Users</NavLink></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        {(!!authUser) && <li className="nav-item"><NavLink to="/books" className="nav-item nav-link">Books</NavLink></li>}
                        {(!!authUser) && <li className="nav-item"><NavLink to="/myBooks" className="nav-item nav-link">MyBooks</NavLink></li>}
                        {adminMenu}
                        {(!authUser) && <li className="nav-item"><NavLink to="/login" className="nav-item nav-link">Login</NavLink></li>}
                        {(!authUser) && <li className="nav-item"><NavLink to="/register" className="nav-item nav-link">Register</NavLink></li>}
                    </ul>
                    <form className="d-flex">
                        <input className="form-control" type="search" placeholder="Search"></input>
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                </div >
                {(!!authUser) && <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>}
            </div >
        </nav >
    );
}