// models/AuthModel.js
const AuthModel = {
  login(emailOrId, password) {
    const user = USERS.find(u => (u.email === emailOrId || u.employeeId === emailOrId) && u.password === password);
    if (user) {
      const safeUser = { ...user }; delete safeUser.password;
      Storage.saveUser(safeUser);
      return { success: true, user: safeUser };
    }
    return { success: false, message: "Invalid email/ID or password." };
  },
  logout() { Storage.removeUser(); },
  getCurrentUser() { return Storage.getUser(); },
  isAuthenticated() { return Storage.isLoggedIn(); }
};
