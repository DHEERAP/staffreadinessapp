// views/OpportunitiesView.js
const OpportunitiesView = {
  render(user, opportunities) {
    const sidebar = SidebarView.render(user, '/opportunities');
    const cards = opportunities.length > 0 ? opportunities.map(opp => this.renderCard(opp, user)).join('') : `<div class="col-span-full text-center py-16 text-gray-400"><p>No opportunities found.</p></div>`;
    return `
      ${sidebar}
      <div class="ml-56 flex flex-col min-h-screen bg-gray-50">
        ${this.renderHeader(user)}
        <main class="flex-1 p-6">
          <div class="mb-2">
            <h1 class="text-lg font-bold text-gray-800">Recommended Opportunities</h1>
            <p class="text-gray-500 text-xs">Based on your skills, experience &amp; interests</p>
          </div>
          <!-- Filters -->
          <div class="flex items-center gap-3 mb-5 flex-wrap">
            <select id="filterAll" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">All</option>
            </select>
            <select id="filterLocation" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">Location</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="pune">Pune</option>
              <option value="mumbai">Mumbai</option>
            </select>
            <select id="filterRole" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">Role</option>
              <option value="java">Java Backend</option>
              <option value="full stack">Full Stack</option>
              <option value="data">Data Engineer</option>
              <option value="devops">DevOps</option>
            </select>
            <select id="filterWorkMode" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="all">Work Mode</option>
              <option value="hybrid">Hybrid</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>
          <!-- Opportunity list -->
          <div id="opportunityList" class="space-y-3">${cards}</div>
        </main>
      </div>`;
  },

  renderCard(opp, user) {
    const scoreColor = Helpers.getMatchScoreColor(opp.matchScore);
    return `
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 flex-1">
            <div class="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.53 15.47 0 12.36 0c-1.73 0-3.24.87-4.19 2.19L7 3 5.83 2.19C4.88.87 3.37 0 1.64 0 .73 0 0 .73 0 1.64c0 .48.11.92.18 1.36H0v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8l2-2h-2z"/></svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">${opp.title}</p>
              <p class="text-xs text-gray-500">${opp.project}</p>
              <div class="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span>📍 ${opp.location}</span>
                <span>⏱ ${opp.experience}</span>
                <span>📅 Available from ${opp.startDate}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="${scoreColor} text-lg">${opp.matchScore}%</p>
              ${Helpers.getSuitabilityBadge(opp.suitability)}
            </div>
            <div class="flex gap-2">
              <button onclick="OpportunityController.viewDetails(${opp.id})" class="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg text-xs hover:bg-gray-50 transition">View Details</button>
              <button onclick="OpportunityController.expressInterest(${opp.id})" class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition express-btn-${opp.id}">Express Interest</button>
            </div>
          </div>
        </div>
      </div>`;
  },

  renderHeader(user) {
    return `
      <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div class="flex-1 max-w-md">
          <div class="relative">
            <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input id="searchOpportunities" type="text" placeholder="Search anything..." class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="relative p-2 text-gray-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg></button>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </div>
      </header>`;
  },

  updateList(opportunities, user) {
    const container = document.getElementById('opportunityList');
    if (!container) return;
    if (opportunities.length === 0) { Helpers.showEmpty('opportunityList', 'No opportunities match your filters.'); return; }
    container.innerHTML = opportunities.map(opp => this.renderCard(opp, user)).join('');
  }
};
