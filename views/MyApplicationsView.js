// views/MyApplicationsView.js
const MyApplicationsView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/applications');
    const applications = [
      { id: 'APP-001', role: 'Java Backend Developer', project: 'Banking Transformation Project', appliedOn: '05 Sep 2026', matchScore: 88, stage: 'RMG Review', status: 'In Progress' },
      { id: 'APP-002', role: 'Full Stack Developer', project: 'Retail Digital Platform', appliedOn: '02 Sep 2026', matchScore: 76, stage: 'Delivery Head Approval', status: 'Shortlisted' },
      { id: 'APP-003', role: 'Data Engineer', project: 'Analytics Modernization', appliedOn: '28 Aug 2026', matchScore: 62, stage: 'Closed', status: 'Not Selected' }
    ];
    const stageColor = { 'In Progress': 'bg-blue-100 text-blue-700', 'Shortlisted': 'bg-green-100 text-green-700', 'Not Selected': 'bg-red-100 text-red-600' };
    const stages = ['Interest Expressed', 'RMG Review', 'Delivery Head Approval', 'Selected'];

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h2 class="text-base font-semibold text-gray-800">My Applications</h2>
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
            <h1 class="text-xl font-bold text-gray-800">My Applications</h1>
            <p class="text-gray-500 text-sm">Track the status of your staffing applications.</p>
          </div>

          <!-- Summary -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p class="text-2xl font-bold text-gray-800">${applications.length}</p>
              <p class="text-xs text-gray-500 mt-1">Total Applications</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p class="text-2xl font-bold text-green-600">${applications.filter(a => a.status === 'Shortlisted').length}</p>
              <p class="text-xs text-gray-500 mt-1">Shortlisted</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p class="text-2xl font-bold text-blue-600">${applications.filter(a => a.status === 'In Progress').length}</p>
              <p class="text-xs text-gray-500 mt-1">In Progress</p>
            </div>
          </div>

          <!-- Application Cards -->
          <div class="space-y-4">
            ${applications.map(app => {
              const currentStageIdx = stages.indexOf(app.stage);
              return `
              <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-gray-400">${app.id}</span>
                      <span class="text-xs px-2 py-0.5 rounded-full font-medium ${stageColor[app.status]}">${app.status}</span>
                    </div>
                    <h3 class="font-semibold text-gray-800 mt-1">${app.role}</h3>
                    <p class="text-sm text-gray-500">${app.project}</p>
                    <p class="text-xs text-gray-400 mt-1">Applied on ${app.appliedOn} · Match Score: <span class="font-semibold text-blue-600">${app.matchScore}%</span></p>
                  </div>
                </div>
                <!-- Progress Steps -->
                <div class="flex items-center gap-0">
                  ${stages.map((s, idx) => `
                    <div class="flex items-center ${idx < stages.length - 1 ? 'flex-1' : ''}">
                      <div class="flex flex-col items-center">
                        <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${app.status === 'Not Selected' ? 'bg-gray-200 text-gray-400' : idx <= currentStageIdx ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}">${idx + 1}</div>
                        <p class="text-xs text-gray-500 mt-1 text-center w-16">${s}</p>
                      </div>
                      ${idx < stages.length - 1 ? `<div class="flex-1 h-0.5 mb-4 ${app.status === 'Not Selected' ? 'bg-gray-200' : idx < currentStageIdx ? 'bg-blue-600' : 'bg-gray-200'}"></div>` : ''}
                    </div>`).join('')}
                </div>
              </div>`;
            }).join('')}
          </div>
        </main>
      </div>`;
  }
};
