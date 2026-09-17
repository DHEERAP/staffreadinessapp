// views/MatchingResultsView.js
const MatchingResultsView = {
  render(user, stats, results, req, allReqs, selectedTech = 'all') {
    const sidebar = SidebarView.render(user, '/matching');
    const projects = [...new Set((allReqs || []).map(r => r.projectName))];
    const roles = [...new Set((allReqs || []).map(r => r.requiredRole))];
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="hidden sm:block text-sm">${Helpers.getBreadcrumb(['Dashboard', 'Staffing Requirements', req ? req.requiredRole : 'Matches', 'Matches'])}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6">
          <div class="mb-4">
            <h1 class="text-lg font-bold text-gray-800">Matching Results</h1>
            <p class="text-sm text-gray-500 mt-1">Project: <span class="font-semibold text-gray-800">${req ? req.projectName : '-'}</span> · Role: <span class="font-semibold text-gray-800">${req ? req.requiredRole : '-'}</span></p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            ${[['Candidates Evaluated', stats.candidatesEvaluated, 'text-gray-800'], ['Eligible Candidates', stats.eligibleCandidates, 'text-gray-800'], ['Interested Employees', stats.interestedEmployees, 'text-gray-800'], ['Shortlisted', `${stats.shortlisted}/${stats.totalRequired}`, stats.shortlisted > 0 ? 'text-green-600' : 'text-gray-800']].map(([label, val, cls]) => `
              <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p class="text-xs text-gray-500 mb-1">${label}</p>
                <p class="text-2xl font-bold ${cls}">${val}</p>
              </div>`).join('')}
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
            <div class="flex items-center gap-3 flex-wrap">
              <span class="text-sm text-gray-500 font-medium">Filters:</span>
              <select id="filterProject" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 bg-white">
                <option value="all">All Projects</option>
                ${projects.map(pn => `<option value="${pn}" ${req && req.projectName === pn ? 'selected' : ''}>${pn}</option>`).join('')}
              </select>
              <select id="filterTech" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 bg-white">
                <option value="all">All TechStacks</option>
                ${((req && req.skills) ? req.skills : [...new Set((allReqs||[]).flatMap(r => r.skills || []))]).map(s => `<option value="${s}" ${selectedTech === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
              <button onclick="MatchingController.runAgain()" class="ml-auto px-4 py-1.5 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50 font-medium">Run Again</button>
            </div>
            <div class="mt-2 text-xs text-gray-500">Active requirement: ${req ? req.id + ' — ' + req.requiredRole : 'None'}</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="table-scroll">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  ${['','Rank','Employee','Match Score','Confidence','Interest','Availability','Suitability','Action'].map(h => `<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody id="matchingTableBody">
                ${results.map(r => this.renderRow(r)).join('')}
              </tbody>
            </table>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-4">
            <button onclick="MatchingController.addToShortlist(event)" class="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Add to Shortlist</button>
            <button onclick="MatchingController.exportResults()" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Export</button>
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
        <td class="px-4 py-3"><input type="checkbox" class="match-select" value="${r.employeeId}" ${r.shortlisted ? 'disabled' : ''}/></td>
        <td class="px-4 py-3 text-gray-600">${r.rank}</td>
        <td class="px-4 py-3 font-medium text-gray-800">${r.name}</td>
        <td class="px-4 py-3 ${scoreColor}">${r.matchScore}%</td>
        <td class="px-4 py-3 ${confClass}">${r.confidence}</td>
        <td class="px-4 py-3 ${intColor}">${r.interest}</td>
        <td class="px-4 py-3 text-gray-600">${r.availability}</td>
        <td class="px-4 py-3">${Helpers.getSuitabilityBadge(r.suitability)}</td>
        <td class="px-4 py-3">
          ${r.shortlisted
            ? `<div class="flex items-center gap-2"><button class="px-2 py-1 text-xs bg-green-50 text-green-700 rounded" disabled>Shortlisted</button><button onclick="MatchingController.removeOne(event, ${r.employeeId})" class="px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100">Remove</button></div>`
            : `<button onclick="MatchingController.addOne(event, ${r.employeeId})" class="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100">Add</button>`}
        </td>
      </tr>`;
  }
};
