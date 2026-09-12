// views/CreateStaffingView.js
const CreateStaffingView = {
  currentSkills: ["Java", "Spring Boot", "REST APIs"],

  render(user) {
    const sidebar = SidebarView.render(user, '/create-staffing');
    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="hidden sm:block text-sm text-gray-500">${Helpers.getBreadcrumb(['Dashboard', 'Staffing Requirements', 'Create New'])}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">${user.avatar}</div>
            <div><p class="text-sm font-medium text-gray-800">${user.designation}</p><p class="text-xs text-gray-500">${user.name}</p></div>
          </div>
        </header>
        <main class="flex-1 p-4 md:p-6 max-w-4xl">
          <h1 class="text-lg font-bold text-gray-800 mb-5">Create Staffing Requirement</h1>
          <form id="staffingForm" novalidate>
            <!-- Basic Information -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
              <h2 class="font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Project Name <span class="text-red-500">*</span></label>
                  <input id="projectName" type="text" placeholder="Enter project name" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <p id="projectNameErr" class="text-red-500 text-xs mt-1 hidden">Required</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Required Role <span class="text-red-500">*</span></label>
                  <select id="requiredRole" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">Select role</option>
                    <option>Java Backend Developer</option>
                    <option>Full Stack Developer</option>
                    <option>Data Engineer</option>
                    <option>DevOps Engineer</option>
                    <option>Frontend Developer</option>
                    <option>Cloud Architect</option>
                  </select>
                  <p id="requiredRoleErr" class="text-red-500 text-xs mt-1 hidden">Required</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">No. of Resources <span class="text-red-500">*</span></label>
                  <input id="noOfResources" type="number" min="1" placeholder="Enter number" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <p id="noOfResourcesErr" class="text-red-500 text-xs mt-1 hidden">Required</p>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Start Date <span class="text-red-500">*</span></label>
                  <input id="startDate" type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <p id="startDateErr" class="text-red-500 text-xs mt-1 hidden">Required</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Location / Work Mode</label>
                  <select id="location" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">Select option</option>
                    <option>Hyderabad (Hybrid)</option>
                    <option>Bengaluru (Remote)</option>
                    <option>Pune (Hybrid)</option>
                    <option>Mumbai (Onsite)</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Mandatory Requirements -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
              <h2 class="font-semibold text-gray-800 mb-4">Mandatory Requirements</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Skills <span class="text-red-500">*</span></label>
                  <div id="skillTags" class="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-10 bg-white">
                    ${this.currentSkills.map(s => this.renderSkillTag(s)).join('')}
                    <input id="skillInput" type="text" placeholder="+ Add Skill" class="border-none outline-none text-sm text-blue-600 placeholder-blue-400 w-24 bg-transparent"/>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Min Experience <span class="text-red-500">*</span></label>
                  <div class="flex items-center gap-2">
                    <input id="minExperience" type="number" min="0" value="4" class="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <span class="text-sm text-gray-500">Years &amp;</span>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Certification (If any)</label>
                <input id="certification" type="text" placeholder="e.g. AWS Certified" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
              <h2 class="font-semibold text-gray-800 mb-4">Additional Information</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                  <textarea id="projectDescription" rows="3" placeholder="Enter project description..." class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Employee Segment</label>
                  <select id="employeeSegment" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>Bench / Available Resources</option>
                    <option>Project Allocated</option>
                    <option>All Employees</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex justify-end gap-3">
              <button type="button" onclick="StaffingController.saveDraft()" class="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition">Save Draft</button>
              <button type="submit" class="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">Submit to RMG</button>
            </div>
          </form>
        </main>
      </div>`;
  },

  renderSkillTag(skill) {
    return `<span class="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium skill-tag">
      ${skill} <button type="button" onclick="CreateStaffingView.removeSkill('${skill}')" class="text-blue-400 hover:text-red-500 ml-1">×</button>
    </span>`;
  },

  removeSkill(skill) {
    this.currentSkills = this.currentSkills.filter(s => s !== skill);
    this.refreshSkillTags();
  },

  addSkill(skill) {
    if (skill && !this.currentSkills.includes(skill)) {
      this.currentSkills.push(skill);
      this.refreshSkillTags();
    }
  },

  refreshSkillTags() {
    const container = document.getElementById('skillTags');
    if (!container) return;
    container.innerHTML = this.currentSkills.map(s => this.renderSkillTag(s)).join('') +
      `<input id="skillInput" type="text" placeholder="+ Add Skill" class="border-none outline-none text-sm text-blue-600 placeholder-blue-400 w-24 bg-transparent"/>`;
    this.bindSkillInput();
  },

  bindSkillInput() {
    const input = document.getElementById('skillInput');
    if (!input) return;
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const val = input.value.trim();
        if (val) { this.addSkill(val); input.value = ''; }
      }
    });
  },

  bindEvents() {
    this.bindSkillInput();
    const form = document.getElementById('staffingForm');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); StaffingController.submitToRMG(); });
  },

  getFormData() {
    return {
      projectName: document.getElementById('projectName')?.value.trim(),
      requiredRole: document.getElementById('requiredRole')?.value,
      noOfResources: parseInt(document.getElementById('noOfResources')?.value),
      startDate: document.getElementById('startDate')?.value,
      location: document.getElementById('location')?.value,
      skills: [...this.currentSkills],
      minExperience: parseInt(document.getElementById('minExperience')?.value),
      certification: document.getElementById('certification')?.value.trim(),
      projectDescription: document.getElementById('projectDescription')?.value.trim(),
      employeeSegment: document.getElementById('employeeSegment')?.value,
      status: 'Draft',
      createdBy: Storage.getUser()?.employeeId
    };
  },

  validate() {
    let valid = true;
    const fields = [
      { id: 'projectName', errId: 'projectNameErr' },
      { id: 'requiredRole', errId: 'requiredRoleErr' },
      { id: 'noOfResources', errId: 'noOfResourcesErr' },
      { id: 'startDate', errId: 'startDateErr' }
    ];
    fields.forEach(({ id, errId }) => {
      const el = document.getElementById(id);
      const err = document.getElementById(errId);
      if (!el?.value) { err?.classList.remove('hidden'); valid = false; }
      else { err?.classList.add('hidden'); }
    });
    return valid;
  }
};
