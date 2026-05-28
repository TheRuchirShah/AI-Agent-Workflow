import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AgentConfigurationSettings } from "./AgentConfigurationSettings";
import { GeneralSettings } from "./GeneralSettings";

interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SettingsDialog({ open: controlledOpen, onOpenChange }: SettingsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="gap-2">
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">Settings</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your pipeline configuration, agents, and preferences
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="general" className="h-full flex flex-col">
              <TabsList className="mx-6 mb-4 w-fit">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="agents">Agents Configuration</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden px-6 pb-6">
                <TabsContent value="general" className="h-full m-0">
                  <GeneralSettings />
                </TabsContent>

                <TabsContent value="agents" className="h-full m-0">
                  <AgentConfigurationSettings embedded />
                </TabsContent>

                <TabsContent value="notifications" className="h-full m-0">
                  <div className="text-center text-muted-foreground py-12">
                    Notification settings coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="integrations" className="h-full m-0">
                  <div className="text-center text-muted-foreground py-12">
                    Integration settings coming soon...
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
