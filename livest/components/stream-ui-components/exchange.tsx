import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BadgeDollarSign, Gift, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Emotioncons, Emotioncons2 } from "@/actions/emotioncons";
import { useEffect, useState } from "react";
import { select, storeint } from "@/actions/storeint";
import { toast } from "sonner";

interface UserAvatarProps {
  disabled?: boolean;
  isLive?: boolean;
  username: string;
  onSubmit?: (value: string) => void; // 回調 ? 代表可選
  
}

export const Exchange = ({disabled, isLive, username }: UserAvatarProps) => {
  console.log(disabled)
  const [availableOptions, setAvailableOptions] = useState({
    pink: true,
    animal: true,
    emotioncons: true,
  });

  async function fetchAndLogCounter(username: string) {
    try {
      const counter = await select(username);
      const counterNumber = counter?.counter;

      return counterNumber;
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  }



  async function Buyclick(counterNumber: number, selectedEmotioncons: string[], category: 'pink' | 'animal' | 'emotioncons', price: number) {
    console.log("increment like count");
    console.log(username);
    console.log(selectedEmotioncons);
    console.log(price);

    if (counterNumber >= price) {
      try {
        // Update options
        const updatedOptions = { ...availableOptions };
        updatedOptions[category] = false;

        setAvailableOptions(updatedOptions); // Update state to trigger re-render

        // Save the state to localStorage, then reload the page
        localStorage.setItem(`availableOptions_${username}`, JSON.stringify(updatedOptions));
        Emotioncons(username, selectedEmotioncons);
        const newCounter = counterNumber - price;
        console.log(newCounter);

        await storeint(username, newCounter);
        console.log("Updated");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("your point not enough")
    }
  }


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

  return (
    <DropdownMenu>

      {(isLive && disabled) && (
        <DropdownMenuTrigger>
          <Button variant="primary" size="sm" className="">
            <Gift className="h-4 w-4 mr-2" />
            exchange
          </Button>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent align="end">
        {availableOptions.pink && (
          <DropdownMenuItem
            onClick={async () => {
              const counterNumber = await fetchAndLogCounter(username);
              if (counterNumber !== undefined) {
                Buyclick(counterNumber, pink, "pink", 400);
              }
            }}
          >
            {pink.map((image, index) => (
              <Image key={index} src={image} alt="Pink" height="100" width="100" />
            ))}
            <div className="flex">
              <div className="pl-3 pr-1 pt-0.5">400</div>
              <BadgeDollarSign />
            </div>
          </DropdownMenuItem>
        )}
        {availableOptions.animal && (
          <DropdownMenuItem
            onClick={async () => {
              const counterNumber = await fetchAndLogCounter(username);
              if (counterNumber !== undefined) {
                Buyclick(counterNumber, animal, "animal", 200);
              }
            }}
          >
            {animal.map((image, index) => (
              <Image key={index} src={image} alt="Animal" height="100" width="100" />
            ))}
            <div className="flex">
              <div className="pl-3 pr-1 pt-0.5">200</div>
              <BadgeDollarSign />
            </div>
          </DropdownMenuItem>
        )}
        {availableOptions.emotioncons && (
          <DropdownMenuItem
            onClick={async () => {
              const counterNumber = await fetchAndLogCounter(username);
              if (counterNumber !== undefined) {
                Buyclick(counterNumber, emotioncons, "emotioncons", 300);
              }
            }}
          >
            {emotioncons.map((image, index) => (
              <Image key={index} src={image} alt="Emotioncon" height="100" width="100" />
            ))}
            <div className="flex">
              <div className="pl-3 pr-1 pt-0.5">300</div>
              <BadgeDollarSign />
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const SendEmotioncons = ({ username, onSubmit, disabled }: UserAvatarProps) => {

  const [emotionconsArray, setEmotionconsArray] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmotioncons = async () => {
      console.log("Fetching emoticons for:", username);
      try {
        const result = await Emotioncons2(username);
        console.log("Fetch result:", result);
        const emotioncons = result[0]?.emotioncons;
        if (emotioncons && Array.isArray(emotioncons)) {
          const stringArray = emotioncons.filter(
            (item): item is string => typeof item === "string"
          );
          setEmotionconsArray(stringArray);
          console.log("Emoticons set:", stringArray);
        } else {
          console.log("No emoticons found or invalid format");
        }
      } catch (error) {
        console.error("Error fetching emoticons:", error);
      }
    };

    fetchEmotioncons();
  }, [username]);

  const handleItemClick = (value: string) => {
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <DropdownMenu>
      {!disabled && (
        <DropdownMenuTrigger>
          <Button variant="primary" size="sm">
            <Send className="h-4 w-4 mr-2" />
          </Button>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent align="end">
        {emotionconsArray.length > 0 ? (
          emotionconsArray.map((image, index) => (
            index % 4 === 0 && (
              <div key={index} className="flex">
                {emotionconsArray.slice(index, index + 4).map((image, subIndex) => (
                  <DropdownMenuItem key={index + subIndex} onClick={() => handleItemClick(image)}>
                    <Image src={image} alt="Emotioncon" height="100" width="100" />
                  </DropdownMenuItem>
                ))}
              </div>
            )
          ))
        ) : (
          <DropdownMenuItem>No Emoticons Available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

