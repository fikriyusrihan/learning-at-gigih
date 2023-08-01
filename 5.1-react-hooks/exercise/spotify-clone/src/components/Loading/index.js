import {useEffect, useRef, useState} from "react";

export default function Index() {
  const intervalRef = useRef(null);
  const [dots, setDots] = useState('');

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 500);

    return () => {
      clearInterval(intervalRef.current);
    }
  });

  return (
    <span>{dots}</span>
  )
}