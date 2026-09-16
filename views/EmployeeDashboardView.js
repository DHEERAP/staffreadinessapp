// views/EmployeeDashboardView.js
const EmployeeDashboardView = {
  render(user, stats, breakdown, topOpportunities) {
    const sidebar = SidebarView.render(user, '/dashboard');
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="hidden sm:block flex-1 max-w-md">
              <div class="relative">
                <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" placeholder="Search anything..." class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p>
                <p class="text-xs text-gray-500">${user.designation}</p>
              </div>
            </div>
          </div>
        </header>

        <!-- Main content -->
        <main class="flex-1 p-4 md:p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-xl font-bold text-gray-800">Welcome back, ${user.name.split(' ')[0]}!</h1>
              <p class="text-gray-500 text-sm">Here's what needs your attention today.</p>
            </div>
            <div class="flex gap-2">
              <button onclick="Router.navigate('/opportunities')" class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">Browse Opportunities</button>
              <button onclick="Router.navigate('/corrections')" class="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition">Request Correction</button>
            </div>
          </div>

          <!-- Action Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300 transition" onclick="Router.navigate('/opportunities')">
              <p class="text-xs text-gray-500 mb-1">New Opportunities</p>
              <p class="text-2xl font-bold text-blue-600">${stats.recommendedOpportunities}</p>
              <p class="text-xs text-blue-500 mt-1">→ Browse now</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-green-300 transition" onclick="Router.navigate('/interests')">
              <p class="text-xs text-gray-500 mb-1">Active Interests</p>
              <p class="text-2xl font-bold text-green-600">${stats.activeInterests}</p>
              <p class="text-xs text-green-500 mt-1">→ Track status</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-orange-300 transition" onclick="Router.navigate('/applications')">
              <p class="text-xs text-gray-500 mb-1">My Applications</p>
              <p class="text-2xl font-bold text-orange-500">3</p>
              <p class="text-xs text-orange-500 mt-1">→ View progress</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-purple-300 transition" onclick="Router.navigate('/corrections')">
              <p class="text-xs text-gray-500 mb-1">Pending Corrections</p>
              <p class="text-2xl font-bold text-purple-600">1</p>
              <p class="text-xs text-purple-500 mt-1">→ Check status</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Readiness Overview -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">My Readiness Overview</h3>
              <div class="flex items-center gap-6">
                <div class="relative w-28 h-28 flex-shrink-0">
                  <svg viewBox="0 0 36 36" class="w-28 h-28 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" stroke-width="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" stroke-width="3" stroke-dasharray="32 68" stroke-dashoffset="0"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="48 52" stroke-dashoffset="-32"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="16 84" stroke-dashoffset="-80"/>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-xl font-bold text-gray-800">${stats.readinessScore}%</span>
                    <span class="text-xs text-gray-400">Score</span>
                  </div>
                </div>
                <div class="space-y-2 text-sm flex-1">
                  <div class="flex items-center justify-between"><span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-500"></span>Highly Suitable</span><span class="font-semibold">${breakdown.highlySuitable}</span></div>
                  <div class="flex items-center justify-between"><span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-500"></span>Suitable</span><span class="font-semibold">${breakdown.suitable}</span></div>
                  <div class="flex items-center justify-between"><span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-orange-400"></span>Consider with Gaps</span><span class="font-semibold">${breakdown.considerWithGaps}</span></div>
                  <div class="flex items-center justify-between"><span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-400"></span>Not Recommended</span><span class="font-semibold">${breakdown.notRecommended}</span></div>
                  <a href="#/profile" class="block text-xs text-blue-600 hover:underline mt-2">View full profile →</a>
                </div>
              </div>
            </div>

            <!-- Top Recommended Opportunities -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-800">Top Recommended Opportunities</h3>
                <a href="#/opportunities" class="text-blue-600 text-xs hover:underline">View All</a>
              </div>
              <div class="space-y-3">
                ${topOpportunities.map(opp => `
                  <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer" onclick="Router.navigate('/opportunities')">
                    <div>
                      <p class="text-sm font-medium text-gray-800">${opp.title}</p>
                      <p class="text-xs text-gray-500">${opp.project}</p>
                    </div>
                    <div class="text-right">
                      <p class="${Helpers.getMatchScoreColor(opp.matchScore)} text-sm font-bold">${opp.matchScore}%</p>
                      ${Helpers.getSuitabilityBadge(opp.suitability)}
                    </div>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </main>
      </div>`;
  }
};
