import { useState } from "react";
import { AgentConfiguration, SeniorityLevel } from "../types/agentConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { X, Plus, Save } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface AgentConfigFormProps {
  config: AgentConfiguration;
  onSave: (config: AgentConfiguration) => void;
}

export function AgentConfigForm({ config: initialConfig, onSave }: AgentConfigFormProps) {
  const [config, setConfig] = useState<AgentConfiguration>(initialConfig);

  const updateField = <K extends keyof AgentConfiguration>(
    field: K,
    value: AgentConfiguration[K]
  ) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: keyof AgentConfiguration, value: string) => {
    if (!value.trim()) return;
    const currentArray = config[field] as string[];
    updateField(field, [...currentArray, value.trim()] as any);
  };

  const removeArrayItem = (field: keyof AgentConfiguration, index: number) => {
    const currentArray = config[field] as string[];
    updateField(field, currentArray.filter((_, i) => i !== index) as any);
  };

  const ArrayInput = ({
    field,
    label,
    placeholder,
    examples,
  }: {
    field: keyof AgentConfiguration;
    label: string;
    placeholder: string;
    examples?: string[];
  }) => {
    const [inputValue, setInputValue] = useState("");
    const items = config[field] as string[];

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem(field, inputValue);
                setInputValue("");
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            onClick={() => {
              addArrayItem(field, inputValue);
              setInputValue("");
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {items.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {items.map((item, idx) => (
              <Badge key={idx} variant="secondary" className="gap-1">
                {item}
                <button
                  type="button"
                  onClick={() => removeArrayItem(field, idx)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {examples && examples.length > 0 && (
          <div className="text-xs text-muted-foreground">
            Examples: {examples.join(", ")}
          </div>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(config);
      }}
      className="space-y-6"
    >
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Core agent identity and configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agentName">Agent Name</Label>
              <Input
                id="agentName"
                value={config.agentName}
                onChange={(e) => updateField("agentName", e.target.value)}
                placeholder="e.g., Info Gathering Agent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={config.role}
                onChange={(e) => updateField("role", e.target.value)}
                placeholder="e.g., UX Designer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seniorityLevel">Seniority Level</Label>
            <Select
              value={config.seniorityLevel}
              onValueChange={(value: SeniorityLevel) =>
                updateField("seniorityLevel", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="principal">Principal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Responsibilities */}
      <Card>
        <CardHeader>
          <CardTitle>Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ArrayInput
            field="primaryResponsibilities"
            label="Primary Responsibilities"
            placeholder="Add primary responsibility"
            examples={["UI/UX Design", "Frontend Development", "API Integration"]}
          />
          <Separator />
          <ArrayInput
            field="secondaryResponsibilities"
            label="Secondary Responsibilities"
            placeholder="Add secondary responsibility"
          />
        </CardContent>
      </Card>

      {/* Knowledge & Expertise */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge & Expertise</CardTitle>
          <CardDescription>Skills and technologies the agent is proficient in</CardDescription>
        </CardHeader>
        <CardContent>
          <ArrayInput
            field="skillsAndTechnologies"
            label="Skills & Technologies"
            placeholder="Add skill or technology"
            examples={["Figma", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"]}
          />
        </CardContent>
      </Card>

      {/* Engineering & Design Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Engineering & Design Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ArrayInput
            field="preferredPatterns"
            label="Preferred Patterns (Always Use)"
            placeholder="Add preferred pattern"
            examples={["reusable components", "scalable architecture", "atomic design"]}
          />
          <Separator />
          <ArrayInput
            field="avoidPatterns"
            label="Avoid Patterns (Never Use)"
            placeholder="Add pattern to avoid"
            examples={["deprecated APIs", "inline styles", "hardcoded values"]}
          />
        </CardContent>
      </Card>

      {/* Decision-Making Priorities */}
      <Card>
        <CardHeader>
          <CardTitle>Decision-Making Priorities</CardTitle>
          <CardDescription>Order matters - top priority first</CardDescription>
        </CardHeader>
        <CardContent>
          <ArrayInput
            field="decisionPriorities"
            label="Priority Order"
            placeholder="Add priority"
            examples={["Security", "Maintainability", "Performance", "Scalability"]}
          />
        </CardContent>
      </Card>

      {/* Communication Style */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="communicationStyle">Style Description</Label>
          <Textarea
            id="communicationStyle"
            value={config.communicationStyle}
            onChange={(e) => updateField("communicationStyle", e.target.value)}
            placeholder="e.g., concise and technical, collaborative and explanatory"
            className="min-h-[80px]"
          />
        </CardContent>
      </Card>

      {/* Output Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Output Requirements</CardTitle>
          <CardDescription>What all outputs must include</CardDescription>
        </CardHeader>
        <CardContent>
          <ArrayInput
            field="outputRequirements"
            label="Required Elements"
            placeholder="Add requirement"
            examples={[
              "include folder structure",
              "explain architecture decisions",
              "provide implementation steps",
            ]}
          />
        </CardContent>
      </Card>

      {/* Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Tool Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ArrayInput
            field="availableTools"
            label="Available Tools"
            placeholder="Add tool"
            examples={["Figma API", "GitHub", "Jira", "Postman", "Supabase"]}
          />
          <Separator />
          <ArrayInput
            field="toolRules"
            label="Tool Behavior Rules"
            placeholder="Add rule"
          />
        </CardContent>
      </Card>

      {/* Memory & Context */}
      <Card>
        <CardHeader>
          <CardTitle>Memory & Context Rules</CardTitle>
          <CardDescription>Persistent information to always remember</CardDescription>
        </CardHeader>
        <CardContent>
          <ArrayInput
            field="persistentContext"
            label="Persistent Context"
            placeholder="Add context rule"
            examples={[
              "company design system",
              "API naming conventions",
              "coding standards",
            ]}
          />
        </CardContent>
      </Card>

      {/* Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Collaboration Workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="workflowStructure">Workflow Structure</Label>
          <Textarea
            id="workflowStructure"
            value={config.workflowStructure}
            onChange={(e) => updateField("workflowStructure", e.target.value)}
            placeholder="e.g., UX Agent → Frontend Agent → Backend Agent → QA Agent"
            className="min-h-[100px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* Constraints */}
      <Card>
        <CardHeader>
          <CardTitle>Constraints & Guardrails</CardTitle>
        </CardHeader>
        <CardContent>
          <ArrayInput
            field="constraints"
            label="Strict Constraints"
            placeholder="Add constraint"
            examples={[
              "never expose secrets",
              "validate accessibility",
              "use production-safe patterns",
            ]}
          />
        </CardContent>
      </Card>

      {/* Domain Expertise */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <ArrayInput
            field="domainExpertise"
            label="Primary Domain Focus"
            placeholder="Add domain"
            examples={["SaaS platforms", "FinTech", "E-commerce", "AI Products"]}
          />
        </CardContent>
      </Card>

      {/* Success Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Success Metrics</CardTitle>
          <CardDescription>Optimize outputs for these metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ArrayInput
            field="successMetrics"
            label="Metrics"
            placeholder="Add metric"
            examples={[
              "Lighthouse > 90",
              "WCAG AA compliance",
              "high test coverage",
              "fast delivery",
            ]}
          />
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border py-4">
        <Button type="submit" size="lg" className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </form>
  );
}
