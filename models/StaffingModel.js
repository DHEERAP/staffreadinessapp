// models/StaffingModel.js
const StaffingModel = {
  getAll() { return Storage.get('staffingReqs') || STAFFING_REQUIREMENTS; },
  getById(id) { return this.getAll().find(s => s.id === id) || null; },
  getMatchingResults() { return MATCHING_RESULTS; },
  getInterestDashboard() { return INTEREST_DASHBOARD; },
  getShortlistForApproval() { return SHORTLIST_FOR_APPROVAL; },
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
  }
};
