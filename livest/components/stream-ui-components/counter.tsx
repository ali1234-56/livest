import { useState, useEffect } from 'react';
import { BadgeDollarSign } from "lucide-react";

import { storeint } from '@/actions/storeint';

interface CounterProps {
  counter: number;
  username: string;
}



 export const Counter = ({ counter, username }: CounterProps) => {
  const [currentCounter, setCurrentCounter] = useState<number>(counter || 0);

  useEffect(() => {
    // 初始化 currentCounter 为传入的 counter prop
    setCurrentCounter(counter);
  }, [counter]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCounter(prevCounter => {
        const newCounter = prevCounter + 10;
        storeint(username, newCounter) // 假设 storeint 是一个异步函数，可以增加错误处理
          .catch(error => console.error('Error updating counter:', error));
        return newCounter;
      });
    }, 20000); // 每20秒更新一次

    return () => clearInterval(intervalId); // 清理计时器
  }, [username]);

  return (
    <div className='flex p-2'>
      <BadgeDollarSign />
      <div className='pl-1'>{currentCounter}</div>
    </div>
  );
 };






