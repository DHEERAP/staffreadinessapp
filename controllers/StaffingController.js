// controllers/StaffingController.js
const StaffingController = {
  currentReqId: null,

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

  showStaffingList() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const reqs = StaffingModel.getAll();
    AppController.render(OpportunitiesView.renderStaffing(user, reqs));
  },

  showStaffingDetail(id) {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const req = StaffingModel.getById(id);
    if (!req) { Helpers.showToast('Requirement not found.', 'error'); return; }
    this.currentReqId = id;
    AppController.render(StaffingDetailView.render(user, req));
  },

  showMatchingResults() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const reqs = StaffingModel.getAll();
    let req = this.currentReqId ? StaffingModel.getById(this.currentReqId) : null;
    if (!req) req = reqs.find(r => r.matchingStats) || reqs[0];
    if (req) this.currentReqId = req.id;
    const stats = req?.matchingStats || { candidatesEvaluated: MATCHING_RESULTS.length, eligibleCandidates: MATCHING_RESULTS.length, interestedEmployees: MATCHING_RESULTS.filter(m => m.interest === 'Yes').length, shortlisted: StaffingModel.getShortlists().find(s => s.requirementId === req?.id)?.candidates.length || 0, totalRequired: req?.noOfResources || 0 };
    const results = StaffingModel.getMatchingResults().map(r => ({ ...r, shortlisted: StaffingModel.isShortlisted(req.id, r.employeeId) }));
    AppController.render(MatchingResultsView.render(user, stats, results, req, reqs));
    MatchingController.bindFilters();
  }
};

const MatchingController = {
  bindFilters() {
    const p = document.getElementById('filterProject');
    const r = document.getElementById('filterRoleMatch');
    const apply = () => {
      const reqs = StaffingModel.getAll();
      let req = reqs.find(x => x.id === (p?.value || StaffingController.currentReqId));
      if (r?.value && r.value !== 'all') req = reqs.find(x => x.requiredRole === r.value) || req;
      if (req) { StaffingController.currentReqId = req.id; StaffingController.showMatchingResults(); }
    };
    if (p) p.addEventListener('change', apply);
    if (r) r.addEventListener('change', apply);
  },
  runAgain() { Helpers.showToast('Matching algorithm re-run successfully!', 'success'); },
  addToShortlist() {
    const boxes = [...document.querySelectorAll('.match-select:checked')];
    const ids = boxes.map(b => b.value);
    if (!ids.length) { Helpers.showToast('Select at least one employee.', 'error'); return; }
    const result = StaffingModel.addToShortlist(StaffingController.currentReqId, ids);
    Helpers.showToast(result.success ? `${result.added} added to shortlist.` : result.message, result.success ? 'success' : 'error');
    StaffingController.showMatchingResults();
  },
  addOne(id) {
    const result = StaffingModel.addToShortlist(StaffingController.currentReqId, [id]);
    Helpers.showToast(result.success ? 'Employee added to shortlist.' : result.message, result.success ? 'success' : 'error');
    StaffingController.showMatchingResults();
  },
  exportResults() { Helpers.showToast('Results exported successfully!', 'success'); }
};

const ApprovalController = {
  showApproveShortlist() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const pending = StaffingModel.getPendingShortlists();
    AppController.render(ApproveShortlistView.render(user, pending));
    this.bindFilters(pending);
  },
  bindFilters(pending) {
    const apply = () => {
      const proj = document.getElementById('apFilterProject')?.value;
      const role = document.getElementById('apFilterRole')?.value;
      let list = pending;
      if (proj && proj !== 'all') list = list.filter(s => s.project === proj);
      if (role && role !== 'all') list = list.filter(s => s.requirement === role);
      const wrap = document.getElementById('shortlistBlocks');
      if (wrap) wrap.innerHTML = ApproveShortlistView.renderBlocks(list);
    };
    document.getElementById('apFilterProject')?.addEventListener('change', apply);
    document.getElementById('apFilterRole')?.addEventListener('change', apply);
  },
  approveShortlist(reqId) {
    const comments = document.getElementById('overrideComments-' + reqId)?.value || document.getElementById('overrideComments')?.value;
    StaffingModel.approveShortlist(reqId, comments);
    Helpers.showToast('Shortlist approved successfully!', 'success');
    setTimeout(() => Router.navigate('/dashboard'), 800);
  }
};

const InterestController = {
  showInterestDashboard() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const data = StaffingModel.getInterestDashboard();
    AppController.render(InterestDashboardView.render(user, data));
  },
  viewDetails(reqId) { StaffingController.showStaffingDetail(reqId); }
};
