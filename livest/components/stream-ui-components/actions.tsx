"use client";

import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { onFollow, onUnfollow } from "@/actions/follow";
import { storeint,select } from "@/actions/storeint"; 

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
  username: string;
};

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
  username
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"))
    });
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"))
    });
  }

  const toggleFollow = async () => {
    startTransition(() => {
      if (!userId) {
        return router.push("/sign-in");
      }
  
      if (isHost) return;
  
      if (isFollowing) { 

        try {
          select(username).then(async (counter) => {
            const counterNumber = counter?.counter;
            if (counterNumber !== undefined) {
              const newCounter = counterNumber - 300;
              await storeint(username, newCounter);
              window.location.reload();
              
            }
          });

          handleUnfollow();

        } catch (error) {
          console.error("Error fetching counter:", error);
        }

      } 
      else {
        
        try {
          select(username).then(async (counter) => {
            const counterNumber = counter?.counter;
            if (counterNumber !== undefined) {
              const newCounter = counterNumber + 300;
              await storeint(username, newCounter);
              window.location.reload();
              
            }
          });
          
          handleFollow();

        } catch (error) {
          console.error("Error fetching counter:", error);
        }
      }
    });
  };
  
  

  return (

    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
    >
      <Heart className={cn(
        "h-4 w-4 mr-2",
        isFollowing
          ? "fill-white"
          : "fill-none"
      )} />
      {isFollowing
        ? "Unfollow"
        : "Follow"
      }
    </Button>
  )
};

export const ActionsSkeleton = () => {
  return (
    <Skeleton className="h-10 w-full lg:w-24" />
  );
};
