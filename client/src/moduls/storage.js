export const getUser = () => {
    const userString = sessionStorage.getItem('user');
    if (userString) {
        return JSON.parse(userString);
    }
    return null;
};

export const setUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
};

export const getToken = () => {
    return sessionStorage.getItem('accessToken');
};

export const setToken = (token) => {
    sessionStorage.setItem('accessToken', token);
};

export const clearUser = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
};