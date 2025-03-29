"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { History, ListVideoIcon, ThumbsUp } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "History",
    url: "/playlist/history",
    icon: History,
    auth: true,
  },
  {
    title: "LIked videos",
    url: "/playlist/liked",
    icon: ThumbsUp,
    auth: true,
  },
  {
    title: "All playlist",
    url: "/playlist",
    icon: ListVideoIcon,
    auth: true,
  },
];

export const PersonalSection = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false} // TODO: chagne to look at current pathname
                onClick={() => {}} // TODO: do somethign on click
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
