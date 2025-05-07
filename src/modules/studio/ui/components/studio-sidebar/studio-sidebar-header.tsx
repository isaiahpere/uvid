import { useUser } from "@clerk/nextjs";

import { SidebarHeader } from "@/components/ui/sidebar";

export const StudioSidebarHeader = () => {
  const { user } = useUser();

  return (
    <SidebarHeader className="flex place-items-center pb-4">
      <p>Studio Sidebar Header</p>
    </SidebarHeader>
  );
};
