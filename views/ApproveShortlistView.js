// views/ApproveShortlistView.js
const ApproveShortlistView = {
  render(user, shortlist) {
    const sidebar = SidebarView.render(user, '/approve-shortlist');
    const s = shortlist;
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="hidden sm:block text-sm">${Helpers.getBreadcrumb(['Dashboard', 'Approvals', 'Java Backend Developer'])}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">${user.designation}</p><p class="text-xs text-gray-500">${user.name}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6">
          <h1 class="text-lg font-bold text-gray-800 mb-4">Delivery Head – Approve Shortlist</h1>

          <!-- Requirement info bar -->
          <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5 flex flex-wrap items-center gap-3 text-sm">
            <span><span class="text-gray-500">Requirement:</span> <span class="font-semibold text-gray-800">${s.requirement}</span></span>
            <span><span class="text-gray-500">Project:</span> <span class="font-semibold text-gray-800">${s.project}</span></span>
            <span><span class="text-gray-500">Openings:</span> <span class="font-semibold text-gray-800">${s.openings}</span></span>
            ${Helpers.getStatusBadge(s.status)}
          </div>

          <!-- Candidates table -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
            <div class="table-scroll">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  ${['Employee','Match Score','Interest','Availability','RMG Recommendation','Decision'].map(h => `<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${s.candidates.map((c, i) => `
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="px-4 py-3 font-medium text-gray-800">${c.name}</td>
                    <td class="px-4 py-3 ${Helpers.getMatchScoreColor(c.matchScore)}">${c.matchScore}%</td>
                    <td class="px-4 py-3 ${c.interest === 'Yes' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}">${c.interest}</td>
                    <td class="px-4 py-3 text-gray-600">${c.availability}</td>
                    <td class="px-4 py-3"><span class="text-green-600 font-medium">${c.rmgRecommendation}</span></td>
                    <td class="px-4 py-3">
                      <select id="decision-${i}" class="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option value="Approve" ${c.decision === 'Approve' ? 'selected' : ''}>Approve</option>
                        <option value="Reject" ${c.decision === 'Reject' ? 'selected' : ''}>Reject</option>
                        <option value="Hold" ${c.decision === 'Hold' ? 'selected' : ''}>Hold</option>
                        <option value="Override" ${c.decision === 'Override' ? 'selected' : ''}>Override</option>
                      </select>
                    </td>
                  </tr>`).join('')}
              </tbody>
            </table>
            </div>
          </div>

          <!-- Override comments -->
          <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
            <label class="block text-sm font-medium text-gray-700 mb-2">Override / Comments (if any)</label>
            <textarea id="overrideComments" rows="3" placeholder="Add comments or override justification..."
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
          </div>

          <!-- Legend + Actions -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Highly Suitable (85-100%)</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Suitable (70-84%)</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-orange-400 inline-block"></span> Consider w/ Gaps (50-69%)</span>
            </div>
            <div class="flex gap-3">
              <button onclick="ApprovalController.returnToRMG()" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition">Return to RMG</button>
              <button onclick="ApprovalController.approveShortlist()" class="px-5 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition font-semibold">Approve Shortlist</button>
            </div>
          </div>
        </main>
      </div>`;
  }
};
