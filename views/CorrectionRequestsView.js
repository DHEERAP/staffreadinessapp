// views/CorrectionRequestsView.js
const CorrectionRequestsView = {
  activeTab: 'new',

  render(user, requests) {
    const sidebar = SidebarView.render(user, '/corrections');
    const allReqs = CorrectionModel.getAll();
    const tabCounts = {
      new: allReqs.filter(r => r.tab === 'new').length,
      under_review: allReqs.filter(r => r.tab === 'under_review').length,
      appeals: allReqs.filter(r => r.tab === 'appeals').length,
      closed: allReqs.filter(r => r.tab === 'closed').length
    };
    return `
      ${sidebar}
      <div class="ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <h1 class="text-base font-bold text-gray-800">Correction Requests</h1>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </header>
        <main class="flex-1 p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Correction Requests</h2>

          <!-- Tabs -->
          <div class="flex border-b border-gray-200 mb-4">
            ${[['new', `New (${tabCounts.new})`], ['under_review', `Under Review (${tabCounts.under_review})`], ['appeals', `Appeals (${tabCounts.appeals})`], ['closed', 'Closed']].map(([tab, label]) => `
              <button onclick="CorrectionController.switchTab('${tab}')" id="crTab-${tab}"
                class="px-4 py-2 text-sm font-medium border-b-2 transition cr-tab ${tab === 'new' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}">
                ${label}
              </button>`).join('')}
          </div>

          <!-- Filters -->
          <div class="flex items-center gap-3 mb-4 flex-wrap">
            <select id="crFilterType" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">Type</option>
              <option value="Certification">Certification</option>
              <option value="Experience">Experience</option>
              <option value="Skill">Skill</option>
            </select>
            <select id="crFilterStatus" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">Status</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
            </select>
            <select id="crFilterSLA" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">SLA Status</option>
              <option value="green">On Track</option>
              <option value="red">Overdue</option>
            </select>
            <div class="ml-auto relative">
              <svg class="absolute left-3 top-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input id="crSearch" type="text" placeholder="Search..." class="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>

          <!-- Table -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  ${['Request ID','Employee','Type','Submitted On','SLA Status','Status','Action'].map(h => `<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody id="correctionTableBody">
                ${this.renderRows(requests)}
              </tbody>
            </table>
          </div>

          <!-- Legend -->
          <div class="flex items-center gap-6 mt-4 text-xs text-gray-500">
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-orange-400 inline-block"></span> Consider with Gaps (50-69%)</span>
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Not Recommended (&lt;50%)</span>
          </div>
        </main>
      </div>`;
  },

  renderRows(requests) {
    if (!requests.length) return `<tr><td colspan="7" class="px-4 py-8 text-center text-gray-400 text-sm">No requests found.</td></tr>`;
    return requests.map(r => `
      <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
        <td class="px-4 py-3 font-medium text-blue-600">${r.id}</td>
        <td class="px-4 py-3 text-gray-800">${r.employeeName}</td>
        <td class="px-4 py-3 text-gray-600">${r.type}</td>
        <td class="px-4 py-3 text-gray-600">${r.submittedOn}</td>
        <td class="px-4 py-3 ${Helpers.getSlaClass(r.slaStatus)}">${r.slaStatus}</td>
        <td class="px-4 py-3">${Helpers.getStatusBadge(r.status)}</td>
        <td class="px-4 py-3">
          <button onclick="CorrectionController.reviewRequest('${r.id}')" class="text-blue-500 hover:text-blue-700 transition" title="Review">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
        </td>
      </tr>`).join('');
  },

  updateTable(requests) {
    const tbody = document.getElementById('correctionTableBody');
    if (tbody) tbody.innerHTML = this.renderRows(requests);
  },

  switchTabUI(tab) {
    document.querySelectorAll('.cr-tab').forEach(btn => {
      const isActive = btn.id === `crTab-${tab}`;
      btn.classList.toggle('border-blue-600', isActive);
      btn.classList.toggle('text-blue-600', isActive);
      btn.classList.toggle('border-transparent', !isActive);
      btn.classList.toggle('text-gray-500', !isActive);
    });
  }
};
