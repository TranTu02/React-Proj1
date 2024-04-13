import React, { useState, useEffect, memo } from 'react';

export function CountDown() {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const nextWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 - currentDate.getDay()));
      const timeRemainingValue = nextWeekDate - currentDate;

      const days = Math.floor(timeRemainingValue / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemainingValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemainingValue % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemainingValue % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeRemaining;
}