// views/OpportunityDetailView.js
const OpportunityDetailView = {
  render(user, opp) {
    const sidebar = SidebarView.render(user, '/opportunities');
    const rb = opp.readinessBreakdown;
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <button onclick="Router.navigate('/opportunities')" class="flex items-center gap-2 text-blue-600 text-sm hover:underline">
              ← Back to Opportunities
            </button>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">Hello, ${user.name.split(' ')[0]}</p><p class="text-xs text-gray-500">${user.designation}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6">
          <!-- Title row -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h1 class="text-xl font-bold text-gray-800">${opp.title}</h1>
              <p class="text-gray-500 text-sm">${opp.project}</p>
              <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>📍 ${opp.location}</span>
                <span>👥 ${opp.openings} Openings</span>
                <span>⏱ ${opp.experience}</span>
                <span>📅 Start: ${opp.startDate}</span>
              </div>
            </div>
            ${Helpers.getSuitabilityBadge(opp.suitability)}
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-gray-200 mb-5">
            ${['Overview','Requirements','Readiness Breakdown','Project Details'].map((tab, i) => `
              <button onclick="OpportunityDetailView.switchTab(${i})" id="tab-${i}"
                class="px-4 py-2 text-sm font-medium border-b-2 transition tab-btn ${i === 2 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}">
                ${tab}
              </button>`).join('')}
          </div>

          <!-- Tab content -->
          <div id="tab-content-0" class="tab-content hidden">
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p class="text-gray-700 text-sm">${opp.description}</p>
              <div class="mt-4">
                <p class="text-sm font-semibold text-gray-700 mb-2">Required Skills:</p>
                <div class="flex flex-wrap gap-2">${opp.skills.map(s => `<span class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">${s}</span>`).join('')}</div>
              </div>
            </div>
          </div>

          <div id="tab-content-1" class="tab-content hidden">
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div><p class="text-gray-500">Min Experience</p><p class="font-semibold text-gray-800">${opp.experience}</p></div>
                <div><p class="text-gray-500">Certification</p><p class="font-semibold text-gray-800">${opp.certification || 'Not Required'}</p></div>
                <div><p class="text-gray-500">Work Mode</p><p class="font-semibold text-gray-800">${opp.workMode}</p></div>
                <div><p class="text-gray-500">Openings</p><p class="font-semibold text-gray-800">${opp.openings}</p></div>
              </div>
            </div>
          </div>

          <div id="tab-content-2" class="tab-content">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left: Score -->
              <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 class="font-semibold text-gray-800 mb-4">Your Readiness Score</h3>
                <div class="flex items-center gap-5">
                  <div class="relative w-28 h-28 flex-shrink-0">
                    <svg viewBox="0 0 36 36" class="w-28 h-28 -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" stroke-width="3"/>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" stroke-width="3"
                        stroke-dasharray="${opp.matchScore} ${100 - opp.matchScore}" stroke-dashoffset="0"/>
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                      <span class="text-xl font-bold text-gray-800">${opp.matchScore}%</span>
                    </div>
                  </div>
                  <div>
                    ${Helpers.getSuitabilityBadge(opp.suitability)}
                    <p class="text-xs text-green-600 mt-2 flex items-center gap-1"><span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Confidence: ${opp.confidence}</p>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="text-sm font-semibold text-gray-700 mb-2">Why is this recommended?</p>
                  <ul class="space-y-1">${opp.whyRecommended.map(r => `<li class="flex items-start gap-2 text-xs text-gray-600"><span class="text-green-500 mt-0.5">✓</span>${r}</li>`).join('')}</ul>
                </div>
              </div>
              <!-- Right: Breakdown -->
              <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 class="font-semibold text-gray-800 mb-4">Readiness Breakdown</h3>
                <div class="space-y-3">
                  ${[['Skill Match', rb.skillMatch, 'bg-blue-600'], ['Verified Skills', rb.verifiedSkills, 'bg-blue-600'], ['Relevant Experience', rb.relevantExperience, 'bg-blue-600'], ['Availability', rb.availability, 'bg-green-500'], ['Employee Interest', rb.employeeInterest, 'bg-blue-600']].map(([label, val, color]) => `
                    <div>
                      <div class="flex justify-between text-xs text-gray-600 mb-1"><span>${label}</span><span class="font-semibold">${val}%</span></div>
                      <div class="w-full bg-gray-100 rounded-full h-2"><div class="${color} h-2 rounded-full transition-all" style="width:${val}%"></div></div>
                    </div>`).join('')}
                </div>
                <div class="mt-4">
                  <p class="text-sm font-semibold text-gray-700 mb-2">Identified Gaps</p>
                  <ul class="space-y-1">${opp.identifiedGaps.map(g => `<li class="flex items-start gap-2 text-xs text-gray-600"><span class="text-orange-500 mt-0.5">●</span>${g}</li>`).join('')}</ul>
                </div>
              </div>
            </div>
          </div>

          <div id="tab-content-3" class="tab-content hidden">
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div><p class="text-gray-500">Project Name</p><p class="font-semibold text-gray-800">${opp.project}</p></div>
                <div><p class="text-gray-500">Start Date</p><p class="font-semibold text-gray-800">${opp.startDate}</p></div>
                <div><p class="text-gray-500">Location</p><p class="font-semibold text-gray-800">${opp.location}</p></div>
                <div><p class="text-gray-500">Openings</p><p class="font-semibold text-gray-800">${opp.openings}</p></div>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex justify-end gap-3 mt-6">
            <button onclick="OpportunityController.saveOpportunity(${opp.id})" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition">Save Opportunity</button>
            <button onclick="OpportunityController.expressInterest(${opp.id})" class="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">Express Interest</button>
          </div>
        </main>
      </div>`;
  },

  switchTab(idx) {
    document.querySelectorAll('.tab-content').forEach((el, i) => {
      if (i === idx) { el.classList.remove('hidden'); }
      else { el.classList.add('hidden'); }
    });
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
      if (i === idx) {
        btn.classList.add('border-blue-600', 'text-blue-600');
        btn.classList.remove('border-transparent', 'text-gray-500');
      } else {
        btn.classList.remove('border-blue-600', 'text-blue-600');
        btn.classList.add('border-transparent', 'text-gray-500');
      }
    });
  }
};
