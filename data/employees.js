const EMPLOYEES = [
  { id: 1, name: "Ananya Rao", employeeId: "EMP001", designation: "Senior Developer", department: "Engineering", location: "Hyderabad", experience: 4, availability: "Immediate", profileCompleteness: 85, verifiedSkills: 12, activeInterests: 3, skills: ["Java", "Spring Boot", "REST APIs", "SQL", "Git"], certifications: ["Oracle Java SE", "AWS Cloud Practitioner"], readinessScore: 78, segment: "Bench / Available Resources", avatar: "AR" },
  { id: 2, name: "Vikram Singh", employeeId: "EMP002", designation: "Backend Developer", department: "Engineering", location: "Bengaluru", experience: 5, availability: "15 Days", profileCompleteness: 90, verifiedSkills: 10, activeInterests: 2, skills: ["Java", "Spring Boot", "Microservices", "Kafka", "Docker"], certifications: ["AWS Solutions Architect"], readinessScore: 86, segment: "Project Allocated", avatar: "VS" },
  { id: 3, name: "Neha Patel", employeeId: "EMP003", designation: "Full Stack Developer", department: "Engineering", location: "Pune", experience: 3, availability: "Immediate", profileCompleteness: 75, verifiedSkills: 8, activeInterests: 1, skills: ["React", "Node.js", "MongoDB", "REST APIs", "Java"], certifications: [], readinessScore: 70, segment: "Bench / Available Resources", avatar: "NP" },
  { id: 4, name: "Arjun Mehta", employeeId: "EMP004", designation: "Software Engineer", department: "Engineering", location: "Mumbai", experience: 2, availability: "Immediate", profileCompleteness: 65, verifiedSkills: 6, activeInterests: 2, skills: ["Java", "Python", "SQL", "REST APIs"], certifications: [], readinessScore: 62, segment: "Bench / Available Resources", avatar: "AM" },
  { id: 5, name: "Roshni Das", employeeId: "EMP005", designation: "Junior Developer", department: "Engineering", location: "Hyderabad", experience: 1, availability: "30 Days", profileCompleteness: 55, verifiedSkills: 4, activeInterests: 1, skills: ["Java", "SQL"], certifications: [], readinessScore: 50, segment: "Project Allocated", avatar: "RD" }
];

const MATCHING_RESULTS = [
  { rank: 1, employeeId: 1, name: "Ananya Rao", matchScore: 91, confidence: "High", interest: "Yes", availability: "Immediate", suitability: "Highly Suitable", shortlisted: false },
  { rank: 2, employeeId: 2, name: "Vikram Singh", matchScore: 86, confidence: "High", interest: "No", availability: "15 Days", suitability: "Highly Suitable", shortlisted: false },
  { rank: 3, employeeId: 3, name: "Neha Patel", matchScore: 78, confidence: "Medium", interest: "Yes", availability: "Immediate", suitability: "Suitable", shortlisted: false },
  { rank: 4, employeeId: 4, name: "Arjun Mehta", matchScore: 69, confidence: "Medium", interest: "Yes", availability: "Immediate", suitability: "Consider w/ Gaps", shortlisted: false },
  { rank: 5, employeeId: 5, name: "Roshni Das", matchScore: 50, confidence: "Low", interest: "No", availability: "30 Days", suitability: "Consider w/ Gaps", shortlisted: false }
];
