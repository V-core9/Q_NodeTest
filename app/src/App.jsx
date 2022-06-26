import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from './helpers';
import { Nav, PrivateRoute, PrivateRouteAdmin } from './components';
import { Home, Login, MyBooks, Users, Register, Books } from './pages';



function App() {
  // init custom history object to allow navigation from 
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div className="app-container bg-light">
      <Nav />
      <div className="container pt-4 pb-4">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
          <Route
            path="/myBooks"
            element={
              <PrivateRoute>
                <MyBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRouteAdmin>
                <Users />
              </PrivateRouteAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;