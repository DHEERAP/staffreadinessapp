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
    // mark forwarded to project head (auto-forward)
    try {
      const current = AuthModel.getCurrentUser();
      list.forwarded = true;
      list.forwardedOn = new Date().toLocaleString();
      list.forwardedBy = current ? (current.employeeId || current.id) : null;
      list.projectHeadEmployeeId = req.createdBy || null;
    } catch (e) {
      // ignore if AuthModel not available
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
  getProjectHeadShortlists(projectHeadEmployeeId) {
    const lists = this.getShortlists();
    const reqs = this.getAll().filter(r => r.createdBy === projectHeadEmployeeId);
    const reqIds = reqs.map(r => r.id);
    return lists.filter(s => s.status === 'Pending Approval' && reqIds.includes(s.requirementId));
  },
  removeFromShortlist(reqId, employeeId) {
    const lists = this.getShortlists();
    console.log('removeFromShortlist called', { reqId, employeeId, listsCount: lists.length });
    const list = lists.find(s => s.requirementId === reqId && s.status === 'Pending Approval');
    console.log('found list', list);
    if (!list) return { success: false, message: 'Shortlist not found.' };
    const id = parseInt(employeeId, 10);
    const targetName = (MATCHING_RESULTS.find(m => m.employeeId === id) || {}).name;
    const idx = list.candidates.findIndex(c => c.employeeId === id || c.name === targetName);
    console.log('remove target', { id, targetName, idx, candidates: list.candidates });
    if (idx === -1) return { success: false, message: 'Candidate not in shortlist.' };
    list.candidates.splice(idx, 1);
    Storage.set('shortlists', lists);
    return { success: true, removed: 1, total: list.candidates.length };
  },

  getMatchingResultsForReq(reqId) {
    const req = this.getById(reqId);
    if (!req) return this.getMatchingResults();
    const reqSkills = req.skills || [];
    const minExp = req.minExperience || 0;
    const results = EMPLOYEES.map(emp => {
      const empSkills = emp.skills || [];
      const skillsMatched = reqSkills.filter(s => empSkills.includes(s)).length;
      const skillScore = reqSkills.length ? (skillsMatched / reqSkills.length) * 70 : 0;
      const expScore = minExp ? Math.min(emp.experience / minExp, 1) * 20 : Math.min(emp.experience / Math.max(1, emp.experience), 1) * 20;
      const availScore = (emp.availability && emp.availability.toLowerCase().includes('immediate')) ? 10 : 0;
      let matchScore = Math.round(Math.min(100, skillScore + expScore + availScore));
      let confidence = matchScore >= 85 ? 'High' : matchScore >= 70 ? 'Medium' : 'Low';
      let suitability = matchScore >= 85 ? 'Highly Suitable' : matchScore >= 70 ? 'Suitable' : matchScore >= 50 ? 'Consider w/ Gaps' : 'Not Suitable';
      const interest = (emp.activeInterests && emp.activeInterests > 0) ? 'Yes' : 'No';
      return {
        rank: 0,
        employeeId: emp.id,
        name: emp.name,
        matchScore,
        confidence,
        interest,
        availability: emp.availability || 'Immediate',
        suitability
      };
    }).sort((a,b) => b.matchScore - a.matchScore).map((r,i) => ({ ...r, rank: i+1 }));
    return results;
  },
  isShortlisted(reqId, employeeId) {
    const list = this.getShortlists().find(s => s.requirementId === reqId);
    if (!list) return false;
    const id = parseInt(employeeId, 10);
    const emp = EmployeeModel.getById(id);
    const empName = emp ? emp.name : null;
    return list.candidates.some(c => (c.employeeId && c.employeeId === id) || (empName && c.name === empName));
  },
  approveShortlist(reqId, comments) {
    const lists = this.getShortlists();
    const list = lists.find(s => s.requirementId === reqId);
    if (!list) return false;
    list.status = 'Approved';
    list.overrideComments = comments || '';
    // mark as forwarded to RMG and store metadata
    try {
      const current = AuthModel.getCurrentUser();
      list.forwardedToRMG = true;
      list.forwardedToRMGOn = new Date().toLocaleString();
      list.forwardedToRMGBy = current ? (current.employeeId || current.id) : null;
    } catch (e) { /* ignore auth errors */ }
    Storage.set('shortlists', lists);
    this.updateStatus(reqId, 'Approved');

    // create or append to RMG-approved list storage so RMG can pick up approvals
    try {
      const rmgApproved = Storage.get('rmgApprovedShortlists') || [];
      const approvedEntry = {
        requirementId: reqId,
        requirement: list.requirement,
        project: list.project,
        openings: list.openings,
        candidates: (list.candidates || []).map(c => ({ ...c })),
        overrideComments: list.overrideComments || '',
        approvedOn: new Date().toLocaleString(),
        approvedBy: (AuthModel.getCurrentUser() ? (AuthModel.getCurrentUser().employeeId || AuthModel.getCurrentUser().id) : null)
      };
      rmgApproved.push(approvedEntry);
      Storage.set('rmgApprovedShortlists', rmgApproved);
    } catch (e) {
      console.error('Failed to write rmgApprovedShortlists', e);
    }

    return true;
  }

  ,getRmgApprovedShortlists() {
    return Storage.get('rmgApprovedShortlists') || [];
  }
};
