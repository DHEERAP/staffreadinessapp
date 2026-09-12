// views/SidebarView.js
const SidebarView = {
  // Sidebar nav items per role
  getNavItems(role) {
    const common = [
      { icon: '⊞', label: 'Dashboard', route: '/dashboard' },
      { icon: '👤', label: 'My Profile', route: '/profile' },
      { icon: '💼', label: 'Opportunities', route: '/opportunities' },
      { icon: '♡', label: 'My Interests', route: '/interests' },
      { icon: '📋', label: 'My Applications', route: '/applications' },
      { icon: '✏️', label: 'Correction Requests', route: '/corrections' }
    ];
    if (role === 'employee') {
      common.push({ icon: '🔔', label: 'Notifications', route: '/notifications' });
      common.push({ icon: '❓', label: 'Help & Support', route: '/help' });
    }
    if (role === 'rmg') {
      common.push({ icon: '📊', label: 'Matching Results', route: '/matching' });
      common.push({ icon: '📈', label: 'Interest Dashboard', route: '/interest-dashboard' });
    }
    if (role === 'project_head') {
      common.push({ icon: '➕', label: 'Create Requirement', route: '/create-staffing' });
    }
    if (role === 'hrbp') {
      common.push({ icon: '📊', label: 'Reports', route: '/reports' });
    }
    return common;
  },

  render(user, activeRoute) {
    const navItems = this.getNavItems(user.role);
    const navHTML = navItems.map(item => {
      const isActive = activeRoute === item.route;
      return `
        <a href="#${item.route}" onclick="SidebarView.closeSidebar()" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer
          ${isActive ? 'bg-blue-700 text-white font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
          <span class="text-base w-5 text-center">${item.icon}</span>
          <span>${item.label}</span>
        </a>`;
    }).join('');

    return `
      <div id="sidebarOverlay" onclick="SidebarView.closeSidebar()"></div>
      <aside class="sidebar w-56 bg-gray-900 min-h-screen flex flex-col fixed left-0 top-0 z-30">
        <!-- Logo -->
        <div class="flex items-center gap-2 px-4 py-5 border-b border-gray-700">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
          <span class="text-white font-semibold text-sm leading-tight">Staffing<br>Readiness</span>
        </div>
        <!-- Nav -->
        <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          ${navHTML}
        </nav>
        <!-- User info at bottom -->
        <div class="px-4 py-4 border-t border-gray-700">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div class="min-w-0">
              <p class="text-white text-xs font-medium truncate">${user.name}</p>
              <p class="text-gray-400 text-xs truncate">${user.designation}</p>
            </div>
          </div>
          <button onclick="AuthController.logout()" class="mt-3 w-full text-left text-gray-400 hover:text-white text-xs flex items-center gap-2 transition-colors">
            <span>⬅</span> Sign Out
          </button>
        </div>
      </aside>`;
  },

  closeSidebar() {
    const sidebar = document.querySelector('aside.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  },

  openSidebar() {
    const sidebar = document.querySelector('aside.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
  }
};
