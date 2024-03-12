import React, { ReactEventHandler } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Loader2 } from "lucide-react";
import { HomeLoading } from "@/pages/home";

interface CustomDialogProps {
  buttonLabel: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  formId: string;
  handler: ReactEventHandler;
  isLoading: HomeLoading;
}

export default function CustomDialog({ buttonLabel, title, description, children, formId, handler, isLoading }: CustomDialogProps) {
  return (
    <form onSubmit={handler} id={formId}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="lg" className="rounded-full">
            {buttonLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">{children}</div>
          <DialogFooter>
            <Button type="submit" variant="secondary" form={formId}>
              {isLoading.enter ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
