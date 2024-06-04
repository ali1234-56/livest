import { currentUser } from "@clerk/nextjs";

import { getUserByUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/components/stream-ui-components";
import { getSelf } from "@/lib/auth-service";

interface CreatorPageProps {
  params: {
    username: string;
  };
};

const CreatorPage = async ({
  params,
}: CreatorPageProps) => {
  const externalUser = await currentUser();
  const self = await getSelf();
  const user2 = await getUserByUsername(self.username);
  const user = await getUserByUsername(params.username);

  if (!user2) {
    throw new Error("Unauthorized");
  }

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return ( 
    <div className="h-full ">
      <StreamPlayer
        user2={user2}
        user={user}
        stream={user.stream}
        isFollowing
      />
    </div>
  );
}
 
export default CreatorPage;