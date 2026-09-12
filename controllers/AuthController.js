// controllers/AuthController.js
const AuthController = {
  handleLogin() {
    LoginView.clearErrors();
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    if (!email) { document.getElementById('emailError').classList.remove('hidden'); return; }
    if (!password) { document.getElementById('passwordError').classList.remove('hidden'); return; }
    const btn = document.getElementById('loginBtn');
    btn.textContent = 'Signing in...'; btn.disabled = true;
    setTimeout(() => {
      const result = AuthModel.login(email, password);
      if (result.success) {
        Helpers.showToast(`Welcome back, ${result.user.name}!`, 'success');
        Router.navigate('/dashboard');
      } else {
        LoginView.showError(result.message);
        btn.textContent = 'Sign In'; btn.disabled = false;
      }
    }, 600);
  },
  logout() {
    AuthModel.logout();
    Helpers.showToast('Logged out successfully.', 'info');
    Router.navigate('/login');
  }
};
