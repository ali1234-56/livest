
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BadgeDollarSign , Gift} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";


interface UserAvatarProps
{
  isLive?: boolean;
};

export const Exchange = ({
    isLive,
  }: UserAvatarProps) =>{

    //列出該文件裡所有圖片 url
     const pink = [
        "/pink/baby-hat-svgrepo-com.svg",
        "/pink/baby-tableware-svgrepo-com.svg",
        "/pink/safety-pin-svgrepo-com.svg",
        "/pink/sock-svgrepo-com.svg"
      ];
      const animal = [
        "/animal/crab-svgrepo-com.svg",
        "/animal/dinosaur-svgrepo-com.svg",
        "/animal/elk-svgrepo-com.svg",
        "/animal/penguin-svgrepo-com.svg"

      ];
      const emotioncons = [
        "/emotioncons/cool-svgrepo-com.svg",
        "/emotioncons/in-love-svgrepo-com.svg",
        "/emotioncons/jealous-svgrepo-com.svg",
        "/emotioncons/stupid-b-svgrepo-com.svg"

      ];

    return(
        <DropdownMenu>
            <DropdownMenuTrigger >
                {isLive && ( //判斷式後面要加(渲染內容)
                    <Button       
                        variant="primary"
                        size="sm"
                        className=""
                        >
                        <Gift className="h-4 w-4 mr-2"/>
                        exchange
                    </Button>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem >
                
                {pink.map((image) => ( // 使用 map 把所有圖片放上來 減少程式碼
                    <Image
                            src={image}
                            alt="Pink"
                            height="100"
                            width="100"
                        />
                    ))}
                    <div className='flex '>
                        <div className="pl-3 pr-1 pt-0.5">400</div>  
                        <BadgeDollarSign/>
                    </div>  
                </DropdownMenuItem>
                <DropdownMenuItem >
                {animal.map((image) => ( // 使用 map 把所有圖片放上來 減少程式碼
                    <Image
                            src={image}
                            alt="Pink"
                            height="100"
                            width="100"
                        />
                    ))}
                    <div className='flex '>
                        <div className="pl-3 pr-1 pt-0.5">200</div>  
                        <BadgeDollarSign/>
                    </div> 
                </DropdownMenuItem>
                <DropdownMenuItem >              
                {emotioncons.map((image) => ( // 使用 map 把所有圖片放上來 減少程式碼
                    <Image
                            src={image}
                            alt="Pink"
                            height="100"
                            width="100"
                        />
                    ))}
                    <div className='flex '>
                        <div className="pl-3 pr-1 pt-0.5">300</div>  
                        <BadgeDollarSign/>
                    </div>   
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
