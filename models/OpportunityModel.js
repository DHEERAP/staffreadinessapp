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
  expressInterest(opportunityId, userId) {
    const interests = Storage.get('userInterests') || [];
    if (interests.find(i => i.opportunityId === opportunityId && i.userId === userId))
      return { success: false, message: "You have already expressed interest." };
    interests.push({ opportunityId, userId, date: new Date().toLocaleDateString() });
    Storage.set('userInterests', interests);
    return { success: true, message: "Interest expressed successfully!" };
  },
  hasExpressedInterest(opportunityId, userId) {
    const interests = Storage.get('userInterests') || [];
    return interests.some(i => i.opportunityId === opportunityId && i.userId === userId);
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
