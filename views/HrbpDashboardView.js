// views/HrbpDashboardView.js
const HrbpDashboardView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/dashboard');
    const allCr = CorrectionModel.getAll();
    const newRequests = allCr.filter(r => r.tab === 'new').length;
    const underReview = allCr.filter(r => r.tab === 'under_review').length;
    const appeals = allCr.filter(r => r.tab === 'appeals').length;
    const overdue = allCr.filter(r => r.slaStatus === 'Overdue').length;
    const recentRequests = allCr.filter(r => r.tab === 'new').slice(0, 3);

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="hidden sm:block">
              <div class="relative">
                <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" placeholder="Search employees..." class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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

        <main class="flex-1 p-4 md:p-6">
          <div class="mb-6">
            <h1 class="text-xl font-bold text-gray-800">Welcome back, ${user.name.split(' ')[0]}!</h1>
            <p class="text-gray-500 text-sm">Workforce data quality & governance overview.</p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300" onclick="Router.navigate('/corrections')">
              <p class="text-xs text-gray-500 mb-1">New Requests</p>
              <p class="text-2xl font-bold text-gray-800">${newRequests}</p>
              <p class="text-xs text-blue-600 mt-1">Awaiting review</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300" onclick="Router.navigate('/corrections')">
              <p class="text-xs text-gray-500 mb-1">Under Review</p>
              <p class="text-2xl font-bold text-orange-500">${underReview}</p>
              <p class="text-xs text-orange-500 mt-1">In progress</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300" onclick="Router.navigate('/corrections')">
              <p class="text-xs text-gray-500 mb-1">Appeals</p>
              <p class="text-2xl font-bold text-purple-600">${appeals}</p>
              <p class="text-xs text-purple-600 mt-1">Needs decision</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300" onclick="Router.navigate('/corrections')">
              <p class="text-xs text-gray-500 mb-1">SLA Overdue</p>
              <p class="text-2xl font-bold text-red-600">${overdue}</p>
              <p class="text-xs text-red-600 mt-1">Urgent action needed</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Recent Correction Requests -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-800">Recent Correction Requests</h3>
                <a href="#/corrections" class="text-blue-600 text-xs hover:underline">View All</a>
              </div>
              <div class="space-y-3">
                ${recentRequests.map(r => `
                  <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p class="text-sm font-medium text-gray-800">${r.employeeName}</p>
                      <p class="text-xs text-gray-500">${r.id} · ${r.type} · ${r.submittedOn}</p>
                    </div>
                    <div class="text-right">
                      <span class="text-xs font-medium ${r.slaColor === 'red' ? 'text-red-600' : 'text-green-600'}">${r.slaStatus}</span>
                      <p class="text-xs text-gray-500 mt-0.5">${r.status}</p>
                    </div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Data Quality Summary -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-800">Workforce Data Quality</h3>
                <a href="#/reports" class="text-blue-600 text-xs hover:underline">Full Report</a>
              </div>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600">Profile Completeness</span>
                    <span class="font-semibold text-gray-800">82%</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width:82%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600">Verified Skills Coverage</span>
                    <span class="font-semibold text-gray-800">67%</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width:67%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600">Correction Resolution Rate</span>
                    <span class="font-semibold text-gray-800">74%</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-400 h-2 rounded-full" style="width:74%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600">SLA Compliance</span>
                    <span class="font-semibold text-red-600">61%</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-red-400 h-2 rounded-full" style="width:61%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>`;
  }
};
