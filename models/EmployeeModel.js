// models/EmployeeModel.js
const EmployeeModel = {
  getAll() { return EMPLOYEES; },
  getById(id) { return this.getMerged(id); },
  getOverrides() { return Storage.get('employeeProfiles') || {}; },
  getMerged(userId) {
    const base = EMPLOYEES.find(e => e.id === parseInt(userId, 10)) || {};
    const over = this.getOverrides()[String(userId)] || {};
    return { ...base, ...over };
  },
  getCurrentEmployeeData(userId) {
    const merged = this.getMerged(userId);
    return merged.id ? merged : EMPLOYEES[0];
  },
  saveProfile(userId, data) {
    const all = this.getOverrides();
    all[String(userId)] = { ...(all[String(userId)] || {}), ...data };
    Storage.set('employeeProfiles', all);
    const user = AuthModel.getCurrentUser();
    if (user && user.id === parseInt(userId, 10)) {
      const updated = { ...user };
      if (data.name) updated.name = data.name;
      if (data.email) updated.email = data.email;
      if (data.department) updated.department = data.department;
      if (data.designation) updated.designation = data.designation;
      if (data.name) updated.avatar = data.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
      Storage.saveUser(updated);
    }
    return { success: true };
  },
  getDashboardStats(userId) {
    const emp = this.getCurrentEmployeeData(userId);
    return {
      profileCompleteness: emp.profileCompleteness,
      verifiedSkills: typeof emp.verifiedSkills === 'number' ? emp.verifiedSkills : (emp.skills || []).length,
      recommendedOpportunities: OPPORTUNITIES.length,
      activeInterests: emp.activeInterests,
      readinessScore: emp.readinessScore
    };
  },
  getReadinessBreakdown(userId) {
    return { highlySuitable: 2, suitable: 3, considerWithGaps: 1, notRecommended: 0 };
  }
};
