
"use server";

import { db } from "@/lib/db";

export const storeint = async(username:string,counter:number) =>{
    const updatedUser = await db.user.update({
  
        where: { username: username }, 
        data: { counter: counter},
  
      });
  
    return updatedUser ;
  }

export const select = async(username:string) =>{

  const selectcounter = await db.user.findUnique({

    where: { username: username },
    select:{ counter: true },

  });

  return selectcounter ;
}


