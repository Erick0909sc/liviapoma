import React, { useState, useEffect } from "react";

interface TimerProps {
  minutes: number;
}

const Timer: React.FC<TimerProps> = ({ minutes }) => {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const displayTime = () => {
    const minutesRemaining = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    return `${minutesRemaining}:${
      secondsRemaining < 10 ? "0" : ""
    }${secondsRemaining}`;
  };

  return (
    <div>
      <h2>Temporizador</h2>
      <p>{displayTime()}</p>
    </div>
  );
};

export default Timer;
