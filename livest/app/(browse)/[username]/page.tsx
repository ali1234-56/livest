

import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-ui-components";
import { getSelf } from "@/lib/auth-service";
import { User2 } from "lucide-react";

interface UserPageProps {
  params: {
    username: string;
  };
};

const UserPage = async ({
  params
}: UserPageProps) => {
  const self = await getSelf();
  const user2 = await getUserByUsername(self.username);
  console.log(user2?.counter);
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }
  if (!user2) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return ( 
    <StreamPlayer
      user2={user2}
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  );
}
 
export default UserPage;