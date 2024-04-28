import Link from "next/link";
import { Wrench } from "lucide-react";
import { 
  SignInButton, 
  UserButton, 
  currentUser
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <ModeToggle/>
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Wrench className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">
                Tool
              </span>
            </Link>
          </Button>
          <UserButton
            afterSignOutUrl="/"
          />
          
        </div>
      )}
    </div>
  );
};
