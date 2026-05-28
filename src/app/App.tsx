import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { UploadBrief } from "./components/UploadBrief";
import { PipelineView } from "./components/PipelineView";
import { MasterBlueprint } from "./components/MasterBlueprint";
import { AutomationModeDialog } from "./components/AutomationModeDialog";
import { PhaseProgressStepper } from "./components/PhaseProgressStepper";
import { ProjectHistorySidebar } from "./components/ProjectHistorySidebar";
import { SettingsDialog } from "./components/SettingsDialog";
import { AllProjectsPage } from "./components/AllProjectsPage";
import { initialPipelineData } from "./data/pipelineData";
import { ScrollArea } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { Workflow, ArrowLeft } from "lucide-react";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentView, setCurrentView] = useState<"projects" | "pipeline">("projects");
  const [showModeDialog, setShowModeDialog] = useState(false);
  const [automationMode, setAutomationMode] = useState<"human" | "ai" | null>(null);
  const [pipelineStarted, setPipelineStarted] = useState(false);

  const handleBriefSubmit = (data: { file: File | null; briefText: string }) => {
    console.log("Brief submitted:", data);
    setShowModeDialog(true);
  };

  const handleModeSelect = (mode: "human" | "ai") => {
    setAutomationMode(mode);
    setShowModeDialog(false);
    setPipelineStarted(true);
    console.log("Selected mode:", mode);
  };

  const handleNewProject = () => {
    setCurrentView("pipeline");
    setPipelineStarted(false);
    setAutomationMode(null);
  };

  const handleBackToProjects = () => {
    setCurrentView("projects");
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {currentView === "projects" ? (
        <AllProjectsPage onNewProject={handleNewProject} />
      ) : (
        <div className="h-screen flex flex-col bg-background">
          {/* Header */}
          <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackToProjects}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="bg-primary/10 rounded-lg p-2 border border-primary/20">
                    <Workflow className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-medium tracking-tight">AI Design Pipeline</h1>
                    <p className="text-xs text-muted-foreground font-mono">
                      Sequential Waterfall • 19 Agents • 8 Phases
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SettingsDialog />
                  <ProjectHistorySidebar onViewAllProjects={handleBackToProjects} />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <ScrollArea className="flex-1">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
              <div className="space-y-8">
                {/* Upload Section */}
                <UploadBrief onSubmit={handleBriefSubmit} />

                {/* Progress Stepper */}
                {pipelineStarted && (
                  <>
                    <PhaseProgressStepper
                      phases={initialPipelineData.phases}
                      currentPhaseId={1}
                    />

                    {/* Connecting Line */}
                    <div className="flex items-center justify-center">
                      <div className="h-16 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50" />
                    </div>
                  </>
                )}

                {/* Pipeline Phases */}
                {pipelineStarted && (
                  <PipelineView
                    phases={initialPipelineData.phases}
                    automationMode={automationMode ?? "human"}
                  />
                )}

                {/* Final Separator */}
                {pipelineStarted && <Separator className="my-8" />}

                {/* Master Blueprint */}
                {pipelineStarted && (
                  <MasterBlueprint
                    compiled={initialPipelineData.masterBlueprint?.compiled ?? false}
                    agentDocs={initialPipelineData.masterBlueprint?.agentDocs ?? 19}
                    phaseSummaries={initialPipelineData.masterBlueprint?.phaseSummaries ?? 8}
                  />
                )}
              </div>
            </div>
          </ScrollArea>

          {/* Automation Mode Dialog */}
          <AutomationModeDialog
            open={showModeDialog}
            onSelect={handleModeSelect}
          />
        </div>
      )}

      {/* Toast Notifications */}
      <Toaster />
    </ThemeProvider>
  );
}