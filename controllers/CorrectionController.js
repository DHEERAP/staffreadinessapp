// controllers/CorrectionController.js
const CorrectionController = {
  activeTab: 'new',

  showCorrectionRequests() {
    const user = AuthModel.getCurrentUser();
    if (!user) { Router.navigate('/login'); return; }
    const isEmployee = user.role === 'employee';
    const requests = isEmployee ? CorrectionModel.getByEmployee(user) : CorrectionModel.getByTab(this.activeTab);
    AppController.render(CorrectionRequestsView.render(user, requests));
    this.bindEvents(user);
  },

  bindEvents(user) {
    if (user.role === 'employee') {
      const form = document.getElementById('raiseCorrectionForm');
      if (form) form.addEventListener('submit', (e) => { e.preventDefault(); this.submitEmployeeRequest(); });
      return;
    }
    const typeFilter = document.getElementById('crFilterType');
    const statusFilter = document.getElementById('crFilterStatus');
    const slaFilter = document.getElementById('crFilterSLA');
    const search = document.getElementById('crSearch');

    const applyFilters = () => {
      let reqs = CorrectionModel.getByTab(this.activeTab);
      reqs = CorrectionModel.filter(reqs, {
        type: typeFilter?.value,
        status: statusFilter?.value,
        slaStatus: slaFilter?.value
      });
      reqs = CorrectionModel.search(reqs, search?.value);
      CorrectionRequestsView.updateTable(reqs, false);
    };

    if (typeFilter) typeFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (slaFilter) slaFilter.addEventListener('change', applyFilters);
    if (search) search.addEventListener('input', Helpers.debounce(applyFilters, 300));
  },

  submitEmployeeRequest() {
    const user = AuthModel.getCurrentUser();
    const type = document.getElementById('crType')?.value;
    const description = document.getElementById('crDescription')?.value.trim();
    const message = document.getElementById('crMessage')?.value.trim();
    const evidence = document.getElementById('crEvidence')?.value.trim();
    if (!type || !description || !message) { Helpers.showToast('Please fill type, description and message.', 'error'); return; }
    CorrectionModel.create({ employeeId: user.id, employeeName: user.name, type, description, message, evidence });
    Helpers.showToast('Correction request submitted.', 'success');
    this.showCorrectionRequests();
  },

  switchTab(tab) {
    this.activeTab = tab;
    CorrectionRequestsView.switchTabUI(tab);
    const requests = CorrectionModel.getByTab(tab);
    CorrectionRequestsView.updateTable(requests, false);
  },

  viewOwnRequest(id) {
    const req = CorrectionModel.getById(id);
    if (!req) return;
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h3 class="font-bold text-gray-800 mb-3">Request ${req.id}</h3>
        <div class="space-y-2 text-sm mb-4">
          <p><span class="text-gray-500">Type:</span> <span class="font-medium">${req.type}</span></p>
          <p><span class="text-gray-500">Description:</span> <span class="font-medium">${req.description}</span></p>
          <p><span class="text-gray-500">Message:</span> <span class="font-medium">${req.message || '-'}</span></p>
          <p><span class="text-gray-500">Evidence:</span> <span class="font-medium">${req.evidence || '-'}</span></p>
          <p><span class="text-gray-500">Status:</span> <span class="font-medium">${req.status}</span></p>
        </div>
        <div class="flex justify-end">
          <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Close</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  },

  reviewRequest(id) {
    const req = CorrectionModel.getById(id);
    if (!req) return;
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <h3 class="font-bold text-gray-800 mb-3">Review Request: ${req.id}</h3>
        <div class="space-y-2 text-sm mb-4">
          <p><span class="text-gray-500">Employee:</span> <span class="font-medium">${req.employeeName}</span></p>
          <p><span class="text-gray-500">Type:</span> <span class="font-medium">${req.type}</span></p>
          <p><span class="text-gray-500">Description:</span> <span class="font-medium">${req.description}</span></p>
          <p><span class="text-gray-500">Message:</span> <span class="font-medium">${req.message || '-'}</span></p>
          <p><span class="text-gray-500">Evidence:</span> <span class="font-medium">${req.evidence || '-'}</span></p>
          <p><span class="text-gray-500">Status:</span> <span class="font-medium">${req.status}</span></p>
          <p><span class="text-gray-500">SLA Status:</span> <span class="font-medium ${Helpers.getSlaClass(req.slaStatus)}">${req.slaStatus}</span></p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Action</label>
          <select id="modalAction" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
            <option value="Under Review">Keep Under Review</option>
          </select>
        </div>
        <div class="flex gap-3 justify-end">
          <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
          <button onclick="CorrectionController.submitReview('${id}', document.getElementById('modalAction').value, this)" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Submit</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  },

  submitReview(id, action, btn) {
    const tabMap = { 'Approved': 'closed', 'Rejected': 'closed', 'Under Review': 'under_review' };
    CorrectionModel.updateStatus(id, action, tabMap[action] || 'under_review');
    btn.closest('.fixed').remove();
    Helpers.showToast(`Request ${id} updated to: ${action}`, 'success');
    this.showCorrectionRequests();
  }
};
