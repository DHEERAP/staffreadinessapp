// controllers/AppController.js - Main app controller, handles routing and rendering
const AppController = {
  // Render HTML into the main app container
  render(html) {
    const app = document.getElementById('app');
    if (app) app.innerHTML = html;
  },

  // Show dashboard based on user role
  showDashboard() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }

    if (user.role === 'rmg') {
      this.render(RmgDashboardView.render(user));
    } else if (user.role === 'project_head') {
      this.render(ProjectHeadDashboardView.render(user));
    } else if (user.role === 'hrbp') {
      this.render(HrbpDashboardView.render(user));
    } else {
      const stats = EmployeeModel.getDashboardStats(user.id);
      const breakdown = EmployeeModel.getReadinessBreakdown(user.id);
      const topOpps = OpportunityModel.getAll().slice(0, 3);
      this.render(EmployeeDashboardView.render(user, stats, breakdown, topOpps));
    }
  },

  // Show login page
  showLogin() {
    if (AuthModel.isAuthenticated()) { Router.navigate('/dashboard'); return; }
    this.render(LoginView.render());
    LoginView.bindEvents();
  },

  // Show a simple placeholder page for routes not yet built
  showPlaceholder(title) {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const sidebar = SidebarView.render(user, '');
    this.render(`
      ${sidebar}
      <div class="ml-56 flex flex-col min-h-screen bg-gray-50">
        <div class="flex items-center justify-center flex-1">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">${title}</h2>
            <p class="text-gray-500 text-sm">This page is coming soon.</p>
            <button onclick="Router.navigate('/dashboard')" class="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">← Back to Dashboard</button>
          </div>
        </div>
      </div>`);
  },

  // Register all routes
  registerRoutes() {
    Router.register('/login', () => this.showLogin());
    Router.register('/dashboard', () => this.showDashboard());
    Router.register('/opportunities', () => OpportunityController.showOpportunities());
    Router.register('/create-staffing', () => StaffingController.showCreateStaffing());
    Router.register('/matching', () => StaffingController.showMatchingResults());
    Router.register('/approve-shortlist', () => ApprovalController.showApproveShortlist());
    Router.register('/corrections', () => CorrectionController.showCorrectionRequests());
    Router.register('/interest-dashboard', () => InterestController.showInterestDashboard());
    Router.register('/profile', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(MyProfileView.render(u)); });
    Router.register('/interests', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(MyInterestsView.render(u)); });
    Router.register('/applications', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(MyApplicationsView.render(u)); });
    Router.register('/reports', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(ReportsView.render(u)); });
    Router.register('/help', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(HelpView.render(u)); });
    Router.register('/notifications', () => this.showPlaceholder('Notifications'));
  },

  // Initialize the app
  init() {
    this.registerRoutes();
    Router.start();
  }
};
