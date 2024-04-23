
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BadgeDollarSign , Gift} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

export const Exchange = () =>{

    return(

        <DropdownMenu>
            <DropdownMenuTrigger >

                    <Button       
                    variant="primary"
                    size="sm"
                    className=""
                    >
                    <Gift className="h-4 w-4 mr-2"/>
                    exchange
                    </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem >
                    <Image
                            src="/pink/baby-hat-svgrepo-com.svg"
                            alt="Gamehub"
                            height="100"
                            width="100"
                        />
                    <div className='flex '>
                        <div className="pl-3 pr-1 pt-0.5">400</div>  
                        <BadgeDollarSign/>
                    </div>  
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Image
                            src="/animal/dinosaur-svgrepo-com.svg"
                            alt="Gamehub"
                            height="100"
                            width="100"
                        />
                    <div className='flex '>
                        <div className="pl-3 pr-1 pt-0.5">200</div>  
                        <BadgeDollarSign/>
                    </div> 
                </DropdownMenuItem>
                <DropdownMenuItem >              
                    <Image
                            src="/emotioncons/cool-svgrepo-com.svg"
                            alt="Gamehub"
                            height="100"
                            width="100"
                        />
                    <div className='flex '>
                        <div className="pl-3 pr-1 pt-0.5">300</div>  
                        <BadgeDollarSign/>
                    </div>   
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
