// views/InterestDashboardView.js
const InterestDashboardView = {
  render(user, data) {
    const sidebar = SidebarView.render(user, '/interest-dashboard');
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="hidden sm:block text-sm">${Helpers.getBreadcrumb(['Dashboard', 'Interests', 'All Opportunities'])}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6">
          <h1 class="text-lg font-bold text-gray-800 mb-5">Interest Dashboard <span class="text-gray-500 font-normal text-base">(RMG View)</span></h1>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="table-scroll">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  ${['Opportunity','Total Interested','Highly Suitable','Suitable','Consider w/ Gaps','Action'].map(h => `<th class="px-5 py-3 text-left text-xs font-semibold text-gray-600">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${data.map(row => `
                  <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td class="px-5 py-4 font-medium text-gray-800">${row.opportunity}</td>
                    <td class="px-5 py-4 text-gray-700 font-semibold">${row.totalInterested}</td>
                    <td class="px-5 py-4 text-green-600 font-semibold">${row.highlySuitable}</td>
                    <td class="px-5 py-4 text-blue-600 font-semibold">${row.suitable}</td>
                    <td class="px-5 py-4 text-orange-500 font-semibold">${row.considerWithGaps}</td>
                    <td class="px-5 py-4">
                      <button onclick="InterestController.viewDetails('${row.requirementId}')" class="text-blue-500 hover:text-blue-700 transition" title="View Details">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                    </td>
                  </tr>`).join('')}
              </tbody>
            </table>
            </div>
          </div>
        </main>
      </div>`;
  }
};
