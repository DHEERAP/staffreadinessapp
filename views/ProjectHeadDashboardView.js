// views/ProjectHeadDashboardView.js
const ProjectHeadDashboardView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/dashboard');
    const myReqs = StaffingModel.getAll().filter(r => r.createdBy === user.employeeId);
    const pendingList = StaffingModel.getProjectHeadShortlists(user.employeeId || user.employeeId);
    const pendingApproval = pendingList.length;
    const totalOpenings = myReqs.reduce((s, r) => s + r.noOfResources, 0);
    const approved = myReqs.filter(r => r.status === 'Approved').length;

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <nav class="hidden sm:flex items-center gap-1 text-sm text-gray-500">
              <span class="font-medium text-gray-800">Dashboard</span>
            </nav>
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
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-xl font-bold text-gray-800">Welcome back, ${user.name.split(' ')[0]}!</h1>
              <p class="text-gray-500 text-sm">Manage your staffing requirements and approvals.</p>
            </div>
            <button onclick="Router.navigate('/create-staffing')" class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium">+ New Requirement</button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300" onclick="Router.navigate('/opportunities')">
              <p class="text-xs text-gray-500 mb-1">My Requirements</p>
              <p class="text-2xl font-bold text-gray-800">${myReqs.length}</p>
              <p class="text-xs text-blue-600 mt-1">Total raised</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-blue-300" onclick="Router.navigate('/opportunities')">
              <p class="text-xs text-gray-500 mb-1">Total Openings</p>
              <p class="text-2xl font-bold text-gray-800">${totalOpenings}</p>
              <p class="text-xs text-gray-500 mt-1">Across projects</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-orange-300" onclick="Router.navigate('/approve-shortlist')">
              <p class="text-xs text-gray-500 mb-1">Pending Approval</p>
              <p class="text-2xl font-bold text-orange-500">${pendingApproval}</p>
              <p class="text-xs text-orange-500 mt-1">Awaiting review</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:border-green-300" onclick="Router.navigate('/opportunities')">
              <p class="text-xs text-gray-500 mb-1">Approved</p>
              <p class="text-2xl font-bold text-green-600">${approved}</p>
              <p class="text-xs text-green-600 mt-1">Fulfilled</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- My Requirements -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-800">My Staffing Requirements</h3>
                <button onclick="Router.navigate('/create-staffing')" class="text-blue-600 text-xs hover:underline">+ Create New</button>
              </div>
              <div class="space-y-3">
                ${myReqs.map(r => `
                  <div class="p-3 rounded-lg bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100" onclick="StaffingController.showStaffingDetail('${r.id}')">
                    <div class="flex items-center justify-between mb-1">
                      <p class="text-sm font-medium text-gray-800">${r.requiredRole}</p>
                      <span class="text-xs px-2 py-0.5 rounded-full font-medium ${r.status === 'Approved' ? 'bg-green-100 text-green-700' : r.status === 'Draft' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700'}">${r.status}</span>
                    </div>
                    <p class="text-xs text-gray-500">${r.projectName}</p>
                    <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>${r.noOfResources} openings</span>
                      <span>${r.startDate}</span>
                      <span>${r.location}</span>
                    </div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Pending Approvals -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-800">Pending Approvals</h3>
                <a href="#/approve-shortlist" class="text-blue-600 text-xs hover:underline">Review All</a>
              </div>
              ${pendingList.length === 0 ? `<p class="text-sm text-gray-400 text-center py-6">No pending approvals</p>` :
                pendingList.map(s => `
                  <div class="p-3 rounded-lg bg-orange-50 border border-orange-100 mb-3">
                    <div class="flex items-center justify-between mb-1">
                      <p class="text-sm font-medium text-gray-800">${s.requirement}</p>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">${s.status}</span>
                    </div>
                    <p class="text-xs text-gray-500">${s.project} · ${s.openings} openings</p>
                    <p class="text-xs text-gray-500 mt-1">${s.candidates.length} candidates shortlisted by RMG</p>
                    <button onclick="Router.navigate('/approve-shortlist')" class="mt-2 text-xs text-blue-600 hover:underline font-medium">Review Shortlist</button>
                  </div>`).join('')}
            </div>
          </div>
        </main>
      </div>`;
  }
};
