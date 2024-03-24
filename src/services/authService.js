import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: 'http://localhost:8080/',
    // url: 'http://auth.miage23.jayblanc.fr/',
    realm: 'Miage.23',
    clientId: 'filestore',
});

let userProfile = null;

const initKeycloak = () => {
    return keycloak.init({ onLoad: 'login-required' }).then(async (authenticated) => {
        userProfile = await keycloak.loadUserProfile();
        return userProfile;
    }).catch(console.error);
};

const login = () => {
    return keycloak.login();
};

const logout = () => {
    return keycloak.logout();
};

const refreshToken = () => {
    return keycloak.updateToken();
};

const getToken = () => {
    return keycloak.token;
};

const getUser = () => {
    return userProfile;
};

const isLoggedIn = () => {
    return !!keycloak.token;
};

const AuthService = {
    initKeycloak,
    login,
    logout,
    refreshToken,
    getToken,
    getUser,
    isLoggedIn,
};

export default AuthService;