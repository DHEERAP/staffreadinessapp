// models/StaffingModel.js
const StaffingModel = {
  getAll() {
    let reqs = Storage.get('staffingReqs');
    if (!reqs) {
      reqs = JSON.parse(JSON.stringify(STAFFING_REQUIREMENTS));
      Storage.set('staffingReqs', reqs);
    }
    return reqs;
  },
  getById(id) { return this.getAll().find(s => s.id === id) || null; },
  getMatchingResults() { return MATCHING_RESULTS; },
  getInterestDashboard() { return INTEREST_DASHBOARD; },
  getShortlists() {
    let lists = Storage.get('shortlists');
    if (!lists) {
      lists = JSON.parse(JSON.stringify(SHORTLIST_FOR_APPROVAL));
      Storage.set('shortlists', lists);
    }
    return lists;
  },
  getShortlistForApproval() { return this.getShortlists(); },
  getPendingShortlists() { return this.getShortlists().filter(s => s.status === 'Pending Approval'); },
  create(data) {
    const reqs = this.getAll();
    const newReq = { ...data, id: 'SR-' + String(reqs.length + 1).padStart(3, '0'), createdOn: new Date().toLocaleDateString(), matchingStats: null };
    reqs.push(newReq);
    Storage.set('staffingReqs', reqs);
    return { success: true, data: newReq };
  },
  updateStatus(id, status) {
    const reqs = this.getAll();
    const idx = reqs.findIndex(r => r.id === id);
    if (idx > -1) { reqs[idx].status = status; Storage.set('staffingReqs', reqs); return true; }
    return false;
  },
  filterByStatus(status) {
    return this.getAll().filter(r => r.status === status);
  },
  addToShortlist(reqId, employeeIds) {
    const req = this.getById(reqId);
    if (!req) return { success: false, message: 'Requirement not found.' };
    const lists = this.getShortlists();
    let list = lists.find(s => s.requirementId === reqId && s.status === 'Pending Approval');
    if (!list) {
      list = { requirementId: reqId, requirement: req.requiredRole, project: req.projectName, openings: req.noOfResources, candidates: [], overrideComments: '', status: 'Pending Approval' };
      lists.push(list);
    }
    const ids = employeeIds.map(id => parseInt(id, 10));
    let added = 0;
    ids.forEach(id => {
      const match = MATCHING_RESULTS.find(m => m.employeeId === id);
      const emp = EmployeeModel.getById(id);
      const name = match?.name || emp?.name;
      if (!name) return;
      if (list.candidates.find(c => c.name === name || c.employeeId === id)) return;
      list.candidates.push({
        name,
        employeeId: id,
        matchScore: match?.matchScore || 0,
        interest: match?.interest || 'Yes',
        availability: match?.availability || emp?.availability || 'Immediate',
        rmgRecommendation: 'Recommended',
        decision: 'Approve'
      });
      added++;
    });
    Storage.set('shortlists', lists);
    return { success: true, added, total: list.candidates.length };
  },
  isShortlisted(reqId, employeeId) {
    const list = this.getShortlists().find(s => s.requirementId === reqId);
    if (!list) return false;
    return list.candidates.some(c => c.employeeId === parseInt(employeeId, 10) || c.name === (MATCHING_RESULTS.find(m => m.employeeId === parseInt(employeeId, 10)) || {}).name);
  },
  approveShortlist(reqId, comments) {
    const lists = this.getShortlists();
    const list = lists.find(s => s.requirementId === reqId);
    if (!list) return false;
    list.status = 'Approved';
    list.overrideComments = comments || '';
    Storage.set('shortlists', lists);
    this.updateStatus(reqId, 'Approved');
    return true;
  }
};
