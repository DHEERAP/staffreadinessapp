// controllers/OpportunityController.js
const OpportunityController = {
  showOpportunities() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    if (user.role === 'rmg' || user.role === 'project_head') {
      StaffingController.showStaffingList();
      return;
    }
    const opportunities = OpportunityModel.getAll();
    AppController.render(OpportunitiesView.render(user, opportunities));
    this.bindFilters(user);
  },

  bindFilters(user) {
    const search = document.getElementById('searchOpportunities');
    const locFilter = document.getElementById('filterLocation');
    const roleFilter = document.getElementById('filterRole');
    const modeFilter = document.getElementById('filterWorkMode');

    const applyFilters = () => {
      const results = OpportunityModel.filter({
        search: search?.value,
        location: locFilter?.value,
        role: roleFilter?.value,
        workMode: modeFilter?.value
      });
      OpportunitiesView.updateList(results, user);
    };

    if (search) search.addEventListener('input', Helpers.debounce(applyFilters, 300));
    if (locFilter) locFilter.addEventListener('change', applyFilters);
    if (roleFilter) roleFilter.addEventListener('change', applyFilters);
    if (modeFilter) modeFilter.addEventListener('change', applyFilters);
  },

  viewDetails(id) {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const opp = OpportunityModel.getById(id);
    if (!opp) { Helpers.showToast('Opportunity not found.', 'error'); return; }
    AppController.render(OpportunityDetailView.render(user, opp));
  },

  expressInterest(id) {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const result = OpportunityModel.expressInterest(id, user.id);
    Helpers.showToast(result.message, result.success ? 'success' : 'info');
    // re-render current view so the button state updates immediately
    try {
      const hash = (window.location.hash || '').replace('#', '');
      if (hash === '/opportunities' || hash === '') {
        this.showOpportunities();
      } else if (hash === '/applications') {
        AppController.render(MyApplicationsView.render(AuthModel.getCurrentUser()));
      } else if (hash === '/interests') {
        AppController.render(MyInterestsView.render(AuthModel.getCurrentUser()));
      } else {
        // re-open detail to refresh button if user was on detail page
        this.viewDetails(id);
      }
    } catch (e) {
      // ignore render failures
    }
  },

  saveOpportunity(id) {
    const user = AuthModel.getCurrentUser();
    if (!user) return;
    const result = OpportunityModel.saveOpportunity(id, user.id);
    Helpers.showToast(result.message, result.success ? 'success' : 'info');
  }
};
