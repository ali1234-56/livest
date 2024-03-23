"use client";

import { useIsClient } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

import { ToggleSkeleton } from "./toggle";
import { FollowingSkeleton } from "./following";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProps {
  children: React.ReactNode;
};

export const Wrapper = ({
  children,
}: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#808080] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col bg-gray-900 w-60 h-full  border-r border-[#FFFFFF] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
