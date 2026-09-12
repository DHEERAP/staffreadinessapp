// views/EmployeeDashboardView.js
const EmployeeDashboardView = {
  render(user, stats, breakdown, topOpportunities) {
    const sidebar = SidebarView.render(user, '/dashboard');
    return `
      ${sidebar}
      <div class="ml-56 flex flex-col min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex-1 max-w-md">
            <div class="relative">
              <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" placeholder="Search anything..." class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button class="relative p-2 text-gray-500 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
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
        <main class="flex-1 p-6">
          <div class="mb-6">
            <h1 class="text-xl font-bold text-gray-800">Welcome back, ${user.name.split(' ')[0]}!</h1>
            <p class="text-gray-500 text-sm">Here's your readiness snapshot.</p>
          </div>

          <!-- Stats cards -->
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Profile Completeness <span class="text-blue-500">*</span></p>
              <p class="text-2xl font-bold text-gray-800">${stats.profileCompleteness}%</p>
              <p class="text-xs text-green-600 mt-1 flex items-center gap-1"><span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Good</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Verified Skills <span class="text-blue-500">*</span></p>
              <p class="text-2xl font-bold text-gray-800">${stats.verifiedSkills}</p>
              <p class="text-xs text-green-600 mt-1 flex items-center gap-1"><span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span> +2 this month</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Recommended Opp. <span class="text-blue-500">*</span></p>
              <p class="text-2xl font-bold text-gray-800">${stats.recommendedOpportunities}</p>
              <p class="text-xs text-green-600 mt-1 flex items-center gap-1"><span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span> New opportunities</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Active Interests <span class="text-blue-500">*</span></p>
              <p class="text-2xl font-bold text-gray-800">${stats.activeInterests}</p>
              <p class="text-xs text-blue-600 mt-1 flex items-center gap-1"><span class="w-2 h-2 bg-blue-500 rounded-full inline-block"></span> View status</p>
            </div>
          </div>

          <!-- Bottom section -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Readiness Overview -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Readiness Overview</h3>
              <div class="flex items-center gap-6">
                <!-- Donut chart -->
                <div class="relative w-28 h-28 flex-shrink-0">
                  <svg viewBox="0 0 36 36" class="w-28 h-28 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" stroke-width="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" stroke-width="3" stroke-dasharray="32 68" stroke-dashoffset="0"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="48 52" stroke-dashoffset="-32"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="16 84" stroke-dashoffset="-80"/>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-xl font-bold text-gray-800">${stats.readinessScore}%</span>
                  </div>
                </div>
                <!-- Legend -->
                <div class="space-y-2 text-sm">
                  <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></span><span class="text-gray-600">Highly Suitable</span><span class="ml-auto font-semibold text-gray-800">${breakdown.highlySuitable}</span></div>
                  <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></span><span class="text-gray-600">Suitable</span><span class="ml-auto font-semibold text-gray-800">${breakdown.suitable}</span></div>
                  <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-orange-400 flex-shrink-0"></span><span class="text-gray-600">Consider with Gaps</span><span class="ml-auto font-semibold text-gray-800">${breakdown.considerWithGaps}</span></div>
                  <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-400 flex-shrink-0"></span><span class="text-gray-600">Not Recommended</span><span class="ml-auto font-semibold text-gray-800">${breakdown.notRecommended}</span></div>
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
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.53 15.47 0 12.36 0c-1.73 0-3.24.87-4.19 2.19L7 3 5.83 2.19C4.88.87 3.37 0 1.64 0 .73 0 0 .73 0 1.64c0 .48.11.92.18 1.36H0v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8l2-2h-2zm-8-4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-800">${opp.title}</p>
                        <p class="text-xs text-gray-500">${opp.project}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="${Helpers.getMatchScoreColor(opp.matchScore)} text-sm">${opp.matchScore}%</p>
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
