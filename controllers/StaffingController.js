// controllers/StaffingController.js
const StaffingController = {
  showCreateStaffing() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    CreateStaffingView.currentSkills = ["Java", "Spring Boot", "REST APIs"];
    AppController.render(CreateStaffingView.render(user));
    CreateStaffingView.bindEvents();
  },

  saveDraft() {
    const data = CreateStaffingView.getFormData();
    data.status = 'Draft';
    StaffingModel.create(data);
    Helpers.showToast('Requirement saved as draft!', 'success');
  },

  submitToRMG() {
    if (!CreateStaffingView.validate()) { Helpers.showToast('Please fill all required fields.', 'error'); return; }
    const data = CreateStaffingView.getFormData();
    data.status = 'Submitted to RMG';
    StaffingModel.create(data);
    Helpers.showToast('Requirement submitted to RMG successfully!', 'success');
    setTimeout(() => Router.navigate('/dashboard'), 1500);
  },

  showMatchingResults() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const req = STAFFING_REQUIREMENTS[0];
    const stats = req.matchingStats;
    const results = StaffingModel.getMatchingResults();
    AppController.render(MatchingResultsView.render(user, stats, results));
  }
};

const MatchingController = {
  runAgain() { Helpers.showToast('Matching algorithm re-run successfully!', 'success'); },
  compare() { Helpers.showToast('Select candidates to compare.', 'info'); },
  addToShortlist() { Helpers.showToast('Selected candidates added to shortlist!', 'success'); },
  exportResults() { Helpers.showToast('Results exported successfully!', 'success'); },
  viewProfile(id) { Helpers.showToast(`Viewing profile of employee #${id}`, 'info'); }
};

const ApprovalController = {
  showApproveShortlist() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const shortlist = StaffingModel.getShortlistForApproval()[0];
    AppController.render(ApproveShortlistView.render(user, shortlist));
  },
  returnToRMG() { Helpers.showToast('Shortlist returned to RMG for review.', 'info'); Router.navigate('/matching'); },
  approveShortlist() {
    const comments = document.getElementById('overrideComments')?.value;
    Helpers.showToast('Shortlist approved successfully!', 'success');
    setTimeout(() => Router.navigate('/dashboard'), 1500);
  }
};

const InterestController = {
  showInterestDashboard() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const data = StaffingModel.getInterestDashboard();
    AppController.render(InterestDashboardView.render(user, data));
  },
  viewDetails(reqId) { Helpers.showToast(`Viewing details for ${reqId}`, 'info'); }
};
