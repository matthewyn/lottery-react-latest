import React, { ReactEventHandler } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Loader2 } from "lucide-react";

interface CustomDialogProps {
  buttonLabel: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  formId: string;
  handler: ReactEventHandler;
  fullWidthButton?: boolean;
  iconButton?: React.ReactNode;
  isLoading: boolean;
}

export default function CustomDialog({ buttonLabel, title, description, children, formId, handler, fullWidthButton, iconButton, isLoading }: CustomDialogProps) {
  return (
    <form onSubmit={handler} id={formId}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="lg" className={`rounded-full ${fullWidthButton ? "w-full" : ""}`}>
            {iconButton}
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
              {isLoading ? <Loader2 className=" mr-2 w-4 h-4 animate-spin" /> : null}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
