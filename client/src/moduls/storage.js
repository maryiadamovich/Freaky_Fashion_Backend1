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

export const clearUser = async () => {
    try {
        await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Logout failed:', error);
    }

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
    //document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
};