const STAFFING_REQUIREMENTS = [
  { id: "SR-001", projectName: "Banking Transformation Project", requiredRole: "Java Backend Developer", noOfResources: 3, startDate: "15/10/2026", location: "Hyderabad (Hybrid)", skills: ["Java", "Spring Boot", "REST APIs"], minExperience: 4, certification: "AWS Certified", projectDescription: "Core banking system modernization using microservices architecture.", employeeSegment: "Bench / Available Resources", status: "Submitted to RMG", createdBy: "PH001", createdOn: "01 Sep 2026", matchingStats: { candidatesEvaluated: 42, eligibleCandidates: 18, interestedEmployees: 12, shortlisted: 0, totalRequired: 3 } },
  { id: "SR-002", projectName: "Retail Digital Platform", requiredRole: "Full Stack Developer", noOfResources: 2, startDate: "01/10/2026", location: "Bengaluru (Remote)", skills: ["React", "Node.js", "MongoDB"], minExperience: 2, certification: null, projectDescription: "Digital transformation of retail operations.", employeeSegment: "Bench / Available Resources", status: "Draft", createdBy: "PH001", createdOn: "05 Sep 2026", matchingStats: null },
  { id: "SR-003", projectName: "Analytics Modernization", requiredRole: "Data Engineer", noOfResources: 1, startDate: "20/10/2026", location: "Pune (Hybrid)", skills: ["Python", "Spark", "Kafka"], minExperience: 4, certification: "GCP Data Engineer", projectDescription: "Modernize analytics infrastructure using cloud-native tools.", employeeSegment: "Project Allocated", status: "Approved", createdBy: "PH001", createdOn: "28 Aug 2026", matchingStats: { candidatesEvaluated: 30, eligibleCandidates: 10, interestedEmployees: 8, shortlisted: 1, totalRequired: 1 } }
];

const INTEREST_DASHBOARD = [
  { opportunity: "Java Backend Developer", totalInterested: 12, highlySuitable: 5, suitable: 4, considerWithGaps: 3, requirementId: "SR-001" },
  { opportunity: "Data Engineer", totalInterested: 8, highlySuitable: 3, suitable: 3, considerWithGaps: 2, requirementId: "SR-003" },
  { opportunity: "DevOps Engineer", totalInterested: 6, highlySuitable: 2, suitable: 2, considerWithGaps: 2, requirementId: "SR-004" },
  { opportunity: "Full Stack Developer", totalInterested: 10, highlySuitable: 4, suitable: 4, considerWithGaps: 2, requirementId: "SR-002" }
];

const SHORTLIST_FOR_APPROVAL = [
  {
    requirementId: "SR-001", requirement: "Java Backend Developer",
    project: "Banking Transformation Project", openings: 3,
    candidates: [
      { name: "Ananya Rao", matchScore: 91, interest: "Yes", availability: "Immediate", rmgRecommendation: "Recommended", decision: "Approve" },
      { name: "Vikram Singh", matchScore: 86, interest: "No", availability: "15 Days", rmgRecommendation: "Recommended", decision: "Approve" },
      { name: "Neha Patel", matchScore: 78, interest: "Yes", availability: "Immediate", rmgRecommendation: "Recommended", decision: "Approve" }
    ],
    overrideComments: "", status: "Pending Approval"
  }
];
