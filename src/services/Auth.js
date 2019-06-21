class Auth {
  currentUser = null;

  isAuthenticate () {
    return this.getToken() !== null
  }

  setToken (token) {
    window.localStorage.setItem('access_token', token)
  }

  getToken () {
    return window.localStorage.getItem('access_token')
  }

  removeToken () {
    window.localStorage.removeItem('access_token')
    this.currentUser = null;
  }

  getUser() {
    return this.currentUser;
  }

  setUser(user) {
    this.currentUser = user;
  }
}

export default new Auth()
