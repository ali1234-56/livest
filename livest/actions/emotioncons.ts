"use server";

import { db } from "@/lib/db";

export const Emotioncons = async (username: string, emotioncon: string[]) => {

    try {
        const existingUser = await db.user.findFirst({
            where: {
                username: username,
            }
        });

        if (existingUser) {
            let currentEmotioncons: string[] = [];
            if (Array.isArray(existingUser.emotioncons)) {
                currentEmotioncons = existingUser.emotioncons.filter((item): item is string => typeof item === 'string');
            } else {
              console.error("Existing user's emotioncons is not an array.");
              return; 
            }
          
            // 確保 emotioncon 也是一个數组
            if (!Array.isArray(emotioncon)) {
              console.error("Emotioncon is not an array.");
              return; // 如果不是數组，可以选择返回或采取其他操作
            }
          
            // 合并现有的情绪图标数组和新的情绪图标数组
            const updatedEmotioncons = [...currentEmotioncons, ...emotioncon];
          
            try {
              // 更新用户记录
              const updatedUser = await db.user.update({
                where: { username: username },
                data: {
                  emotioncons: updatedEmotioncons
                }
              });
          
              console.log(`Emotioncons added successfully for user ${username}`);
              return updatedUser;
            } catch (error) {
              console.error(`Error updating emotioncons for user ${username}:`, error);
            }
          } else {
            console.error(`User ${username} not found.`);
          }
          
    } catch (error) {
        console.error(`Error adding emotioncons for user ${username}:`, error);
        }
    };


  export const Emotioncons2 = async( username: string) =>{


    const createUser = await db.user.findMany({
  
        where: { username }, 
        select: { emotioncons: true },
  
      });
  
    return createUser;
  }
