import { store, authActions } from '../store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return async (url, body) => {
        const requestOptions = {
            method,
            headers: await authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

async function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith('http://localhost/api');
    if (isLoggedIn && isApiUrl && url !== 'http://localhost/api/auth/refreshToken') {
        const exp = store.getState().auth.user?.accessToken.exp * 1000 || Date.now();
        if (exp < Date.now()) {
            console.log('tokenExpired Refreshing...')
            await store.dispatch(authActions.refreshToken({ refreshToken: store.getState().auth.user.refreshToken.token }));
        }

        return { Authorization: `Bearer ${authToken()}` };
    } else {
        return {};
    }
}

function authToken() {
    return store.getState().auth.user?.accessToken.token;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            if ([401, 403].includes(response.status) && authToken()) {

                if (data.message !== 'TokenExpiredError') {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    const logout = () => store.dispatch(authActions.logout());
                    logout();
                }
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}