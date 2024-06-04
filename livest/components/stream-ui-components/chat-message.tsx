"use client";

import { format } from "date-fns";
import { ReceivedChatMessage } from "@livekit/components-react";

import { stringToColor } from "@/lib/utils";

interface ChatMessageProps {
  data: ReceivedChatMessage;
};

export const ChatMessage = ({
  data,
}: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");

  const pink = [
    "/pink/baby-hat-svgrepo-com.svg",
    "/pink/baby-tableware-svgrepo-com.svg",
    "/pink/safety-pin-svgrepo-com.svg",
    "/pink/sock-svgrepo-com.svg",
  ];
  const animal = [
    "/animal/crab-svgrepo-com.svg",
    "/animal/dinosaur-svgrepo-com.svg",
    "/animal/elk-svgrepo-com.svg",
    "/animal/penguin-svgrepo-com.svg",
  ];
  const emotioncons = [
    "/emotioncons/cool-svgrepo-com.svg",
    "/emotioncons/in-love-svgrepo-com.svg",
    "/emotioncons/jealous-svgrepo-com.svg",
    "/emotioncons/stupid-b-svgrepo-com.svg",
  ];

const isSpecialWord = (word: string) => {
  return pink.includes(word) || animal.includes(word) || emotioncons.includes(word);
};

const check1 = isSpecialWord(data.message);

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="flex items-center text-sm text/40">
        {format(data.timestamp, "HH:MM")}
      </p>
      <div className="flex items-center flex-wrap  gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
        </p>
      {check1 ? (
        <img src={data.message} alt="Emotioncon" height="50" width="50" className="pl-1 " />
      ) : (
        <p className="text-sm break-all">
          {data.message}
        </p>
      )}
      </div>
    </div>
  );
};
