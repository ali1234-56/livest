import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

import {format } from "date-fns";

import { getBlockedUsers } from "@/lib/block-service";

import { DataTable } from "./com_components/data-table";
import { columns } from "./com_components/columns";



import { ToggleCard } from "./chat_components/toggle-card";

const KeysPage = async () => {

  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy"),
  }));

  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found");
  }


  return ( 
    <>
    <div className="p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Keys  URLs
        </h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>

    <div className="p-6 bg-background">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Chat settings
        </h1>
      </div>
      <div className="space-y-4">

        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />

        <ToggleCard
          field="isChatFollowersOnly"
          label=" following to open chat"
          value={stream.isChatFollowersOnly}
        />

      </div>
    </div>

    <div className="p-6 bg-background">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Block Menu
        </h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>

    </>
  );
};
 
export default KeysPage;