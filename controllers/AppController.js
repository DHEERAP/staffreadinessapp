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

  registerRoutes() {
    Router.register('/login', () => this.showLogin());
    Router.register('/dashboard', () => this.showDashboard());
    Router.register('/opportunities', () => OpportunityController.showOpportunities());
    Router.register('/create-staffing', () => StaffingController.showCreateStaffing());
    Router.register('/matching', () => StaffingController.showMatchingResults());
    Router.register('/approve-shortlist', () => ApprovalController.showApproveShortlist());
    Router.register('/corrections', () => CorrectionController.showCorrectionRequests());
    Router.register('/interest-dashboard', () => InterestController.showInterestDashboard());
    Router.register('/profile', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(MyProfileView.render(u)); MyProfileView.bindEvents(); });
    Router.register('/interests', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(MyInterestsView.render(u)); });
    Router.register('/applications', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(MyApplicationsView.render(u)); });
    Router.register('/reports', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(ReportsView.render(u)); });
    Router.register('/help', () => { const u = AuthModel.getCurrentUser(); if (!u) { Router.navigate('/login'); return; } this.render(HelpView.render(u)); HelpView.bindEvents(); });
  },

  // Initialize the app
  init() {
    this.registerRoutes();
    Router.start();
  }
};
