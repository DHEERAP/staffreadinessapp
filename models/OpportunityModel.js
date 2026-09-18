// models/OpportunityModel.js
const OpportunityModel = {
  getAll() { return OPPORTUNITIES; },
  getById(id) { return OPPORTUNITIES.find(o => o.id === parseInt(id)) || null; },

  filter({ location, role, workMode, search } = {}) {
    let r = [...OPPORTUNITIES];
    if (search) { const q = search.toLowerCase(); r = r.filter(o => o.title.toLowerCase().includes(q) || o.project.toLowerCase().includes(q)); }
    if (location && location !== 'all') r = r.filter(o => o.location.toLowerCase().includes(location.toLowerCase()));
    if (role && role !== 'all') r = r.filter(o => o.title.toLowerCase().includes(role.toLowerCase()));
    if (workMode && workMode !== 'all') r = r.filter(o => o.workMode.toLowerCase() === workMode.toLowerCase());
    return r;
  },

  // generate a simple client-side application id
  _generateApplicationId() {
    const key = 'appCounter';
    let c = Storage.get(key) || 0;
    c = parseInt(c, 10) + 1;
    Storage.set(key, c);
    return 'APP-' + String(c).padStart(3, '0');
  },

  expressInterest(opportunityId, userId) {
    opportunityId = parseInt(opportunityId, 10);
    // keep original form but normalize when comparing
    const normalizedUserId = userId;
    userId = parseInt(userId, 10);
    const interests = Storage.get('userInterests') || [];
    if (interests.find(i => i.opportunityId === opportunityId && (String(i.userId) === String(normalizedUserId) || parseInt(i.userId, 10) === userId)))
      return { success: false, message: "You have already expressed interest." };

    const now = new Date().toLocaleDateString();
    interests.push({ opportunityId, userId, date: now });
    Storage.set('userInterests', interests);

    // also create an application record (if not already present)
    try {
      const applications = Storage.get('userApplications') || [];
      const exists = applications.find(a => a.opportunityId === opportunityId && (String(a.userId) === String(normalizedUserId) || parseInt(a.userId, 10) === userId));
      if (!exists) {
        const opp = this.getById(opportunityId) || {};
        const app = {
          applicationId: this._generateApplicationId(),
          opportunityId,
          userId,
          appliedOn: now,
          title: opp.title || '',
          project: opp.project || '',
          matchScore: opp.matchScore || 0,
          stage: 'Interest Expressed',
          status: 'In Progress'
        };
        applications.push(app);
        Storage.set('userApplications', applications);
        console.debug('OpportunityModel.expressInterest - saved application', app);
      }
    } catch (e) {
      console.error('expressInterest: failed to create application record', e);
    }

    // debug: log current storage snapshot for quick inspection
    try { console.debug('userInterests', Storage.get('userInterests'), 'userApplications', Storage.get('userApplications')); } catch (e) {}

    return { success: true, message: "Interest expressed successfully!" };
  },

  hasExpressedInterest(opportunityId, userId) {
    const interests = Storage.get('userInterests') || [];
    return interests.some(i => i.opportunityId === opportunityId && i.userId === userId);
  },

  // new helpers
  getUserInterests(userId) {
    userId = parseInt(userId, 10);
    const interests = Storage.get('userInterests') || [];
    return interests.filter(i => parseInt(i.userId, 10) === userId);
  },

  getUserApplications(userId) {
    userId = parseInt(userId, 10);
    const apps = Storage.get('userApplications') || [];
    return apps.filter(a => parseInt(a.userId, 10) === userId);
  },

  saveOpportunity(opportunityId, userId) {
    const saved = Storage.get('savedOpportunities') || [];
    if (saved.find(s => s.opportunityId === opportunityId && s.userId === userId))
      return { success: false, message: "Already saved." };
    saved.push({ opportunityId, userId });
    Storage.set('savedOpportunities', saved);
    return { success: true, message: "Opportunity saved!" };
  }
};
