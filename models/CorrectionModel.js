// models/CorrectionModel.js
const CorrectionModel = {
  getAll() { return Storage.get('correctionReqs') || CORRECTION_REQUESTS; },
  getByTab(tab) { return this.getAll().filter(r => r.tab === tab); },
  getById(id) { return this.getAll().find(r => r.id === id) || null; },
  updateStatus(id, status, tab) {
    const reqs = this.getAll();
    const idx = reqs.findIndex(r => r.id === id);
    if (idx > -1) { reqs[idx].status = status; reqs[idx].tab = tab; Storage.set('correctionReqs', reqs); return true; }
    return false;
  },
  filter(reqs, { type, status, slaStatus } = {}) {
    let r = [...reqs];
    if (type && type !== 'all') r = r.filter(x => x.type === type);
    if (status && status !== 'all') r = r.filter(x => x.status === status);
    if (slaStatus && slaStatus !== 'all') r = r.filter(x => x.slaColor === slaStatus);
    return r;
  },
  search(reqs, query) {
    if (!query) return reqs;
    const q = query.toLowerCase();
    return reqs.filter(r => r.employeeName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.type.toLowerCase().includes(q));
  }
};
