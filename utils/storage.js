// utils/storage.js
const Storage = {
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  get(key) { const i = localStorage.getItem(key); return i ? JSON.parse(i) : null; },
  remove(key) { localStorage.removeItem(key); },
  saveUser(user) { this.set('currentUser', user); },
  getUser() { return this.get('currentUser'); },
  removeUser() { this.remove('currentUser'); },
  isLoggedIn() { return this.getUser() !== null; }
};
