import UserSessionDataHandler from './UserSessionDataHandler';

class Authenticate {
  static isAuthenticated = () => {
    const result = UserSessionDataHandler.getToken();

    return !!result;
  };

  static isAdmin = () => {
    const result = UserSessionDataHandler.getUserData()?.adminPermission;

    return !!result;
  };

  static authenticate = (token = '') => {
    UserSessionDataHandler.saveToken(token);
  };

  static unauthenticate = () => {
    UserSessionDataHandler.removeToken();
    UserSessionDataHandler.removeUserData();
    UserSessionDataHandler.removeSettings();
  };
}

export default Authenticate;
