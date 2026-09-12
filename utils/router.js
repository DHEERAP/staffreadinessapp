// utils/router.js
const Router = {
  routes: {},
  register(path, handler) { this.routes[path] = handler; },
  navigate(path) { window.location.hash = path; },
  start() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },
  resolve() {
    const hash = window.location.hash.replace('#', '') || '/login';
    const handler = this.routes[hash];
    if (handler) { handler(); }
    else { Storage.isLoggedIn() ? this.navigate('/dashboard') : this.navigate('/login'); }
  }
};
