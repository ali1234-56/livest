import { Suspense } from "react";

import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const BrowseLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
      <Navbar />
      <div className="flex h-full pt-20 bg-background ">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>
          {children}
        </Container>
      </div>
    </ThemeProvider>
  );
};
 
export default BrowseLayout;