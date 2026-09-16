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
  },
  navIcon(name) {
    const p = {
      dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      profile: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      briefcase: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      pencil: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      folder: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
      chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      plus: 'M12 4v16m8-8H4',
      check: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      help: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
    };
    return `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${p[name] || p.dashboard}"/></svg>`;
  }
};
