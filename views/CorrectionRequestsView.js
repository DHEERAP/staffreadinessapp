// views/CorrectionRequestsView.js
const CorrectionRequestsView = {
  activeTab: 'new',

  render(user, requests) {
    if (user.role === 'employee') return this.renderEmployee(user, requests);
    return this.renderAdmin(user, requests);
  },

  renderEmployee(user, requests) {
    const sidebar = SidebarView.render(user, '/corrections');
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 class="text-base font-bold text-gray-800">Correction Requests</h1>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Raise Correction Request</h2>
          <form id="raiseCorrectionForm" class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 max-w-2xl">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select id="crType" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select type</option>
                  <option value="Skill">Skill</option>
                  <option value="Certification">Certification</option>
                  <option value="Experience">Experience</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Evidence (file name or link)</label>
                <input id="crEvidence" type="text" placeholder="e.g. certificate.pdf" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input id="crDescription" type="text" placeholder="Short summary of the correction" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="crMessage" rows="3" placeholder="Explain the change you need" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Submit Request</button>
            </div>
          </form>
          <h2 class="text-lg font-bold text-gray-800 mb-4">My Requests</h2>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="table-scroll">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  ${['Request ID','Type','Description','Submitted On','Status','Action'].map(h => `<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody id="correctionTableBody">
                ${this.renderEmployeeRows(requests)}
              </tbody>
            </table>
            </div>
          </div>
        </main>
      </div>`;
  },

  renderEmployeeRows(requests) {
    if (!requests.length) return `<tr><td colspan="6" class="px-4 py-8 text-center text-gray-400 text-sm">No requests found.</td></tr>`;
    return requests.map(r => `
      <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
        <td class="px-4 py-3 font-medium text-blue-600" data-label="Request ID">${r.id}</td>
        <td class="px-4 py-3 text-gray-600" data-label="Type">${r.type}</td>
        <td class="px-4 py-3 text-gray-800" data-label="Description">${r.description}</td>
        <td class="px-4 py-3 text-gray-600" data-label="Submitted On">${r.submittedOn}</td>
        <td class="px-4 py-3" data-label="Status">${Helpers.getStatusBadge(r.status)}</td>
        <td class="px-4 py-3" data-label="Action">
          <button onclick="CorrectionController.viewOwnRequest('${r.id}')" class="text-blue-500 hover:text-blue-700 transition" title="View">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>`).join('');
  },

  renderAdmin(user, requests) {
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
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 class="text-base font-bold text-gray-800">Correction Requests</h1>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Correction Requests</h2>
          <div class="flex border-b border-gray-200 mb-4">
            ${[['new', `New (${tabCounts.new})`], ['under_review', `Under Review (${tabCounts.under_review})`], ['appeals', `Appeals (${tabCounts.appeals})`], ['closed', 'Closed']].map(([tab, label]) => `
              <button onclick="CorrectionController.switchTab('${tab}')" id="crTab-${tab}"
                class="px-4 py-2 text-sm font-medium border-b-2 transition cr-tab ${tab === 'new' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}">
                ${label}
              </button>`).join('')}
          </div>
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
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="table-scroll">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  ${['Request ID','Employee','Type','Submitted On','SLA Status','Status','Action'].map(h => `<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody id="correctionTableBody">
                ${this.renderAdminRows(requests)}
              </tbody>
            </table>
            </div>
          </div>
        </main>
      </div>`;
  },

  renderAdminRows(requests) {
    if (!requests.length) return `<tr><td colspan="7" class="px-4 py-8 text-center text-gray-400 text-sm">No requests found.</td></tr>`;
    return requests.map(r => `
      <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
        <td class="px-4 py-3 font-medium text-blue-600" data-label="Request ID">${r.id}</td>
        <td class="px-4 py-3 text-gray-800" data-label="Employee">${r.employeeName}</td>
        <td class="px-4 py-3 text-gray-600" data-label="Type">${r.type}</td>
        <td class="px-4 py-3 text-gray-600" data-label="Submitted On">${r.submittedOn}</td>
        <td class="px-4 py-3 ${Helpers.getSlaClass(r.slaStatus)}" data-label="SLA">${r.slaStatus}</td>
        <td class="px-4 py-3" data-label="Status">${Helpers.getStatusBadge(r.status)}</td>
        <td class="px-4 py-3" data-label="Action">
          <button onclick="CorrectionController.reviewRequest('${r.id}')" class="text-blue-500 hover:text-blue-700 transition" title="Review">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
        </td>
      </tr>`).join('');
  },

  renderRows(requests, isEmployee) {
    return isEmployee ? this.renderEmployeeRows(requests) : this.renderAdminRows(requests);
  },

  updateTable(requests, isEmployee) {
    const tbody = document.getElementById('correctionTableBody');
    if (tbody) tbody.innerHTML = this.renderRows(requests, isEmployee);
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
