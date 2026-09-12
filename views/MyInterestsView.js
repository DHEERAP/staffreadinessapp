// views/MyInterestsView.js
const MyInterestsView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/interests');
    const interests = [
      { role: 'Java Backend Developer', project: 'Banking Transformation Project', location: 'Hyderabad (Hybrid)', matchScore: 88, status: 'Under Review', expressedOn: '05 Sep 2026', suitability: 'Highly Suitable' },
      { role: 'Full Stack Developer', project: 'Retail Digital Platform', location: 'Bengaluru (Remote)', matchScore: 76, status: 'Shortlisted', expressedOn: '02 Sep 2026', suitability: 'Suitable' },
      { role: 'Data Engineer', project: 'Analytics Modernization', location: 'Pune (Hybrid)', matchScore: 62, status: 'Not Selected', expressedOn: '28 Aug 2026', suitability: 'Consider with Gaps' }
    ];
    const statusColor = { 'Under Review': 'bg-orange-100 text-orange-700', 'Shortlisted': 'bg-green-100 text-green-700', 'Not Selected': 'bg-red-100 text-red-600' };
    const scoreColor = s => s >= 85 ? 'text-green-600' : s >= 70 ? 'text-blue-600' : 'text-orange-500';

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <h2 class="text-base font-semibold text-gray-800">My Interests</h2>
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
            ${interests.map(i => `
              <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-semibold text-gray-800">${i.role}</h3>
                    <p class="text-sm text-gray-500">${i.project}</p>
                    <p class="text-xs text-gray-400 mt-1">📍 ${i.location} · Expressed on ${i.expressedOn}</p>
                  </div>
                  <div class="text-right">
                    <p class="${scoreColor(i.matchScore)} text-lg font-bold">${i.matchScore}%</p>
                    <p class="text-xs text-gray-500">${i.suitability}</p>
                    <span class="mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[i.status]}">${i.status}</span>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </main>
      </div>`;
  }
};
