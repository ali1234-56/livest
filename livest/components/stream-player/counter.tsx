import { useState, useEffect } from 'react';
import { BadgeDollarSign } from "lucide-react";
export const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 10);
    }, 2 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex'>
        <BadgeDollarSign/>
        <div className='pl-1'>{counter}</div>       
    </div>
  );
}
