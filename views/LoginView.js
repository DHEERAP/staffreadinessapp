// views/LoginView.js
const LoginView = {
  render() {
    return `
      <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="flex w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden">
          <!-- Left blue panel -->
          <div class="w-2/5 bg-gradient-to-br from-blue-700 to-blue-900 p-10 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-8">
                <div class="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <span class="text-white font-bold text-lg">Staffing Readiness Platform</span>
              </div>
              <h2 class="text-white text-2xl font-bold leading-snug">Right Talent.<br>Right Opportunity.<br>Right Time.</h2>
            </div>
            <div class="text-blue-200 text-xs">MVP v1.0 &copy; 2026</div>
          </div>
          <!-- Right form panel -->
          <div class="w-3/5 bg-white p-10 flex flex-col justify-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h2>
            <p class="text-gray-500 text-sm mb-7">Sign in to continue</p>
            <form id="loginForm" novalidate>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email / Employee ID</label>
                <input id="loginEmail" type="text" placeholder="Enter email or employee ID"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                <p id="emailError" class="text-red-500 text-xs mt-1 hidden">Please enter your email or employee ID.</p>
              </div>
              <div class="mb-4 relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input id="loginPassword" type="password" placeholder="Enter password"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"/>
                <button type="button" id="togglePassword" class="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </button>
                <p id="passwordError" class="text-red-500 text-xs mt-1 hidden">Please enter your password.</p>
              </div>
              <div class="flex items-center justify-between mb-6">
                <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" id="rememberMe" class="rounded border-gray-300 text-blue-600"/>
                  Remember me
                </label>
                <a href="#" class="text-blue-600 text-sm hover:underline">Forgot Password?</a>
              </div>
              <p id="loginError" class="text-red-500 text-sm mb-3 hidden text-center"></p>
              <button type="submit" id="loginBtn"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                Sign In
              </button>
              <p class="text-center text-gray-400 text-xs mt-4">Secured with JWT Authentication</p>
            </form>
            <!-- Demo credentials hint -->
            <div class="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p class="text-xs text-blue-700 font-semibold mb-1">Demo Credentials:</p>
              <p class="text-xs text-blue-600">Employee: EMP001 / password123</p>
              <p class="text-xs text-blue-600">RMG: RMG001 / password123</p>
              <p class="text-xs text-blue-600">Project Head: PH001 / password123</p>
              <p class="text-xs text-blue-600">HRBP: HRBP001 / password123</p>
            </div>
          </div>
        </div>
      </div>`;
  },

  bindEvents() {
    const form = document.getElementById('loginForm');
    const toggleBtn = document.getElementById('togglePassword');
    const pwdInput = document.getElementById('loginPassword');

    toggleBtn.addEventListener('click', () => {
      pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      AuthController.handleLogin();
    });
  },

  showError(message) {
    const el = document.getElementById('loginError');
    el.textContent = message;
    el.classList.remove('hidden');
  },

  clearErrors() {
    ['loginError', 'emailError', 'passwordError'].forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
  }
};
