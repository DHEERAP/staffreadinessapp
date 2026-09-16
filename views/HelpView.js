// views/HelpView.js
const HelpView = {
  employeeFaqs: [
    { q: 'How do I update my profile information?', a: 'Go to My Profile from the sidebar and click "Edit Profile". You can update personal details, skills and certifications.' },
    { q: 'How do I express interest in an opportunity?', a: 'Browse Opportunities from the sidebar, open any opportunity and click "Express Interest". Your interest will be visible to the RMG team.' },
    { q: 'What is a Correction Request?', a: 'If your profile data (skills, certifications, experience) is incorrect, you can raise a Correction Request with supporting evidence. HRBP will review and approve it.' },
    { q: 'What does my Readiness Score mean?', a: 'Your Readiness Score is calculated based on skill match, verified skills, relevant experience, availability and your expressed interest for a specific opportunity.' },
    { q: 'How long does a Correction Request take?', a: 'Correction Requests are typically reviewed within 5 business days. You will see the updated status on the Correction Requests page.' },
    { q: 'Who can I contact for staffing queries?', a: 'Raise a support ticket using the form on this page. Your RMG Manager or HRBP can also help with staffing questions.' }
  ],
  projectHeadFaqs: [
    { q: 'How do I create a staffing requirement?', a: 'Use Create Requirement from the sidebar. Fill in project, role, skills and dates, then submit to RMG or save as draft.' },
    { q: 'Where do I approve a shortlist?', a: 'Open Approve Shortlist. Filter by project or role if needed, review RMG recommendations, then approve. Approved items leave Pending Approval.' },
    { q: 'Will RMG see new requirements immediately?', a: 'After you submit a requirement, it is saved in this browser. The RMG dashboard reads the latest staffing data when opened.' },
    { q: 'How do I track my openings?', a: 'The dashboard shows your requirements, total openings, pending approvals and approved counts. Click a card to open the related module.' }
  ],
  hrbpFaqs: [
    { q: 'How do I review a correction request?', a: 'Open Correction Requests, use the action icon on a row, then approve, reject or keep the request under review.' },
    { q: 'What details should I check?', a: 'Review the employee name, request type, message, evidence, current status and SLA before you decide.' },
    { q: 'Where can I see workforce quality trends?', a: 'Use Reports from the sidebar for completeness, skill verification and correction trends.' },
    { q: 'How do I get platform help?', a: 'Submit a support ticket on this page with a subject and message.' }
  ],

  render(user) {
    const sidebar = SidebarView.render(user, '/help');
    const isRmg = user.role === 'rmg';
    const faqs = user.role === 'project_head' ? this.projectHeadFaqs : user.role === 'hrbp' ? this.hrbpFaqs : this.employeeFaqs;
    const faqBlock = isRmg ? '' : `
          <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 ${isRmg ? '' : 'md:col-span-1'}">
            <h3 class="font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
            <div class="space-y-3">
              ${faqs.map(f => `
                <div class="border border-gray-100 rounded-lg overflow-hidden">
                  <button type="button" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('span').textContent = this.nextElementSibling.classList.contains('hidden') ? '+' : '-'"
                    class="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50">
                    ${f.q}
                    <span class="text-gray-400 font-bold ml-2">+</span>
                  </button>
                  <div class="hidden px-3 pb-3 text-sm text-gray-600 bg-gray-50">${f.a}</div>
                </div>`).join('')}
            </div>
          </div>`;

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <button id="hamburgerBtn" onclick="SidebarView.openSidebar()" class="p-2 text-gray-600 hover:text-gray-800 md:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h2 class="text-base font-semibold text-gray-800">Help & Support</h2>
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
          <div class="mb-6">
            <h1 class="text-xl font-bold text-gray-800">Help & Support</h1>
            <p class="text-gray-500 text-sm">${isRmg ? 'Raise a support ticket for RMG platform assistance.' : 'Find answers and raise a support ticket.'}</p>
          </div>
          <div class="grid grid-cols-1 ${isRmg ? '' : 'md:grid-cols-2'} gap-6">
            ${faqBlock}
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Raise a Support Ticket</h3>
              <form id="supportTicketForm" class="space-y-3">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Subject</label>
                  <input id="ticketSubject" type="text" placeholder="Describe your issue briefly" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Message</label>
                  <textarea id="ticketMessage" rows="4" placeholder="Provide details about your issue..." class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                </div>
                <button type="submit" class="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium">Submit Ticket</button>
              </form>
            </div>
          </div>
        </main>
      </div>`;
  },

  bindEvents() {
    const form = document.getElementById('supportTicketForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = document.getElementById('ticketSubject')?.value.trim();
      const message = document.getElementById('ticketMessage')?.value.trim();
      if (!subject || !message) { Helpers.showToast('Please enter a subject and message.', 'error'); return; }
      const user = AuthModel.getCurrentUser();
      const tickets = Storage.get('supportTickets') || [];
      tickets.push({ subject, message, role: user.role, userId: user.id, date: new Date().toLocaleDateString() });
      Storage.set('supportTickets', tickets);
      Helpers.showToast('Support ticket submitted.', 'success');
      form.reset();
    });
  }
};
