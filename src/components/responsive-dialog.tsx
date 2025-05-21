import { useIsMobile } from "@/hooks/use-mobile";

import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerHeader, DrawerContent, DrawerTitle } from "./ui/drawer";

interface ResponsiveModalProps {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
  children,
  title,
  open,
  onOpenChange,
}: ResponsiveModalProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
