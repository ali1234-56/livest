import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";
import { ThemeProvider } from "@/components/theme-provider";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
};

const CreatorLayout = async ({
  params,
  children,
}: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }

  return ( 
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>
          {children}
        </Container>
      </div>
    </ThemeProvider>
  );
}
 
export default CreatorLayout;