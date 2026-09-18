// views/MyInterestsView.js
const MyInterestsView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/interests');

    // dynamic interests for the current user
    const rawInterests = OpportunityModel.getUserInterests(user.id) || [];
    const userApplications = OpportunityModel.getUserApplications(user.id) || [];

    const interests = rawInterests.map(i => {
      const opp = OpportunityModel.getById(i.opportunityId) || {};
      const app = userApplications.find(a => a.opportunityId === i.opportunityId);
      return {
        role: opp.title || app?.title || '—',
        project: opp.project || app?.project || '—',
        location: opp.location || '—',
        matchScore: app?.matchScore || opp?.matchScore || 0,
        status: app?.status || 'Under Review',
        expressedOn: i.date || app?.appliedOn || ''
      };
    });

    const statusColor = { 'Under Review': 'bg-orange-100 text-orange-700', 'Shortlisted': 'bg-green-100 text-green-700', 'Not Selected': 'bg-red-100 text-red-600', 'In Progress': 'bg-blue-100 text-blue-700' };
    const scoreColor = s => s >= 85 ? 'text-green-600' : s >= 70 ? 'text-blue-600' : 'text-orange-500';

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h2 class="text-base font-semibold text-gray-800">My Interests</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div>
              <p class="text-sm font-medium text-gray-800">${user.name}</p>
              <p class="text-xs text-gray-500">${user.designation}</p>
            </div>
          </div>
        </header>
        <main class="flex-1 p-6">
          <div class="mb-6">
            <h1 class="text-xl font-bold text-gray-800">My Interests</h1>
            <p class="text-gray-500 text-sm">Opportunities you've expressed interest in.</p>
          </div>

          <!-- Summary -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p class="text-2xl font-bold text-gray-800">${interests.length}</p>
              <p class="text-xs text-gray-500 mt-1">Total Interests</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p class="text-2xl font-bold text-green-600">${interests.filter(i => i.status === 'Shortlisted').length}</p>
              <p class="text-xs text-gray-500 mt-1">Shortlisted</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p class="text-2xl font-bold text-orange-500">${interests.filter(i => i.status === 'Under Review').length}</p>
              <p class="text-xs text-gray-500 mt-1">Under Review</p>
            </div>
          </div>

          <!-- Interest Cards -->
          <div class="space-y-4">
            ${interests.length === 0 ? `<div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center text-gray-400">You have not expressed interest in any opportunities yet.</div>` : interests.map(i => `
              <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-semibold text-gray-800">${i.role}</h3>
                    <p class="text-sm text-gray-500">${i.project}</p>
                    <p class="text-xs text-gray-400 mt-1">${i.location} · Expressed on ${i.expressedOn}</p>
                  </div>
                  <div class="text-right">
                    <p class="${scoreColor(i.matchScore)} text-lg font-bold">${i.matchScore}%</p>
                    <p class="text-xs text-gray-500">Suitability</p>
                    <span class="mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[i.status] || 'bg-gray-100 text-gray-600'}">${i.status}</span>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </main>
      </div>`;
  }
};
