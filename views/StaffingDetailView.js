// views/StaffingDetailView.js
const StaffingDetailView = {
  render(user, req) {
    const sidebar = SidebarView.render(user, '/opportunities');
    const skills = (req.skills || []).join(', ') || '-';
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <button onclick="Router.navigate('/opportunities')" class="text-blue-600 text-sm hover:underline">Back to Staffing Requirements</button>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">${user.name}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6 max-w-3xl">
          <h1 class="text-xl font-bold text-gray-800 mb-1">${req.projectName}</h1>
          <p class="text-gray-500 text-sm mb-6">${req.id} · ${Helpers.getStatusBadge(req.status)}</p>
          <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4 text-sm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><p class="text-gray-500">Project Name</p><p class="font-semibold text-gray-800">${req.projectName}</p></div>
              <div><p class="text-gray-500">Role</p><p class="font-semibold text-gray-800">${req.requiredRole}</p></div>
              <div><p class="text-gray-500">Start Date</p><p class="font-semibold text-gray-800">${req.startDate}</p></div>
              <div><p class="text-gray-500">Number of Requirements</p><p class="font-semibold text-gray-800">${req.noOfResources}</p></div>
              <div><p class="text-gray-500">Location / Work Mode</p><p class="font-semibold text-gray-800">${req.location || '-'}</p></div>
              <div><p class="text-gray-500">Min Experience</p><p class="font-semibold text-gray-800">${req.minExperience != null ? req.minExperience + ' years' : '-'}</p></div>
              <div><p class="text-gray-500">Certification</p><p class="font-semibold text-gray-800">${req.certification || '-'}</p></div>
              <div><p class="text-gray-500">Employee Segment</p><p class="font-semibold text-gray-800">${req.employeeSegment || '-'}</p></div>
            </div>
            <div><p class="text-gray-500">Required Skill Set</p><p class="font-semibold text-gray-800">${skills}</p></div>
            <div><p class="text-gray-500">Project Description</p><p class="font-medium text-gray-800">${req.projectDescription || '-'}</p></div>
          </div>
          ${user.role === 'rmg' ? `<button onclick="StaffingController.currentReqId='${req.id}'; Router.navigate('/matching')" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">View Matching Results</button>` : ''}
        </main>
      </div>`;
  }
};
