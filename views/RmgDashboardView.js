// views/RmgDashboardView.js
const RmgDashboardView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/dashboard');
    const reqs = StaffingModel.getAll();
    const totalReqs = reqs.length;
    const activeReqs = reqs.filter(r => r.status === 'Submitted to RMG').length;
    const approvedReqs = reqs.filter(r => r.status === 'Approved').length;
    const totalCandidatesEvaluated = reqs.reduce((s, r) => s + (r.matchingStats?.candidatesEvaluated || 0), 0);

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
                <input type="text" placeholder="Search requirements..." class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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
            <p class="text-gray-500 text-sm">Here's your staffing pipeline overview.</p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300" onclick="Router.navigate('/opportunities')">
              <p class="text-xs text-gray-500 mb-1">Total Requirements</p>
              <p class="text-2xl font-bold text-gray-800">${totalReqs}</p>
              <p class="text-xs text-blue-600 mt-1">All active</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-orange-300" onclick="Router.navigate('/opportunities')">
              <p class="text-xs text-gray-500 mb-1">Pending Review</p>
              <p class="text-2xl font-bold text-orange-500">${activeReqs}</p>
              <p class="text-xs text-orange-500 mt-1">Needs attention</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-green-300" onclick="Router.navigate('/opportunities')">
              <p class="text-xs text-gray-500 mb-1">Approved</p>
              <p class="text-2xl font-bold text-green-600">${approvedReqs}</p>
              <p class="text-xs text-green-600 mt-1">Completed</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300" onclick="Router.navigate('/matching')">
              <p class="text-xs text-gray-500 mb-1">Candidates Evaluated</p>
              <p class="text-2xl font-bold text-gray-800">${totalCandidatesEvaluated}</p>
              <p class="text-xs text-gray-500 mt-1">Across all reqs</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Staffing Requirements -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-800">Staffing Requirements</h3>
                <a href="#/matching" class="text-blue-600 text-xs hover:underline">View Matches</a>
              </div>
              <div class="space-y-3">
                ${reqs.map(r => `
                  <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100" onclick="StaffingController.showStaffingDetail('${r.id}')">
                    <div>
                      <p class="text-sm font-medium text-gray-800">${r.requiredRole}</p>
                      <p class="text-xs text-gray-500">${r.projectName} · ${r.noOfResources} openings</p>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full font-medium ${r.status === 'Approved' ? 'bg-green-100 text-green-700' : r.status === 'Draft' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700'}">${r.status}</span>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Interest Overview -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-800">Interest Overview</h3>
                <a href="#/interest-dashboard" class="text-blue-600 text-xs hover:underline">View All</a>
              </div>
              <table class="w-full text-sm">
                <thead>
                  <tr class="text-xs text-gray-500 border-b border-gray-100">
                    <th class="text-left pb-2">Opportunity</th>
                    <th class="text-center pb-2">Interested</th>
                    <th class="text-center pb-2">Highly Suitable</th>
                    <th class="text-center pb-2">Suitable</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  ${INTEREST_DASHBOARD.map(i => `
                    <tr class="cursor-pointer hover:bg-gray-50" onclick="Router.navigate('/interest-dashboard')">
                      <td class="py-2 text-gray-800 font-medium">${i.opportunity}</td>
                      <td class="py-2 text-center text-gray-700">${i.totalInterested}</td>
                      <td class="py-2 text-center text-green-600 font-semibold">${i.highlySuitable}</td>
                      <td class="py-2 text-center text-blue-600">${i.suitable}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>`;
  }
};
