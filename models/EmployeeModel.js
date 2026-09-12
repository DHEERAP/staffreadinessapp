// models/EmployeeModel.js
const EmployeeModel = {
  getAll() { return EMPLOYEES; },
  getById(id) { return EMPLOYEES.find(e => e.id === parseInt(id)) || null; },
  getCurrentEmployeeData(userId) {
    return EMPLOYEES.find(e => e.id === parseInt(userId)) || EMPLOYEES[0];
  },
  getDashboardStats(userId) {
    const emp = this.getCurrentEmployeeData(userId);
    return {
      profileCompleteness: emp.profileCompleteness,
      verifiedSkills: emp.verifiedSkills,
      recommendedOpportunities: OPPORTUNITIES.length,
      activeInterests: emp.activeInterests,
      readinessScore: emp.readinessScore
    };
  },
  getReadinessBreakdown(userId) {
    return { highlySuitable: 2, suitable: 3, considerWithGaps: 1, notRecommended: 0 };
  }
};
