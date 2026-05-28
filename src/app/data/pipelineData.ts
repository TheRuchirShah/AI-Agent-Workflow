import { PipelineData } from "../types/pipeline";

export const initialPipelineData: PipelineData = {
  phases: [
    {
      id: 1,
      name: "Product Discovery & Strategy",
      timing: {
        startedAt: "2026-05-27T09:00:00Z",
        completedAt: "2026-05-27T11:45:00Z",
        duration: "2h 45m"
      },
      agents: [
        {
          id: "1.1",
          name: "Info Gathering Agent",
          status: "completed",
          timing: {
            startedAt: "2026-05-27T09:00:00Z",
            completedAt: "2026-05-27T09:47:00Z",
            duration: "47m"
          },
          logicDoc: {
            problemStatement: "Extract and structure all relevant information from client brief to establish project foundation.",
            scenarios: [
              "Client provides comprehensive brief with clear requirements",
              "Brief contains ambiguous or conflicting information",
              "Missing critical information requires clarification"
            ],
            designDecisions: [
              {
                decision: "Implement structured data extraction using NLP entity recognition",
                justification: "Ensures consistent categorization of requirements, stakeholders, and constraints across varied brief formats"
              },
              {
                decision: "Create hierarchical requirement taxonomy (must-have, should-have, nice-to-have)",
                justification: "Enables downstream agents to prioritize features and make informed trade-off decisions"
              }
            ],
            executionStrategy: "Parse brief document → Extract entities (stakeholders, requirements, constraints) → Categorize by priority → Generate structured JSON output → Validate completeness → Flag gaps for human review",
            alternativeScenarios: [
              "Manual template-based extraction (rejected: not scalable)",
              "Simple keyword extraction (rejected: misses context and relationships)"
            ]
          },
          deliverable: {
            type: "Structured Requirements JSON",
            url: "/deliverables/phase1/requirements.json",
            preview: "stakeholders: 4 | requirements: 23 | constraints: 7"
          }
        },
        {
          id: "1.2",
          name: "Market Analysis Agent",
          status: "in-progress",
          timing: {
            startedAt: "2026-05-27T09:47:00Z"
          },
          logicDoc: {
            problemStatement: "Analyze competitive landscape and market positioning to inform strategic design decisions.",
            scenarios: [
              "Well-established market with clear competitors",
              "Emerging market with few direct competitors",
              "Saturated market requiring differentiation"
            ],
            designDecisions: [
              {
                decision: "Conduct heuristic evaluation of top 5 competitors using Jakob Nielsen's 10 usability principles",
                justification: "Provides standardized framework for identifying UX patterns, anti-patterns, and differentiation opportunities"
              },
              {
                decision: "Map feature parity matrix across competitor landscape",
                justification: "Reveals table-stakes features vs. potential differentiators"
              }
            ],
            executionStrategy: "Identify competitors → Screen capture key user flows → Conduct heuristic analysis → Extract feature sets → Generate comparison matrix → Synthesize insights",
            alternativeScenarios: [
              "SWOT analysis only (rejected: too high-level for design decisions)",
              "User review sentiment analysis (considered: valuable but time-intensive for initial phase)"
            ]
          },
          deliverable: {
            type: "Competitive Analysis Report",
            preview: "Analyzing 5 competitors..."
          }
        },
        {
          id: "1.3",
          name: "Strategy Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Synthesize discovery insights into actionable product strategy and design principles.",
            scenarios: [
              "Clear market gap aligns with client capabilities",
              "Multiple strategic directions require prioritization",
              "Client constraints conflict with market opportunities"
            ],
            designDecisions: [
              {
                decision: "Generate product positioning statement using Geoffrey Moore's positioning template",
                justification: "Forces clarity on target user, value proposition, and competitive differentiation"
              },
              {
                decision: "Define 3-5 core design principles derived from requirements and market insights",
                justification: "Creates decision-making framework for all downstream design work"
              }
            ],
            executionStrategy: "Synthesize requirements + market analysis → Draft positioning statement → Identify strategic tensions → Resolve through design principles → Validate alignment with client goals",
            alternativeScenarios: [
              "Feature roadmap creation (rejected: premature before validation)",
              "Vision document only (rejected: insufficient actionability)"
            ]
          },
          deliverable: {
            type: "Strategic Design Brief"
          }
        }
      ]
    },
    {
      id: 2,
      name: "User Research & Validation",
      agents: [
        {
          id: "2.1",
          name: "User Research Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Define target user segments and their needs through research synthesis.",
            scenarios: ["Primary research available", "Secondary research only", "Mixed methods approach"],
            designDecisions: [
              {
                decision: "Create proto-personas based on strategic inputs",
                justification: "Provides immediate user models while awaiting validation"
              }
            ],
            executionStrategy: "Analyze requirements → Synthesize user data → Create personas → Document jobs-to-be-done",
            alternativeScenarios: ["Assumption-based personas (rejected: lacks validation)"]
          },
          deliverable: {
            type: "User Research Synthesis"
          }
        },
        {
          id: "2.2",
          name: "Journey Mapping Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Map current and future state user journeys to identify key touchpoints and pain points.",
            scenarios: ["Complex multi-step journey", "Simple linear flow", "Multi-actor journey"],
            designDecisions: [
              {
                decision: "Use service blueprint format to capture frontstage and backstage processes",
                justification: "Reveals technical and operational requirements beyond UI"
              }
            ],
            executionStrategy: "Define journey phases → Map touchpoints → Identify emotions → Document pain points → Highlight opportunities",
            alternativeScenarios: ["Basic user flow only (rejected: misses context)"]
          },
          deliverable: {
            type: "Journey Maps & Service Blueprints"
          }
        }
      ]
    },
    {
      id: 3,
      name: "Information Architecture & Wireframing",
      agents: [
        {
          id: "3.1",
          name: "IA Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Structure information hierarchy and navigation to support user goals.",
            scenarios: ["Content-heavy application", "Task-focused application", "Hybrid content/task"],
            designDecisions: [
              {
                decision: "Apply card sorting insights to generate sitemap",
                justification: "Aligns mental models with navigation structure"
              }
            ],
            executionStrategy: "Inventory content → Conduct virtual card sort → Generate sitemap → Define taxonomy → Document IA patterns",
            alternativeScenarios: ["Top-down IA only (rejected: ignores user mental models)"]
          },
          deliverable: {
            type: "Sitemap & IA Documentation"
          }
        },
        {
          id: "3.2",
          name: "Wireframe Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Create low-fidelity wireframes representing information hierarchy and interaction patterns.",
            scenarios: ["Standard CRUD interface", "Data visualization heavy", "Workflow-driven UI"],
            designDecisions: [
              {
                decision: "Generate mobile-first wireframes with responsive breakpoints annotated",
                justification: "Forces prioritization and ensures scalability across devices"
              }
            ],
            executionStrategy: "Extract key screens from journey maps → Apply IA structure → Sketch layout hierarchy → Annotate interactions → Iterate based on principles",
            alternativeScenarios: ["Desktop-first design (rejected: mobile usage dominates)"]
          },
          deliverable: {
            type: "Wireframe Set (Figma)"
          }
        },
        {
          id: "3.3",
          name: "Accessibility Review Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Validate wireframes against WCAG 2.1 AA standards to ensure inclusive design.",
            scenarios: ["Standard web application", "Complex data visualization", "Form-heavy interface"],
            designDecisions: [
              {
                decision: "Conduct heuristic accessibility review using WCAG checklist",
                justification: "Catches 80% of accessibility issues before high-fidelity design"
              }
            ],
            executionStrategy: "Review wireframes → Check keyboard navigation → Validate heading hierarchy → Assess color contrast → Document issues → Propose fixes",
            alternativeScenarios: ["Defer to development phase (rejected: expensive to fix later)"]
          },
          deliverable: {
            type: "Accessibility Audit Report"
          }
        }
      ]
    },
    {
      id: 4,
      name: "Visual Design & Design System",
      agents: [
        {
          id: "4.1",
          name: "Design System Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Establish foundational design system (typography, color, spacing, components).",
            scenarios: ["Build from scratch", "Extend existing system", "Migrate legacy system"],
            designDecisions: [
              {
                decision: "Create design tokens in JSON format following W3C spec",
                justification: "Enables platform-agnostic theming and automated code generation"
              }
            ],
            executionStrategy: "Define brand attributes → Create color palette → Establish type scale → Define spacing system → Build core components → Document usage",
            alternativeScenarios: ["CSS variables only (rejected: lacks structured token system)"]
          },
          deliverable: {
            type: "Design System Foundation (Figma + Tokens)"
          }
        },
        {
          id: "4.2",
          name: "Visual Design Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Apply visual design system to wireframes, creating high-fidelity mockups.",
            scenarios: ["Marketing-focused aesthetic", "Enterprise application", "Consumer mobile app"],
            designDecisions: [
              {
                decision: "Design in 8pt grid system for precise developer handoff",
                justification: "Reduces ambiguity and speeds development implementation"
              }
            ],
            executionStrategy: "Apply design system → Design key screens → Establish visual patterns → Create responsive variants → Annotate interactions → Build prototype",
            alternativeScenarios: ["Pixel-based layout (rejected: inconsistent spacing)"]
          },
          deliverable: {
            type: "High-Fidelity Mockups (Figma)"
          }
        }
      ]
    },
    {
      id: 5,
      name: "Prototyping & Interaction Design",
      agents: [
        {
          id: "5.1",
          name: "Prototype Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Create interactive prototype demonstrating key user flows and micro-interactions.",
            scenarios: ["Click-through prototype", "Animated transitions", "Form validation flows"],
            designDecisions: [
              {
                decision: "Build high-fidelity Figma prototype with Smart Animate transitions",
                justification: "Communicates interaction intent without code investment"
              }
            ],
            executionStrategy: "Identify critical paths → Connect screens → Add transitions → Define micro-interactions → Annotate edge cases → Test flow completeness",
            alternativeScenarios: ["Static screens only (rejected: interaction patterns unclear)"]
          },
          deliverable: {
            type: "Interactive Prototype (Figma)"
          }
        },
        {
          id: "5.2",
          name: "Interaction Specification Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Document all interaction patterns, animations, and state transitions for developer handoff.",
            scenarios: ["Simple state transitions", "Complex animation sequences", "Conditional logic flows"],
            designDecisions: [
              {
                decision: "Create interaction specification using state diagrams + animation curves",
                justification: "Provides unambiguous implementation instructions"
              }
            ],
            executionStrategy: "Catalog all interactions → Document states → Define timing/easing → Specify conditional logic → Create developer handoff docs",
            alternativeScenarios: ["Written descriptions only (rejected: ambiguous)"]
          },
          deliverable: {
            type: "Interaction Specification Docs"
          }
        }
      ]
    },
    {
      id: 6,
      name: "Usability Testing & Iteration",
      agents: [
        {
          id: "6.1",
          name: "Usability Test Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Conduct usability testing to validate design decisions before development.",
            scenarios: ["Remote unmoderated testing", "Moderated sessions", "A/B prototype testing"],
            designDecisions: [
              {
                decision: "Conduct task-based usability testing with 5 representative users per segment",
                justification: "Nielsen's research shows 5 users uncover 85% of usability issues"
              }
            ],
            executionStrategy: "Define test scenarios → Recruit participants → Conduct sessions → Analyze recordings → Synthesize findings → Prioritize issues",
            alternativeScenarios: ["Stakeholder review only (rejected: not user-validated)"]
          },
          deliverable: {
            type: "Usability Test Report"
          }
        },
        {
          id: "6.2",
          name: "Iteration Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Implement design changes based on usability findings while maintaining design system consistency.",
            scenarios: ["Minor refinements", "Significant pattern changes", "IA restructuring"],
            designDecisions: [
              {
                decision: "Categorize issues by severity (critical/major/minor) and implement critical fixes",
                justification: "Ensures high-impact issues resolved within project timeline"
              }
            ],
            executionStrategy: "Review findings → Categorize by severity → Design solutions → Validate against principles → Update mockups → Re-test critical changes",
            alternativeScenarios: ["Fix all issues (rejected: not time-feasible)"]
          },
          deliverable: {
            type: "Revised Mockups & Prototype"
          }
        }
      ]
    },
    {
      id: 7,
      name: "Developer Handoff & Documentation",
      agents: [
        {
          id: "7.1",
          name: "Design Spec Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Generate comprehensive design specifications for developer implementation.",
            scenarios: ["Web application", "Mobile app (iOS/Android)", "Multi-platform"],
            designDecisions: [
              {
                decision: "Use Figma Inspect mode + generated Storybook for component documentation",
                justification: "Provides code snippets and live component examples"
              }
            ],
            executionStrategy: "Organize Figma file → Enable Dev Mode → Generate design tokens → Document components → Create handoff checklist",
            alternativeScenarios: ["PDF redlines (rejected: static and error-prone)"]
          },
          deliverable: {
            type: "Developer Handoff Package"
          }
        },
        {
          id: "7.2",
          name: "Asset Export Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Export all design assets in required formats and resolutions for development.",
            scenarios: ["Web (SVG/PNG)", "iOS (1x/2x/3x)", "Android (mdpi/hdpi/xhdpi/xxhdpi/xxxhdpi)"],
            designDecisions: [
              {
                decision: "Export icons as SVG with automated PNG fallbacks for legacy browsers",
                justification: "SVG provides scalability; PNG ensures broad compatibility"
              }
            ],
            executionStrategy: "Audit asset usage → Configure export settings → Batch export → Organize by type/platform → Document asset naming conventions",
            alternativeScenarios: ["Manual export per request (rejected: inefficient)"]
          },
          deliverable: {
            type: "Design Asset Library"
          }
        }
      ]
    },
    {
      id: 8,
      name: "QA & Final Delivery",
      agents: [
        {
          id: "8.1",
          name: "Design QA Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Conduct final quality assurance review ensuring design consistency and completeness.",
            scenarios: ["Pre-development QA", "Post-implementation QA", "Continuous QA"],
            designDecisions: [
              {
                decision: "Create automated design lint checks using Figma plugins (consistent spacing, typography, colors)",
                justification: "Catches inconsistencies human review misses"
              }
            ],
            executionStrategy: "Run automated checks → Manual review against checklist → Test responsive behavior → Validate accessibility → Document issues → Verify fixes",
            alternativeScenarios: ["Manual review only (rejected: misses subtle inconsistencies)"]
          },
          deliverable: {
            type: "Design QA Report"
          }
        },
        {
          id: "8.2",
          name: "Documentation Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Compile all project documentation into client-ready deliverable package.",
            scenarios: ["Technical client", "Non-technical client", "Mixed audience"],
            designDecisions: [
              {
                decision: "Structure documentation in Notion with linked Figma embeds for interactive exploration",
                justification: "Provides navigable, shareable format with embedded design context"
              }
            ],
            executionStrategy: "Gather all phase deliverables → Organize by project phase → Add executive summary → Embed prototypes → Create table of contents → Export multiple formats",
            alternativeScenarios: ["PDF compilation only (rejected: not interactive or searchable)"]
          },
          deliverable: {
            type: "Final Documentation Package"
          }
        },
        {
          id: "8.3",
          name: "Knowledge Transfer Agent",
          status: "locked",
          logicDoc: {
            problemStatement: "Facilitate knowledge transfer to client team and development stakeholders.",
            scenarios: ["Live presentation", "Recorded walkthrough", "Written documentation only"],
            designDecisions: [
              {
                decision: "Create video walkthrough + live Q&A session + written documentation",
                justification: "Multi-modal approach accommodates different learning styles and schedules"
              }
            ],
            executionStrategy: "Record design system walkthrough → Record prototype demo → Schedule live session → Create FAQ document → Provide ongoing support channel",
            alternativeScenarios: ["Email handoff only (rejected: high risk of misinterpretation)"]
          },
          deliverable: {
            type: "Knowledge Transfer Package (Video + Live Session + Docs)"
          }
        }
      ]
    }
  ]
};
