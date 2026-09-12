// views/MatchingResultsView.js
const MatchingResultsView = {
  render(user, stats, results) {
    const sidebar = SidebarView.render(user, '/matching');
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="hidden sm:block text-sm">${Helpers.getBreadcrumb(['Dashboard', 'Staffing Requirements', 'Java Backend Developer', 'Matches'])}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6">
          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            ${[['Candidates Evaluated', stats.candidatesEvaluated, 'text-gray-800'], ['Eligible Candidates', stats.eligibleCandidates, 'text-gray-800'], ['Interested Employees', stats.interestedEmployees, 'text-gray-800'], [`Shortlisted`, `${stats.shortlisted}/${stats.totalRequired}`, stats.shortlisted > 0 ? 'text-green-600' : 'text-gray-800']].map(([label, val, cls]) => `
              <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p class="text-xs text-gray-500 mb-1">${label}</p>
                <p class="text-2xl font-bold ${cls}">${val}</p>
              </div>`).join('')}
          </div>

          <!-- Filters -->
          <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
            <div class="flex items-center gap-3 flex-wrap">
              <span class="text-sm text-gray-500 font-medium">Filters:</span>
              ${['Location', 'Experience', 'Availability', 'Interest', 'Confidence'].map(f => `
                <select id="filter${f}" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>${f}</option>
                  <option value="all">All</option>
                </select>`).join('')}
              <div class="ml-auto flex items-center gap-2">
                <button class="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
                <button onclick="MatchingController.runAgain()" class="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition font-medium">Run Again</button>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="table-scroll">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  ${['Rank','Employee','Match Score','Confidence','Interest','Availability','Suitability','Action'].map(h => `<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody id="matchingTableBody">
                ${results.map(r => this.renderRow(r)).join('')}
              </tbody>
            </table>
            </div>
          </div>

          <!-- Bottom actions -->
          <div class="flex justify-end gap-3 mt-4">
            <button onclick="MatchingController.compare()" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition">Compare</button>
            <button onclick="MatchingController.addToShortlist()" class="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">Add to Shortlist</button>
            <button onclick="MatchingController.exportResults()" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition">Export</button>
          </div>
        </main>
      </div>`;
  },

  renderRow(r) {
    const scoreColor = Helpers.getMatchScoreColor(r.matchScore);
    const confClass = Helpers.getConfidenceClass(r.confidence);
    const intColor = r.interest === 'Yes' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold';
    return `
      <tr class="border-b border-gray-100 hover:bg-gray-50 transition ${r.shortlisted ? 'bg-green-50' : ''}">
        <td class="px-4 py-3 text-gray-600">${r.rank}</td>
        <td class="px-4 py-3 font-medium text-gray-800">${r.name}</td>
        <td class="px-4 py-3 ${scoreColor}">${r.matchScore}%</td>
        <td class="px-4 py-3 ${confClass}">${r.confidence}</td>
        <td class="px-4 py-3 ${intColor}">${r.interest}</td>
        <td class="px-4 py-3 text-gray-600">${r.availability}</td>
        <td class="px-4 py-3">${Helpers.getSuitabilityBadge(r.suitability)}</td>
        <td class="px-4 py-3">
          <button onclick="MatchingController.viewProfile(${r.employeeId})" class="text-gray-400 hover:text-blue-600 transition" title="View Profile">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </td>
      </tr>`;
  }
};
