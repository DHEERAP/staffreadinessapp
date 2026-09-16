// views/MyProfileView.js
const MyProfileView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/profile');
    const emp = EmployeeModel.getMerged(user.id);
    const skills = emp.skills || ['Java', 'Spring Boot', 'REST APIs', 'Microservices'];
    const verifiedSkillNames = ['Java', 'Spring Boot'];
    const certs = emp.certifications || [];
    const completeness = emp.profileCompleteness || 85;
    const name = emp.name || user.name;
    const email = emp.email || user.email;
    const department = emp.department || user.department;
    const designation = emp.designation || user.designation;
    const location = emp.location || '';

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h2 class="text-base font-semibold text-gray-800">My Profile</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div>
              <p class="text-sm font-medium text-gray-800">${user.name}</p>
              <p class="text-xs text-gray-500">${user.designation}</p>
            </div>
          </div>
        </header>
        <main class="flex-1 p-6">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center gap-6">
            <div class="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">${user.avatar}</div>
            <div class="flex-1">
              <h1 class="text-xl font-bold text-gray-800">${name}</h1>
              <p class="text-gray-500 text-sm">${designation} · ${department}</p>
              <p class="text-gray-400 text-xs mt-1">${user.employeeId} · ${email}${location ? ' · ' + location : ''}</p>
              <div class="mt-3 flex items-center gap-3">
                <div class="flex-1 bg-gray-100 rounded-full h-2 max-w-xs">
                  <div class="bg-blue-600 h-2 rounded-full" style="width:${completeness}%"></div>
                </div>
                <span class="text-sm font-semibold text-blue-600">${completeness}% Complete</span>
              </div>
            </div>
            <button type="button" onclick="MyProfileView.toggleEdit()" class="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition">Edit Profile</button>
          </div>

          <form id="profileEditForm" class="hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 class="font-semibold text-gray-800 mb-4">Personal Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div><label class="block text-sm text-gray-600 mb-1">Name</label><input id="profName" value="${name}" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"/></div>
              <div><label class="block text-sm text-gray-600 mb-1">Email</label><input id="profEmail" value="${email}" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"/></div>
              <div><label class="block text-sm text-gray-600 mb-1">Department</label><input id="profDept" value="${department}" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"/></div>
              <div><label class="block text-sm text-gray-600 mb-1">Designation</label><input id="profDesig" value="${designation}" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"/></div>
              <div><label class="block text-sm text-gray-600 mb-1">Location</label><input id="profLoc" value="${location}" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"/></div>
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">Skillset</h3>
            <p class="text-xs text-gray-500 mb-2">Comma-separated skills</p>
            <input id="profSkills" value="${skills.join(', ')}" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-6"/>
            <h3 class="font-semibold text-gray-800 mb-2">Additional Certifications</h3>
            <p class="text-xs text-gray-500 mb-2">One certification per line</p>
            <textarea id="profCerts" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4">${certs.join('\n')}</textarea>
            <div class="flex justify-end gap-3">
              <button type="button" onclick="MyProfileView.toggleEdit()" class="px-4 py-2 border border-gray-300 rounded-lg text-sm">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Save Changes</button>
            </div>
          </form>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Skills</h3>
              <div class="flex flex-wrap gap-2 mb-3">
                ${skills.map(s => `
                  <span class="px-3 py-1 rounded-full text-xs font-medium ${verifiedSkillNames.includes(s) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
                    ${s} ${verifiedSkillNames.includes(s) ? '(Verified)' : '(Self-declared)'}
                  </span>`).join('')}
              </div>
              <p class="text-xs text-gray-400">Verified vs self-declared skills</p>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Certifications</h3>
              <div class="space-y-2">
                ${(certs.length ? certs : ['No certifications added']).map(c => `
                  <div class="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                    ${Helpers.navIcon('check')}
                    <span class="text-sm text-gray-700">${c}</span>
                  </div>`).join('')}
              </div>
            </div>
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
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Career Interests & Aspirations</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div>Preferred Role: <span class="font-medium text-gray-800">Backend Architect</span></div>
                <div>Preferred Location: <span class="font-medium text-gray-800">Hyderabad / Remote</span></div>
                <div>Domain Interest: <span class="font-medium text-gray-800">Banking, Fintech</span></div>
                <div>Work Mode: <span class="font-medium text-gray-800">Hybrid</span></div>
              </div>
            </div>
          </div>
        </main>
      </div>`;
  },

  toggleEdit() {
    const form = document.getElementById('profileEditForm');
    if (form) form.classList.toggle('hidden');
  },

  bindEvents() {
    const form = document.getElementById('profileEditForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = AuthModel.getCurrentUser();
      const skills = document.getElementById('profSkills').value.split(',').map(s => s.trim()).filter(Boolean);
      const certifications = document.getElementById('profCerts').value.split('\n').map(s => s.trim()).filter(Boolean);
      EmployeeModel.saveProfile(user.id, {
        name: document.getElementById('profName').value.trim(),
        email: document.getElementById('profEmail').value.trim(),
        department: document.getElementById('profDept').value.trim(),
        designation: document.getElementById('profDesig').value.trim(),
        location: document.getElementById('profLoc').value.trim(),
        skills,
        certifications
      });
      Helpers.showToast('Profile updated.', 'success');
      AppController.render(MyProfileView.render(AuthModel.getCurrentUser()));
      MyProfileView.bindEvents();
    });
  }
};
