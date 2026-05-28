export type AgentStatus = "locked" | "in-progress" | "completed";

export interface LogicDocument {
  problemStatement: string;
  scenarios: string[];
  designDecisions: {
    decision: string;
    justification: string;
  }[];
  executionStrategy: string;
  alternativeScenarios: string[];
}

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  logicDoc: LogicDocument;
  deliverable: {
    type: string;
    url?: string;
    preview?: string;
  };
  timing?: {
    startedAt?: string;
    completedAt?: string;
    duration?: string; // in format like "2m 34s" or "1h 23m"
  };
}

export interface Phase {
  id: number;
  name: string;
  agents: Agent[];
  summary?: {
    content: string;
    compiled: boolean;
  };
  timing?: {
    startedAt?: string;
    completedAt?: string;
    duration?: string; // total time for all agents in phase
  };
}

export interface PipelineData {
  phases: Phase[];
  masterBlueprint?: {
    compiled: boolean;
    agentDocs: number;
    phaseSummaries: number;
  };
}
