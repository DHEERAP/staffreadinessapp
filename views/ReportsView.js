// views/ReportsView.js
const ReportsView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/reports');
    const deptData = [
      { dept: 'Engineering', total: 120, complete: 98, verified: 74, corrections: 8 },
      { dept: 'Data & Analytics', total: 45, complete: 38, verified: 28, corrections: 3 },
      { dept: 'DevOps', total: 30, complete: 22, verified: 18, corrections: 5 },
      { dept: 'QA', total: 25, complete: 20, verified: 12, corrections: 2 }
    ];

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h2 class="text-base font-semibold text-gray-800">Workforce Reports</h2>
          </div>
          <div class="flex items-center gap-3">
            <button class="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50">Export CSV</button>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
              <div>
                <p class="text-sm font-medium text-gray-800">${user.name}</p>
                <p class="text-xs text-gray-500">${user.designation}</p>
              </div>
            </div>
          </div>
        </header>
        <main class="flex-1 p-6">
          <div class="mb-6">
            <h1 class="text-xl font-bold text-gray-800">Workforce Data Quality Reports</h1>
            <p class="text-gray-500 text-sm">Profile completeness, skill validation & correction trends.</p>
          </div>

          <!-- KPI Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Total Employees</p>
              <p class="text-2xl font-bold text-gray-800">220</p>
              <p class="text-xs text-blue-600 mt-1">Across all depts</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Avg Profile Completeness</p>
              <p class="text-2xl font-bold text-green-600">82%</p>
              <p class="text-xs text-green-600 mt-1">↑ 3% this month</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Verified Skills Coverage</p>
              <p class="text-2xl font-bold text-blue-600">67%</p>
              <p class="text-xs text-gray-500 mt-1">Of total skills</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Open Corrections</p>
              <p class="text-2xl font-bold text-orange-500">18</p>
              <p class="text-xs text-red-500 mt-1">3 overdue</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Department-wise Table -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Department-wise Profile Completeness</h3>
              <table class="w-full text-sm">
                <thead>
                  <tr class="text-xs text-gray-500 border-b border-gray-100">
                    <th class="text-left pb-2">Department</th>
                    <th class="text-center pb-2">Total</th>
                    <th class="text-center pb-2">Complete</th>
                    <th class="text-center pb-2">%</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  ${deptData.map(d => `
                    <tr>
                      <td class="py-2 text-gray-800">${d.dept}</td>
                      <td class="py-2 text-center text-gray-600">${d.total}</td>
                      <td class="py-2 text-center text-gray-600">${d.complete}</td>
                      <td class="py-2 text-center font-semibold ${Math.round(d.complete/d.total*100) >= 80 ? 'text-green-600' : 'text-orange-500'}">${Math.round(d.complete/d.total*100)}%</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>

            <!-- Correction Trends -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Correction Request Trends</h3>
              <div class="space-y-3">
                ${[
                  { label: 'Skill Corrections', count: 8, color: 'bg-blue-500', pct: 44 },
                  { label: 'Certification Updates', count: 5, color: 'bg-green-500', pct: 28 },
                  { label: 'Experience Corrections', count: 3, color: 'bg-orange-400', pct: 17 },
                  { label: 'Other', count: 2, color: 'bg-gray-400', pct: 11 }
                ].map(t => `
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-600">${t.label}</span>
                      <span class="font-semibold text-gray-800">${t.count} requests</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="${t.color} h-2 rounded-full" style="width:${t.pct}%"></div>
                    </div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- SLA Compliance -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 md:col-span-2">
              <h3 class="font-semibold text-gray-800 mb-4">SLA Compliance Summary</h3>
              <div class="grid grid-cols-4 gap-4 text-center">
                ${[
                  { label: 'Within SLA', count: 11, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'At Risk (1-2 days)', count: 4, color: 'text-orange-500', bg: 'bg-orange-50' },
                  { label: 'Overdue', count: 3, color: 'text-red-600', bg: 'bg-red-50' },
                  { label: 'Closed', count: 12, color: 'text-gray-600', bg: 'bg-gray-50' }
                ].map(s => `
                  <div class="${s.bg} rounded-xl p-4">
                    <p class="text-2xl font-bold ${s.color}">${s.count}</p>
                    <p class="text-xs text-gray-500 mt-1">${s.label}</p>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </main>
      </div>`;
  }
};
