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
    let resultsRaw = StaffingModel.getMatchingResultsForReq(this.currentReqId);
    // apply UI filters (techstack) if present
    const tech = document.getElementById('filterTech')?.value;
    if (tech && tech !== 'all') {
      resultsRaw = resultsRaw.filter(r => (EmployeeModel.getById(r.employeeId)?.skills || []).includes(tech));
    }
    const results = resultsRaw.map(r => ({ ...r, shortlisted: StaffingModel.isShortlisted(req.id, r.employeeId) }));
    const stats = req?.matchingStats || {
      candidatesEvaluated: results.length,
      eligibleCandidates: results.length,
      interestedEmployees: results.filter(m => m.interest === 'Yes').length,
      shortlisted: StaffingModel.getShortlists().find(s => s.requirementId === req?.id)?.candidates.length || 0,
      totalRequired: req?.noOfResources || 0
    };
    let selectedTech = document.getElementById('filterTech')?.value || 'all';
    // if a specific requirement is selected and the selectedTech is not part of that req's skills, reset to 'all'
    try {
      if (req && req.skills && selectedTech !== 'all' && !req.skills.includes(selectedTech)) selectedTech = 'all';
    } catch (e) { /* ignore */ }
    AppController.render(MatchingResultsView.render(user, stats, results, req, reqs, selectedTech));
    MatchingController.bindFilters();
  }
};

const MatchingController = {
  bindFilters() {
    const p = document.getElementById('filterProject');
    const t = document.getElementById('filterTech');
    const apply = () => {
      const reqs = StaffingModel.getAll();
      let req = null;
      const projVal = p?.value || 'all';
      const techVal = t?.value || 'all';
      if (projVal && projVal !== 'all') {
        if (techVal && techVal !== 'all') {
          // prefer requirement that matches both project and tech
          req = reqs.find(x => x.projectName === projVal && (x.skills || []).includes(techVal));
        }
        // fallback to any requirement with the project name
        if (!req) req = reqs.find(x => x.projectName === projVal);
      } else if (techVal && techVal !== 'all') {
        // pick the first requirement that lists this tech
        req = reqs.find(x => (x.skills || []).includes(techVal));
      }
      if (!req) req = reqs.find(x => x.id === StaffingController.currentReqId) || reqs[0];
      if (req) { StaffingController.currentReqId = req.id; StaffingController.showMatchingResults(); }
    };
    if (p) p.addEventListener('change', apply);
    if (t) t.addEventListener('change', apply);
  },
  runAgain() { Helpers.showToast('Matching algorithm re-run successfully!', 'success'); },
  addToShortlist(evt) {
    try { if (evt && evt.target) evt.target.disabled = true; } catch (e) {}
    const boxes = [...document.querySelectorAll('.match-select:checked')];
    const ids = boxes.map(b => b.value);
    console.log('AddToShortlist clicked', { currentReqId: StaffingController.currentReqId, ids });
    if (!ids.length) { Helpers.showToast('Select at least one employee.', 'error'); return; }
    const result = StaffingModel.addToShortlist(StaffingController.currentReqId, ids);
    if (!result.success) {
      console.error('addToShortlist failed', { reqId: StaffingController.currentReqId, result });
    }
    Helpers.showToast(result.success ? `${result.added} added to shortlist.` : `${result.message} (req:${StaffingController.currentReqId})`, result.success ? 'success' : 'error');
    StaffingController.showMatchingResults();
  },
  addOne(evt, id) {
    try { if (evt && evt.target) evt.target.disabled = true; } catch (e) {}
    console.log('addOne', { currentReqId: StaffingController.currentReqId, id });
    const result = StaffingModel.addToShortlist(StaffingController.currentReqId, [id]);
    if (!result.success) console.error('addOne failed', { reqId: StaffingController.currentReqId, id, result });
    Helpers.showToast(result.success ? 'Employee added to shortlist.' : `${result.message} (req:${StaffingController.currentReqId})`, result.success ? 'success' : 'error');
    StaffingController.showMatchingResults();
  },
  removeOne(evt, id) {
    try { if (evt && evt.target) evt.target.disabled = true; } catch (e) {}
    console.log('removeOne', { currentReqId: StaffingController.currentReqId, id });
    let res = StaffingModel.removeFromShortlist(StaffingController.currentReqId, id);
    if (!res.success) {
      console.warn('removeOne initial failed, trying fallback search across shortlists', { reqId: StaffingController.currentReqId, id, res });
      // fallback: search all shortlists for the candidate and remove from there
      const lists = StaffingModel.getShortlists();
      const emp = EmployeeModel.getById(parseInt(id, 10));
      const found = lists.find(l => l.candidates && l.candidates.some(c => (c.employeeId && c.employeeId === parseInt(id, 10)) || (emp && c.name === emp.name)));
      if (found) {
        res = StaffingModel.removeFromShortlist(found.requirementId, id);
        if (res.success) console.log('removeOne fallback removed from', found.requirementId);
      }
    }
    if (!res.success) console.error('removeOne failed', { reqId: StaffingController.currentReqId, id, res });
    Helpers.showToast(res.success ? 'Employee removed from shortlist.' : `${res.message} (req:${StaffingController.currentReqId})`, res.success ? 'success' : 'error');
    StaffingController.showMatchingResults();
  },
  exportResults() { Helpers.showToast('Results exported successfully!', 'success'); }
};

const ApprovalController = {
  showApproveShortlist() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    let pending = StaffingModel.getPendingShortlists();
    if (user.role === 'project_head') {
      // show only shortlists for this project head
      pending = StaffingModel.getProjectHeadShortlists(user.employeeId || user.employeeId);
    }
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
