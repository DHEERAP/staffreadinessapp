// views/HelpView.js
const HelpView = {
  render(user) {
    const sidebar = SidebarView.render(user, '/help');
    const faqs = [
      { q: 'How do I update my profile information?', a: 'Go to My Profile from the sidebar and click "Edit Profile". You can update your skills, experience, certifications and career interests.' },
      { q: 'How do I express interest in an opportunity?', a: 'Browse Opportunities from the sidebar, open any opportunity and click "Express Interest". Your interest will be visible to the RMG team.' },
      { q: 'What is a Correction Request?', a: 'If your profile data (skills, certifications, experience) is incorrect, you can raise a Correction Request with supporting evidence. HRBP will review and approve it.' },
      { q: 'What does my Readiness Score mean?', a: 'Your Readiness Score is calculated based on skill match, verified skills, relevant experience, availability and your expressed interest for a specific opportunity.' },
      { q: 'How long does a Correction Request take?', a: 'Correction Requests are typically reviewed within 5 business days. You will receive a notification once it is approved or rejected.' },
      { q: 'Who can I contact for staffing queries?', a: 'Reach out to your RMG Manager or HRBP directly. You can also raise a support ticket using the contact form below.' }
    ];

    return `
      ${sidebar}
      <div class="main-content md:ml-56 flex flex-col min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <h2 class="text-base font-semibold text-gray-800">Help & Support</h2>
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
            <p class="text-gray-500 text-sm">Find answers, guides and contact support.</p>
          </div>

          <!-- Quick Links -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            ${[
              { icon: '📖', label: 'User Guide', desc: 'Platform walkthrough' },
              { icon: '🎥', label: 'Video Tutorials', desc: 'Step-by-step videos' },
              { icon: '📋', label: 'Release Notes', desc: 'What\'s new' },
              { icon: '🎫', label: 'Raise Ticket', desc: 'Contact support' }
            ].map(l => `
              <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center cursor-pointer hover:border-blue-300 transition">
                <div class="text-2xl mb-2">${l.icon}</div>
                <p class="text-sm font-medium text-gray-800">${l.label}</p>
                <p class="text-xs text-gray-500">${l.desc}</p>
              </div>`).join('')}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- FAQs -->
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 class="font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
              <div class="space-y-3">
                ${faqs.map((f, i) => `
                  <div class="border border-gray-100 rounded-lg overflow-hidden">
                    <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('span').textContent = this.nextElementSibling.classList.contains('hidden') ? '+' : '−'"
                      class="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50">
                      ${f.q}
                      <span class="text-gray-400 font-bold ml-2">+</span>
                    </button>
                    <div class="hidden px-3 pb-3 text-sm text-gray-600 bg-gray-50">${f.a}</div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Contact Support -->
            <div class="space-y-4">
              <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 class="font-semibold text-gray-800 mb-4">Contact Support</h3>
                <div class="space-y-3">
                  <div>
                    <label class="text-xs text-gray-500 mb-1 block">Subject</label>
                    <input type="text" placeholder="Describe your issue briefly" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label class="text-xs text-gray-500 mb-1 block">Message</label>
                    <textarea rows="4" placeholder="Provide details about your issue..." class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                  </div>
                  <button class="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium">Submit Ticket</button>
                </div>
              </div>

              <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 class="font-semibold text-gray-800 mb-3">Direct Contacts</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center gap-2 text-gray-600"><span>📧</span> platform-support@company.com</div>
                  <div class="flex items-center gap-2 text-gray-600"><span>📞</span> +91-1800-XXX-XXXX (Mon–Fri, 9am–6pm)</div>
                  <div class="flex items-center gap-2 text-gray-600"><span>💬</span> Teams: Staffing Platform Support</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>`;
  }
};
