"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { InfoModal } from "./info-modal";

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
};

export const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  if (!isHost) return null;

  return (
    <div className="px-4 border-2 rounded-md mx-2">
      <div className="rounded-xl bg-background">
        <div className="flex items-center p-5">

          <div>
            <h2 className="text-lg lg:text-lg font-semibold capitalize">
              user info
            </h2>

          </div>
          <InfoModal
            initialName={name}
            initialThumbnailUrl={thumbnailUrl}
          />
          
        </div>
        <div className="pl-5 pr-5 ">
          <Separator />
        </div>
        
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">
              Name
            </h3>
            <p className="text-sm font-semibold">
              {name}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">
              Thumbnail
            </h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={name}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
