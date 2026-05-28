export type SeniorityLevel = "junior" | "mid" | "senior" | "staff" | "principal";

export interface AgentConfiguration {
  agentId: string;
  agentName: string;
  role: string;
  seniorityLevel: SeniorityLevel;
  primaryResponsibilities: string[];
  secondaryResponsibilities: string[];
  skillsAndTechnologies: string[];
  preferredPatterns: string[];
  avoidPatterns: string[];
  decisionPriorities: string[];
  communicationStyle: string;
  outputRequirements: string[];
  availableTools: string[];
  toolRules: string[];
  persistentContext: string[];
  workflowStructure: string;
  constraints: string[];
  domainExpertise: string[];
  successMetrics: string[];
}

export const defaultAgentConfig: Omit<AgentConfiguration, "agentId" | "agentName" | "role"> = {
  seniorityLevel: "senior",
  primaryResponsibilities: [],
  secondaryResponsibilities: [],
  skillsAndTechnologies: [],
  preferredPatterns: [
    "reusable components",
    "scalable architecture",
    "accessibility-first design",
    "clean code principles"
  ],
  avoidPatterns: [
    "deprecated APIs",
    "inline styles",
    "hardcoded values",
    "insecure authentication flows"
  ],
  decisionPriorities: [
    "Security",
    "Maintainability",
    "Performance",
    "Scalability",
    "Developer Experience"
  ],
  communicationStyle: "concise and technical",
  outputRequirements: [
    "include folder structure",
    "explain architecture decisions",
    "provide scalable code"
  ],
  availableTools: [],
  toolRules: [],
  persistentContext: [],
  workflowStructure: "",
  constraints: [
    "never expose secrets",
    "avoid hallucinated APIs",
    "validate accessibility",
    "use production-safe patterns"
  ],
  domainExpertise: [],
  successMetrics: []
};
