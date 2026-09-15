// views/MyProfileView.js
const MyProfileView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/profile');
    const emp = EMPLOYEES.find(e => e.id === user.id) || {};
    const skills = emp.skills || ['Java', 'Spring Boot', 'REST APIs', 'Microservices'];
    // const verifiedSkills = emp.verifiedSkills || ['Java', 'Spring Boot'];
    const verifiedSkillNames = ['Java', 'Spring Boot'];
    const certs = emp.certifications || ['AWS Cloud Practitioner', 'Oracle Java SE 11'];
    const completeness = emp.profileCompleteness || 85;

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <h2 class="text-base font-semibold text-gray-800">My Profile</h2>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div>
              <p class="text-sm font-medium text-gray-800">${user.name}</p>
              <p class="text-xs text-gray-500">${user.designation}</p>
            </div>
          </div>
        </header>
        <main class="flex-1 p-6">
          <!-- Profile Header -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center gap-6">
            <div class="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">${user.avatar}</div>
            <div class="flex-1">
              <h1 class="text-xl font-bold text-gray-800">${user.name}</h1>
              <p class="text-gray-500 text-sm">${user.designation} · ${user.department}</p>
              <p class="text-gray-400 text-xs mt-1">${user.employeeId} · ${user.email}</p>
              <div class="mt-3 flex items-center gap-3">
                <div class="flex-1 bg-gray-100 rounded-full h-2 max-w-xs">
                  <div class="bg-blue-600 h-2 rounded-full" style="width:${completeness}%"></div>
                </div>
                <span class="text-sm font-semibold text-blue-600">${completeness}% Complete</span>
              </div>
            </div>
            <button class="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition">Edit Profile</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Skills -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Skills</h3>
              <div class="flex flex-wrap gap-2 mb-3">
                ${skills.map(s => `
                  <span class="px-3 py-1 rounded-full text-xs font-medium ${verifiedSkillNames.includes(s) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
                    ${s} ${verifiedSkillNames.includes(s) ? '✓' : '(Self-declared)'}
                  </span>`).join('')}
              </div>
              <p class="text-xs text-gray-400">✓ = Verified &nbsp; Others = Self-declared</p>
            </div>

            <!-- Certifications -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Certifications</h3>
              <div class="space-y-2">
                ${certs.map(c => `
                  <div class="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                    <span class="text-lg">🏅</span>
                    <span class="text-sm text-gray-700">${c}</span>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Experience -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Experience</h3>
              <div class="space-y-3">
                <div class="p-3 rounded-lg bg-gray-50">
                  <p class="text-sm font-medium text-gray-800">Senior Developer</p>
                  <p class="text-xs text-gray-500">Current Company · 3 years</p>
                  <p class="text-xs text-gray-400 mt-1">Java, Spring Boot, Microservices</p>
                </div>
                <div class="p-3 rounded-lg bg-gray-50">
                  <p class="text-sm font-medium text-gray-800">Software Engineer</p>
                  <p class="text-xs text-gray-500">Previous Company · 2 years</p>
                  <p class="text-xs text-gray-400 mt-1">Java, REST APIs, MySQL</p>
                </div>
              </div>
            </div>

            <!-- Career Interests -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Career Interests & Aspirations</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center gap-2"><span>🎯</span> Preferred Role: <span class="font-medium text-gray-800">Backend Architect</span></div>
                <div class="flex items-center gap-2"><span>📍</span> Preferred Location: <span class="font-medium text-gray-800">Hyderabad / Remote</span></div>
                <div class="flex items-center gap-2"><span>🏢</span> Domain Interest: <span class="font-medium text-gray-800">Banking, Fintech</span></div>
                <div class="flex items-center gap-2"><span>💼</span> Work Mode: <span class="font-medium text-gray-800">Hybrid</span></div>
              </div>
            </div>
          </div>
        </main>
      </div>`;
  }
};
