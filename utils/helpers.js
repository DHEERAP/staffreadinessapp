// utils/helpers.js
const Helpers = {
  getSuitabilityBadge(s) {
    const m = { "Highly Suitable": "bg-green-100 text-green-700", "Suitable": "bg-blue-100 text-blue-700", "Consider w/ Gaps": "bg-orange-100 text-orange-700", "Consider with Gaps": "bg-orange-100 text-orange-700", "Not Recommended": "bg-red-100 text-red-700" };
    return `<span class="px-2 py-1 rounded-full text-xs font-semibold ${m[s] || 'bg-gray-100 text-gray-600'}">${s}</span>`;
  },
  getMatchScoreColor(score) {
    if (score >= 85) return "text-green-600 font-bold";
    if (score >= 70) return "text-blue-600 font-bold";
    if (score >= 50) return "text-orange-500 font-bold";
    return "text-red-500 font-bold";
  },
  getConfidenceClass(c) {
    return c === "High" ? "text-green-600 font-semibold" : c === "Medium" ? "text-orange-500 font-semibold" : "text-red-500 font-semibold";
  },
  getSlaClass(s) {
    return s === "Overdue" ? "text-red-600 font-semibold" : s === "Completed" ? "text-gray-400" : "text-green-600 font-semibold";
  },
  getStatusBadge(status) {
    const m = { "New": "bg-blue-100 text-blue-700", "Under Review": "bg-yellow-100 text-yellow-700", "Approved": "bg-green-100 text-green-700", "Rejected": "bg-red-100 text-red-700", "Closed": "bg-gray-100 text-gray-600", "Appeal Raised": "bg-purple-100 text-purple-700", "Submitted to RMG": "bg-blue-100 text-blue-700", "Draft": "bg-gray-100 text-gray-600", "Pending Approval": "bg-yellow-100 text-yellow-700" };
    return `<span class="px-2 py-1 rounded-full text-xs font-semibold ${m[status] || 'bg-gray-100 text-gray-600'}">${status}</span>`;
  },
  getAvatar(initials, size = "md") {
    const s = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };
    return `<div class="${s[size]} rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">${initials}</div>`;
  },
  showToast(message, type = "success") {
    const colors = { success: "bg-green-600", error: "bg-red-600", info: "bg-blue-600", warning: "bg-yellow-500" };
    const t = document.createElement("div");
    t.className = `fixed top-5 right-5 z-50 px-5 py-3 rounded-lg text-white text-sm font-medium shadow-lg ${colors[type]}`;
    t.textContent = message;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity 0.3s"; setTimeout(() => t.remove(), 300); }, 3000);
  },
  showLoading(id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `<div class="flex items-center justify-center py-16"><div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div><span class="ml-3 text-gray-500">Loading...</span></div>`;
  },
  showEmpty(id, msg = "No data found") {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `<div class="flex flex-col items-center justify-center py-16 text-gray-400"><svg class="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg><p class="text-sm">${msg}</p></div>`;
  },
  debounce(fn, delay = 300) {
    let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), delay); };
  },
  getBreadcrumb(items) {
    return items.map((item, i) => i === items.length - 1 ? `<span class="text-gray-800 font-medium text-sm">${item}</span>` : `<span class="text-gray-400 text-sm">${item}</span><span class="text-gray-300 mx-2 text-sm">›</span>`).join('');
  }
};
